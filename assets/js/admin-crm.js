/**
 * admin-crm.js
 * Dashboard CRM profesional con gráficos y exportación
 */

import products from './index/productos.js';
// Importar promociones desde la carpeta js-promo
// Nota: promociones.js no exporta por defecto, así que lo cargamos manualmente
let promociones = [];

// ===== VARIABLES GLOBALES =====
let allRegistrations = [];
let allProducts = [];
let filteredRegistrations = [];
let charts = {};
let currentDateRange = 'month';
let editingProductId = null; // Para rastrear qué producto se está editando

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', async () => {
  console.log('✨ Iniciando PowerLab CRM Dashboard...');
  
  // Cargar promociones desde API fetch
  await cargarPromociones();
  
  // Cargar datos
  loadData();
  
  // Configurar listeners
  setupTabListeners();
  setupFilterListeners();
  setupExportListeners();
  setupDateRangeListener();
  setupProductEditModal();
  setupAddModals();
  
  // Renderizar dashboard inicial
  renderDashboard();
});

// ===== CARGAR PROMOCIONES =====
async function cargarPromociones() {
  try {
    // Cargar el archivo promo.js dinámicamente y extraer promociones
    const response = await fetch('./assets/js/js-promo/promo.js');
    // Alternativa: usar un endpoint que retorne JSON
    // Por ahora, definir promociones directamente aquí o importarlas
    
    // Datos de promociones desde promo.js
    promociones = [
      {
        id: 100,
        name: "Iso XP Chopina",
        category: "PROTEÍNAS",
        price: 410.27,
        originalPrice: 545.00,
        discountPercentage: 24.6,
        stock: 15,
        image: "assets/img/product/promotion.png"
      },
      {
        id: 101,
        name: "Creatina Dragon Pharma",
        category: "SUPLEMENTOS",
        price: 99.40,
        originalPrice: 140,
        discountPercentage: 29,
        stock: 22,
        image: "assets/img/product/promotion(2).png"
      },
      {
        id: 102,
        name: "Proteína Prostar",
        category: "PROTEÍNAS",
        price: 349.99,
        originalPrice: 485.00,
        discountPercentage: 27.8,
        stock: 18,
        image: "assets/img/product/promotion(3).png"
      },
      {
        id: 103,
        name: "Iso Cool",
        category: "PROTEÍNAS",
        price: 419.88,
        originalPrice: 580.00,
        discountPercentage: 27.6,
        stock: 12,
        image: "assets/img/product/promotion(4).jpg"
      }
    ];
    console.log(`✓ ${promociones.length} productos de promociones cargados`);
  } catch (error) {
    console.warn('No se pudieron cargar promociones:', error);
    promociones = [];
  }
}

// ===== CARGA DE DATOS =====
function loadData() {
  // Cargar desde localStorage
  try {
    // Cargar registros
    allRegistrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    
    // Cargar productos desde localStorage o usar los de tienda
    const stored = localStorage.getItem('products');
    if (stored) {
      allProducts = JSON.parse(stored);
    } else {
      allProducts = [...products];
    }
    
    // SIEMPRE agregar las promociones que no existan en allProducts
    // Esto asegura que las promociones siempre estén disponibles
    promociones.forEach(promo => {
      // Si no existe una promoción con ese ID, agregarla
      if (!allProducts.some(p => p.id === promo.id)) {
        allProducts.push({
          id: promo.id,
          name: promo.name,
          category: promo.category || '',
          price: promo.price,
          stock: promo.stock || 0,
          originalPrice: promo.originalPrice,
          discountPercentage: promo.discountPercentage,
          image: promo.image || ''
        });
      } else {
        // Si existe, actualizar su stock en caso de que cambió en cargarPromociones()
        const index = allProducts.findIndex(p => p.id === promo.id);
        if (index !== -1 && allProducts[index].stock !== promo.stock) {
          allProducts[index].stock = promo.stock;
          allProducts[index].originalPrice = promo.originalPrice;
          allProducts[index].discountPercentage = promo.discountPercentage;
          allProducts[index].price = promo.price;
        }
      }
    });
    
    // Guardar en localStorage con las promociones incluidas
    localStorage.setItem('products', JSON.stringify(allProducts));
    
    console.log(`✓ ${allRegistrations.length} registros y ${allProducts.length} productos cargados (incl. ${promociones.length} promociones)`);
  } catch (error) {
    console.error('Error cargando datos:', error);
    allRegistrations = [];
    allProducts = [...products];
  }
  
  filteredRegistrations = [...allRegistrations];
}

// ===== TABS =====
function setupTabListeners() {
  document.querySelectorAll('.crm-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.dataset.tab;
      
      // Actualizar botones
      document.querySelectorAll('.crm-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Actualizar contenido
      document.querySelectorAll('.crm-tab-content').forEach(t => t.classList.remove('active'));
      document.getElementById(tabName).classList.add('active');
      
      // Renderizar contenido específico
      if (tabName === 'dashboard') renderDashboard();
      if (tabName === 'ventas') renderVentas();
      if (tabName === 'productos') renderProductos();
      if (tabName === 'clientes') renderClientes();
    });
  });
}

// ===== FILTROS =====
function setupFilterListeners() {
  const filterBtn = document.getElementById('filterApplyBtn');
  const resetBtn = document.getElementById('filterResetBtn');
  
  if (filterBtn) {
    filterBtn.addEventListener('click', applyFilters);
  }
  
  if (resetBtn) {
    resetBtn.addEventListener('click', resetFilters);
  }
}

function applyFilters() {
  const dateFrom = document.getElementById('filterDateFrom')?.value;
  const dateTo = document.getElementById('filterDateTo')?.value;
  const client = document.getElementById('filterClient')?.value?.toLowerCase() || '';
  
  filteredRegistrations = allRegistrations.filter(reg => {
    let match = true;
    
    if (dateFrom && new Date(reg.createdAt) < new Date(dateFrom)) match = false;
    if (dateTo && new Date(reg.createdAt) > new Date(dateTo)) match = false;
    if (client && !reg.name.toLowerCase().includes(client)) match = false;
    
    return match;
  });
  
  console.log(`📊 Filtrados ${filteredRegistrations.length} registros`);
  renderSalesTable();
}

function resetFilters() {
  document.getElementById('filterDateFrom').value = '';
  document.getElementById('filterDateTo').value = '';
  document.getElementById('filterClient').value = '';
  filteredRegistrations = [...allRegistrations];
  renderSalesTable();
}

// ===== DATE RANGE =====
function setupDateRangeListener() {
  const selector = document.getElementById('dateRangeFilter');
  if (selector) {
    selector.addEventListener('change', (e) => {
      currentDateRange = e.target.value;
      renderDashboard();
    });
  }
}

function getDateRangeData() {
  const now = new Date();
  let startDate, endDate = now;
  
  switch (currentDateRange) {
    case 'today':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case 'week':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case 'lastMonth':
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      endDate = new Date(now.getFullYear(), now.getMonth(), 0);
      break;
    case '3months':
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    case 'year':
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    case 'all':
      return allRegistrations;
    default:
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  }
  
  return allRegistrations.filter(reg => {
    const regDate = new Date(reg.createdAt);
    return regDate >= startDate && regDate <= endDate;
  });
}

// ===== CÁLCULO DE KPIs =====
function calculateKPIs() {
  const rangeData = getDateRangeData();
  const totalSales = rangeData.reduce((sum, r) => sum + (r.total || 0), 0);
  const totalOrders = rangeData.length;
  const avgTicket = totalOrders > 0 ? totalSales / totalOrders : 0;
  
  // Contar productos sin stock
  const noStock = allProducts.filter(p => (p.stock || 0) === 0).length;
  
  // Valor total del inventario
  const inventoryValue = allProducts.reduce((sum, p) => {
    return sum + ((p.price || 0) * (p.stock || 0));
  }, 0);
  
  return {
    totalSales,
    totalOrders,
    avgTicket,
    noStock,
    inventoryValue
  };
}

// ===== EXPORTACIÓN =====
function setupExportListeners() {
  // Botones de exportación global
  const globalExportBtn = document.getElementById('globalExportBtn');
  if (globalExportBtn) {
    globalExportBtn.addEventListener('click', () => {
      const menu = document.getElementById('globalExportMenu');
      menu.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.export-menu')) {
        document.getElementById('globalExportMenu').classList.remove('active');
      }
    });
  }
  
  // Opciones de exportación global
  document.querySelectorAll('#globalExportMenu .export-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = btn.dataset.action;
      if (action === 'export-pdf') {
        exportDashboardPDF();
      } else if (action === 'export-xlsx') {
        exportDashboardExcel();
      }
      document.getElementById('globalExportMenu').classList.remove('active');
    });
  });
  
  // Exportación por secciones
  setupSectionExports();
  
  // Botón refrescar
  const refreshBtn = document.getElementById('refreshDataBtn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      loadData();
      showNotification('✓ Datos actualizados');
      renderDashboard();
    });
  }
}

function setupSectionExports() {
  // Exportar Ventas
  setupExportMenu('exportSalesBtn', 'exportSalesMenu', (action) => {
    const data = prepareExportData(filteredRegistrations, ['id', 'name', 'phone', 'createdAt', 'cart', 'total']);
    
    if (action === 'sales-csv') {
      exportToCSV(
        filteredRegistrations.map(r => ({
          ID: allRegistrations.indexOf(r) + 1,
          Cliente: r.name,
          Celular: r.phone,
          Fecha: new Date(r.createdAt).toLocaleDateString('es-PE'),
          Total: 'S/. ' + r.total.toFixed(2)
        })),
        ['ID', 'Cliente', 'Celular', 'Fecha', 'Total'],
        `PowerLab_Ventas_${new Date().toISOString().slice(0, 10)}.csv`
      );
    } else if (action === 'sales-xlsx') {
      exportToExcel(
        filteredRegistrations.map(r => ({
          ID: allRegistrations.indexOf(r) + 1,
          Cliente: r.name,
          Celular: r.phone,
          Fecha: new Date(r.createdAt).toLocaleDateString('es-PE'),
          Total: r.total.toFixed(2)
        })),
        ['ID', 'Cliente', 'Celular', 'Fecha', 'Total'],
        `PowerLab_Ventas_${new Date().toISOString().slice(0, 10)}.xlsx`,
        'Ventas'
      );
    }
  });
  
  // Exportar Productos
  setupExportMenu('exportProductsBtn', 'exportProductsMenu', (action) => {
    if (action === 'products-csv') {
      exportToCSV(
        allProducts.map(p => ({
          ID: p.id,
          Nombre: p.name,
          Categoría: p.category,
          Precio: 'S/. ' + p.price.toFixed(2),
          Stock: p.stock || 0
        })),
        ['ID', 'Nombre', 'Categoría', 'Precio', 'Stock'],
        `PowerLab_Productos_${new Date().toISOString().slice(0, 10)}.csv`
      );
    } else if (action === 'products-xlsx') {
      exportToExcel(
        allProducts.map(p => ({
          ID: p.id,
          Nombre: p.name,
          Categoría: p.category,
          Precio: p.price,
          Stock: p.stock || 0
        })),
        ['ID', 'Nombre', 'Categoría', 'Precio', 'Stock'],
        `PowerLab_Productos_${new Date().toISOString().slice(0, 10)}.xlsx`,
        'Productos'
      );
    }
  });
  
  // Exportar Clientes
  setupExportMenu('exportCustomersBtn', 'exportCustomersMenu', (action) => {
    const topCustomers = getTopCustomers(20);
    
    if (action === 'customers-csv') {
      exportToCSV(
        topCustomers.map(c => ({
          Nombre: c.name,
          Celular: c.phone,
          Compras: c.purchaseCount,
          Total: 'S/. ' + c.totalSpent.toFixed(2),
          Última: new Date(c.lastPurchase).toLocaleDateString('es-PE')
        })),
        ['Nombre', 'Celular', 'Compras', 'Total', 'Última'],
        `PowerLab_Clientes_${new Date().toISOString().slice(0, 10)}.csv`
      );
    } else if (action === 'customers-xlsx') {
      exportToExcel(
        topCustomers.map(c => ({
          Nombre: c.name,
          Celular: c.phone,
          Compras: c.purchaseCount,
          Total: c.totalSpent,
          Última: new Date(c.lastPurchase).toLocaleDateString('es-PE')
        })),
        ['Nombre', 'Celular', 'Compras', 'Total', 'Última'],
        `PowerLab_Clientes_${new Date().toISOString().slice(0, 10)}.xlsx`,
        'Clientes'
      );
    }
  });
}

function setupExportMenu(btnId, menuId, callback) {
  const btn = document.getElementById(btnId);
  const menu = document.getElementById(menuId);
  
  if (!btn || !menu) return;
  
  btn.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
  
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.export-menu')) {
      menu.classList.remove('active');
    }
  });
  
  menu.querySelectorAll('.export-option').forEach(option => {
    option.addEventListener('click', () => {
      callback(option.dataset.action);
      menu.classList.remove('active');
    });
  });
}

async function exportDashboardPDF() {
  showLoader(true, 'Generando PDF...');
  
  const kpis = calculateKPIs();
  const reportData = {
    dateRange: document.getElementById('dateRangeFilter')?.value || 'general',
    kpis: {
      'Ventas': 'S/. ' + kpis.totalSales.toFixed(2),
      'Pedidos': kpis.totalOrders,
      'Ticket Promedio': 'S/. ' + kpis.avgTicket.toFixed(2),
      'Productos sin Stock': kpis.noStock
    },
    charts: [
      { title: 'Evolución de Ventas', canvasId: 'chartSalesEvolution' },
      { title: 'Ventas por Categoría', canvasId: 'chartSalesByCategory' },
      { title: 'Top 10 Productos', canvasId: 'chartTopProducts' }
    ]
  };
  
  await generateExecutiveReport(reportData);
}

async function exportDashboardExcel() {
  showNotification('💾 Exportando dashboard a Excel...');
  
  const kpis = calculateKPIs();
  const topProducts = getTopProductsBySales(10);
  
  // Crear libro con múltiples hojas
  const wb = XLSX.utils.book_new();
  
  // Hoja 1: KPIs
  const kpiData = [
    ['Métrica', 'Valor'],
    ['Ventas Totales', kpis.totalSales],
    ['Total Pedidos', kpis.totalOrders],
    ['Ticket Promedio', kpis.avgTicket],
    ['Productos sin Stock', kpis.noStock],
    ['Valor Inventario', kpis.inventoryValue]
  ];
  const ws1 = XLSX.utils.aoa_to_sheet(kpiData);
  XLSX.utils.book_append_sheet(wb, ws1, 'KPIs');
  
  // Hoja 2: Ventas
  const salesData = filteredRegistrations.map(r => ([
    allRegistrations.indexOf(r) + 1,
    r.name,
    r.phone,
    new Date(r.createdAt).toLocaleDateString('es-PE'),
    r.total
  ]));
  const ws2 = XLSX.utils.aoa_to_sheet([['ID', 'Cliente', 'Celular', 'Fecha', 'Total'], ...salesData]);
  XLSX.utils.book_append_sheet(wb, ws2, 'Ventas');
  
  // Hoja 3: Productos
  const productsData = allProducts.map(p => ([p.id, p.name, p.category, p.price, p.stock || 0]));
  const ws3 = XLSX.utils.aoa_to_sheet([['ID', 'Nombre', 'Categoría', 'Precio', 'Stock'], ...productsData]);
  XLSX.utils.book_append_sheet(wb, ws3, 'Productos');
  
  XLSX.writeFile(wb, `PowerLab_Dashboard_${new Date().toISOString().slice(0, 10)}.xlsx`);
  showNotification('✓ Excel descargado exitosamente');
}

// ===== RENDERIZADO: DASHBOARD =====
function renderDashboard() {
  const kpis = calculateKPIs();
  
  // Actualizar KPI cards
  document.getElementById('kpiMonthlySales').textContent = 'S/. ' + kpis.totalSales.toFixed(2);
  document.getElementById('kpiOrders').textContent = kpis.totalOrders;
  document.getElementById('kpiAverageTicket').textContent = 'S/. ' + kpis.avgTicket.toFixed(2);
  document.getElementById('kpiNoStock').textContent = kpis.noStock;
  
  // Crear gráficos
  createSalesEvolutionChart();
  createSalesByCategoryChart();
  createCategoryDistributionChart();
  createTopProductsChart();
}

// ===== RENDERIZADO: VENTAS =====
function renderVentas() {
  renderSalesTable();
  createSalesByDayChart();
  createSalesByHourChart();
  
  // Precargar fechas
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  document.getElementById('filterDateFrom').valueAsDate = firstDay;
  document.getElementById('filterDateTo').valueAsDate = today;
}

function renderSalesTable() {
  const tbody = document.querySelector('#salesTable tbody');
  if (!tbody) return;
  
  tbody.innerHTML = filteredRegistrations.map(reg => `
    <tr>
      <td>${allRegistrations.indexOf(reg) + 1}</td>
      <td>${reg.name || '—'}</td>
      <td>${reg.phone}</td>
      <td>${new Date(reg.createdAt).toLocaleDateString('es-PE')}</td>
      <td>${reg.cart.map(i => `${i.nombre} (x${i.cantidad})`).join(', ')}</td>
      <td><strong>S/. ${reg.total.toFixed(2)}</strong></td>
    </tr>
  `).join('');
  
  if (filteredRegistrations.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">No hay datos</td></tr>';
  }
}

// ===== RENDERIZADO: PRODUCTOS =====
function renderProductos() {
  const kpis = calculateKPIs();
  
  document.getElementById('kpiLowStock').textContent = allProducts.filter(p => (p.stock || 0) < 10).length;
  document.getElementById('kpiInventoryValue').textContent = 'S/. ' + kpis.inventoryValue.toFixed(2);
  
  renderProductsTable();
  renderPromosTable();
  createStockByProductChart();
  createInventoryRotationChart();
}

function renderProductsTable() {
  const tbody = document.querySelector('#productsTable tbody');
  if (!tbody) return;
  
  // Filtrar solo productos que no son promociones (ID < 100)
  const regularProducts = allProducts.filter(p => p.id < 100);
  
  tbody.innerHTML = regularProducts.map(p => {
    let alert = '';
    const stock = p.stock || 0;
    
    if (stock === 0) {
      alert = '<span class="alert-badge danger">Sin stock</span>';
    } else if (stock < 10) {
      alert = '<span class="alert-badge warning">Bajo stock</span>';
    }
    
    return `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.category || '—'}</td>
        <td>S/. ${p.price.toFixed(2)}</td>
        <td>${stock}</td>
        <td>${alert}</td>
        <td><button class="edit-btn" onclick="openEditProductModal(${p.id})">✏️ Editar</button></td>
      </tr>
    `;
  }).join('');
}

function renderPromosTable() {
  const tbody = document.querySelector('#promosTable tbody');
  if (!tbody) return;
  
  // Filtrar solo promociones (ID >= 100)
  const promoProducts = allProducts.filter(p => p.id >= 100);
  
  tbody.innerHTML = promoProducts.map(p => {
    let alert = '';
    const stock = p.stock || 0;
    
    if (stock === 0) {
      alert = '<span class="alert-badge danger">Sin stock</span>';
    } else if (stock < 10) {
      alert = '<span class="alert-badge warning">Bajo stock</span>';
    }
    
    const descuento = (p.discountPercentage || 0);
    const precioOriginal = p.originalPrice || p.price;
    const precioFinal = p.price || 0;
    
    return `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.category || '—'}</td>
        <td>S/. ${precioOriginal.toFixed(2)}</td>
        <td>${descuento.toFixed(1)}%</td>
        <td><strong>S/. ${precioFinal.toFixed(2)}</strong></td>
        <td>${stock}</td>
        <td>${alert}</td>
        <td><button class="edit-btn" onclick="openEditProductModal(${p.id})">✏️ Editar</button></td>
      </tr>
    `;
  }).join('');
}

// ===== RENDERIZADO: CLIENTES =====
function renderClientes() {
  const customers = getCustomerSegments();
  const topCustomers = getTopCustomers(20);
  
  document.getElementById('kpiTotalCustomers').textContent = customers.all.length;
  document.getElementById('kpiVIPCustomers').textContent = customers.vip.length;
  document.getElementById('kpiRecurringCustomers').textContent = customers.recurring.length;
  document.getElementById('kpiNewCustomers').textContent = customers.new.length;
  
  renderCustomersTable(topCustomers);
  createCustomerSegmentationChart(customers);
  createCustomerAcquisitionChart();
}

function renderCustomersTable(customers) {
  const tbody = document.querySelector('#customersTable tbody');
  if (!tbody) return;
  
  tbody.innerHTML = customers.map(c => {
    let segment = '';
    if (c.totalSpent > 1000) segment = '<span class="segment-tag vip">VIP</span>';
    else if (c.purchaseCount > 2) segment = '<span class="segment-tag recurring">Recurrente</span>';
    else segment = '<span class="segment-tag new">Nuevo</span>';
    
    return `
      <tr>
        <td>${c.name}</td>
        <td>${c.phone}</td>
        <td>${segment}</td>
        <td>${c.purchaseCount}</td>
        <td><strong>S/. ${c.totalSpent.toFixed(2)}</strong></td>
        <td>${new Date(c.lastPurchase).toLocaleDateString('es-PE')}</td>
      </tr>
    `;
  }).join('');
}

// ===== GRÁFICOS CON CHART.JS =====
function destroyChart(chartId) {
  if (charts[chartId]) {
    charts[chartId].destroy();
    delete charts[chartId];
  }
}

function createSalesEvolutionChart() {
  destroyChart('chartSalesEvolution');
  
  const ctx = document.getElementById('chartSalesEvolution');
  if (!ctx) return;
  
  const rangeData = getDateRangeData();
  const dailyData = {};
  
  rangeData.forEach(reg => {
    const date = new Date(reg.createdAt).toLocaleDateString('es-PE');
    dailyData[date] = (dailyData[date] || 0) + (reg.total || 0);
  });
  
  const labels = Object.keys(dailyData).sort((a,b) => new Date(a) - new Date(b));
  const data = labels.map(l => dailyData[l]);
  
  charts['chartSalesEvolution'] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Ventas (S/.)',
        data: data,
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'bottom' }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

function createSalesByCategoryChart() {
  destroyChart('chartSalesByCategory');
  
  const ctx = document.getElementById('chartSalesByCategory');
  if (!ctx) return;
  
  const categoryData = {};
  const rangeData = getDateRangeData();
  
  rangeData.forEach(reg => {
    reg.cart.forEach(item => {
      const product = allProducts.find(p => p.name === item.nombre);
      const category = product?.category || 'Otros';
      categoryData[category] = (categoryData[category] || 0) + (item.precio * item.cantidad);
    });
  });
  
  const labels = Object.keys(categoryData);
  const data = Object.values(categoryData);
  
  charts['chartSalesByCategory'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Ventas por Categoría (S/.)',
        data: data,
        backgroundColor: [
          '#3498db', '#2980b9', '#51ff00', '#f39c12', '#e74c3c',
          '#9b59b6', '#1abc9c', '#34495e'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function createCategoryDistributionChart() {
  destroyChart('chartCategoryDistribution');
  
  const ctx = document.getElementById('chartCategoryDistribution');
  if (!ctx) return;
  
  const categoryData = {};
  const rangeData = getDateRangeData();
  
  rangeData.forEach(reg => {
    reg.cart.forEach(item => {
      const product = allProducts.find(p => p.name === item.nombre);
      const category = product?.category || 'Otros';
      categoryData[category] = (categoryData[category] || 0) + (item.precio * item.cantidad);
    });
  });
  
  const labels = Object.keys(categoryData);
  const data = Object.values(categoryData);
  
  charts['chartCategoryDistribution'] = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: [
          '#3498db', '#2980b9', '#51ff00', '#f39c12', '#e74c3c',
          '#9b59b6', '#1abc9c', '#34495e'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}

function createTopProductsChart() {
  destroyChart('chartTopProducts');
  
  const ctx = document.getElementById('chartTopProducts');
  if (!ctx) return;
  
  const topProducts = getTopProductsBySales(10);
  
  charts['chartTopProducts'] = new Chart(ctx, {
    type: 'barH',
    data: {
      labels: topProducts.map(p => p.name),
      datasets: [{
        label: 'Ventas (S/.)',
        data: topProducts.map(p => p.sales),
        backgroundColor: '#3498db'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function createSalesByDayChart() {
  destroyChart('chartSalesByDay');
  
  const ctx = document.getElementById('chartSalesByDay');
  if (!ctx) return;
  
  const dayData = { Lun: 0, Mar: 0, Mié: 0, Jue: 0, Vie: 0, Sáb: 0, Dom: 0 };
  const dayMap = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  
  filteredRegistrations.forEach(reg => {
    const day = dayMap[new Date(reg.createdAt).getDay()];
    dayData[day] = (dayData[day] || 0) + (reg.total || 0);
  });
  
  charts['chartSalesByDay'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(dayData),
      datasets: [{
        label: 'Ventas por día de semana (S/.)',
        data: Object.values(dayData),
        backgroundColor: '#51ff00',
        borderColor: '#45d600',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function createSalesByHourChart() {
  destroyChart('chartSalesByHour');
  
  const ctx = document.getElementById('chartSalesByHour');
  if (!ctx) return;
  
  const hourData = Array(24).fill(0);
  
  filteredRegistrations.forEach(reg => {
    const hour = new Date(reg.createdAt).getHours();
    hourData[hour] += (reg.total || 0);
  });
  
  charts['chartSalesByHour'] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({length: 24}, (_, i) => `${i}:00`),
      datasets: [{
        label: 'Ventas por hora (S/.)',
        data: hourData,
        borderColor: '#f39c12',
        backgroundColor: 'rgba(243, 156, 18, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function createStockByProductChart() {
  destroyChart('chartStockByProduct');
  
  const ctx = document.getElementById('chartStockByProduct');
  if (!ctx) return;
  
  const topProducts = allProducts
    .sort((a, b) => (b.stock || 0) - (a.stock || 0))
    .slice(0, 10);
  
  charts['chartStockByProduct'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: topProducts.map(p => p.name),
      datasets: [{
        label: 'Stock actual',
        data: topProducts.map(p => p.stock || 0),
        backgroundColor: '#3498db'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function createInventoryRotationChart() {
  destroyChart('chartInventoryRotation');
  
  const ctx = document.getElementById('chartInventoryRotation');
  if (!ctx) return;
  
  const rotationData = allProducts
    .filter(p => p.stock > 0)
    .sort((a, b) => (b.stock || 0) - (a.stock || 0))
    .slice(0, 8);
  
  charts['chartInventoryRotation'] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: rotationData.map(p => p.name),
      datasets: [{
        label: 'Rotación de inventario',
        data: rotationData.map(p => p.stock || 0),
        borderColor: '#2ecc71',
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        borderWidth: 2,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function createCustomerSegmentationChart(segments) {
  destroyChart('chartCustomerSegmentation');
  
  const ctx = document.getElementById('chartCustomerSegmentation');
  if (!ctx) return;
  
  charts['chartCustomerSegmentation'] = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Nuevos', 'Recurrentes', 'VIP'],
      datasets: [{
        data: [segments.new.length, segments.recurring.length, segments.vip.length],
        backgroundColor: ['#3498db', '#2ecc71', '#f39c12']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}

function createCustomerAcquisitionChart() {
  destroyChart('chartCustomerAcquisition');
  
  const ctx = document.getElementById('chartCustomerAcquisition');
  if (!ctx) return;
  
  const monthData = {};
  const now = new Date();
  
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleDateString('es-PE', { month: 'short', year: '2-digit' });
    monthData[key] = 0;
  }
  
  allRegistrations.forEach(reg => {
    const date = new Date(reg.createdAt);
    const key = date.toLocaleDateString('es-PE', { month: 'short', year: '2-digit' });
    if (monthData.hasOwnProperty(key)) {
      monthData[key]++;
    }
  });
  
  charts['chartCustomerAcquisition'] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Object.keys(monthData),
      datasets: [{
        label: 'Nuevos clientes por mes',
        data: Object.values(monthData),
        borderColor: '#9b59b6',
        backgroundColor: 'rgba(155, 89, 182, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

// ===== FUNCIONES DE DATOS =====
function getTopProductsBySales(limit = 10) {
  const productSales = {};
  
  allRegistrations.forEach(reg => {
    reg.cart.forEach(item => {
      const key = item.nombre;
      if (!productSales[key]) {
        productSales[key] = { name: item.nombre, sales: 0, quantity: 0 };
      }
      productSales[key].sales += item.precio * item.cantidad;
      productSales[key].quantity += item.cantidad;
    });
  });
  
  return Object.values(productSales)
    .sort((a, b) => b.sales - a.sales)
    .slice(0, limit);
}

function getTopCustomers(limit = 20) {
  const customers = {};
  
  allRegistrations.forEach(reg => {
    const key = reg.phone;
    if (!customers[key]) {
      customers[key] = {
        name: reg.name,
        phone: reg.phone,
        purchaseCount: 0,
        totalSpent: 0,
        lastPurchase: reg.createdAt
      };
    }
    customers[key].purchaseCount++;
    customers[key].totalSpent += reg.total || 0;
    const newDate = new Date(reg.createdAt);
    const lastDate = new Date(customers[key].lastPurchase);
    if (newDate > lastDate) {
      customers[key].lastPurchase = reg.createdAt;
    }
  });
  
  return Object.values(customers)
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, limit);
}

function getCustomerSegments() {
  const customers = getTopCustomers(999);
  
  return {
    all: customers,
    new: customers.filter(c => c.purchaseCount === 1),
    recurring: customers.filter(c => c.purchaseCount > 1 && c.totalSpent <= 1000),
    vip: customers.filter(c => c.totalSpent > 1000)
  };
}

// ===== FUNCIONES DE EDICIÓN DE PRODUCTOS =====

/**
 * Configura el formulario y listeners del modal de edición de productos y promociones
 */
function setupProductEditModal() {
  // Configurar modal de edición de productos
  const form = document.getElementById('editProductForm');
  if (!form) {
    console.warn('Formulario de edición de productos no encontrado');
    return;
  }
  
  // Listener para el submit del formulario
  form.addEventListener('submit', saveProductChanges);
  
  // Cerrar modal al hacer click fuera de él
  const modal = document.getElementById('editProductModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeEditProductModal();
      }
    });
  }
  
  // Configurar modal de edición de promociones
  const promoForm = document.getElementById('editPromoForm');
  if (!promoForm) {
    console.warn('Formulario de edición de promociones no encontrado');
  } else {
    promoForm.addEventListener('submit', savePromoChanges);
    
    // Cerrar modal al hacer click fuera de él
    const promoModal = document.getElementById('editPromoModal');
    if (promoModal) {
      promoModal.addEventListener('click', (e) => {
        if (e.target === promoModal) {
          closeEditPromoModal();
        }
      });
    }
  }
  
  console.log('✓ Modales de edición de productos y promociones configurados');
}

/**
 * Abre el modal de edición con los datos del producto o promoción
 * @param {number|string} productId - ID del producto a editar
 */
function openEditProductModal(productId) {
  // Buscar el producto en allProducts
  const product = allProducts.find(p => p.id == productId);
  
  if (!product) {
    showNotification('❌ Producto no encontrado', 3000);
    console.error(`Producto con ID ${productId} no encontrado`);
    return;
  }
  
  // Detectar si es una promoción (ID >= 100) o producto normal (ID < 100)
  if (product.id >= 100) {
    // Es una promoción - abrir modal de promoción
    openEditPromoModal(productId);
  } else {
    // Es un producto normal - abrir modal de producto
    openEditProductModalRegular(productId);
  }
}

/**
 * Abre el modal de edición de producto regular
 * @param {number|string} productId - ID del producto a editar
 */
function openEditProductModalRegular(productId) {
  // Buscar el producto en allProducts
  const product = allProducts.find(p => p.id == productId);
  
  if (!product) {
    showNotification('❌ Producto no encontrado', 3000);
    console.error(`Producto con ID ${productId} no encontrado`);
    return;
  }
  
  // Guardar ID para referencia posterior
  editingProductId = product.id;
  
  // Llenar los campos del formulario con los datos actuales
  document.getElementById('editProductId').value = product.id;
  document.getElementById('editProductName').value = product.name || '';
  document.getElementById('editProductCategory').value = product.category || '';
  document.getElementById('editProductPrice').value = product.price || 0;
  document.getElementById('editProductStock').value = product.stock || 0;
  
  // Mostrar el modal
  const modal = document.getElementById('editProductModal');
  if (modal) {
    modal.classList.add('active');
    console.log(`✓ Modal abierto para producto ID: ${productId}`);
  }
}

/**
 * Cierra el modal de edición y limpia el formulario
 */
function closeEditProductModal() {
  const modal = document.getElementById('editProductModal');
  if (modal) {
    modal.classList.remove('active');
  }
  
  const form = document.getElementById('editProductForm');
  if (form) {
    form.reset();
  }
  
  editingProductId = null;
  console.log('✓ Modal cerrado');
}

/**
 * Guarda los cambios del producto editado
 * @param {Event} e - Evento del formulario
 */
function saveProductChanges(e) {
  e.preventDefault();
  
  // Validar que hay un producto siendo editado
  if (editingProductId === null) {
    showNotification('❌ Error: No hay producto para editar', 3000);
    return;
  }
  
  // Obtener valores del formulario
  const productId = editingProductId;
  const newName = document.getElementById('editProductName').value.trim();
  const newCategory = document.getElementById('editProductCategory').value.trim();
  const newPrice = parseFloat(document.getElementById('editProductPrice').value);
  const newStock = parseInt(document.getElementById('editProductStock').value);
  
  // VALIDACIONES
  // 1. Nombre no puede estar vacío
  if (!newName) {
    showNotification('❌ El nombre del producto es requerido', 3000);
    return;
  }
  
  // 2. Precio debe ser un número válido y >= 0
  if (isNaN(newPrice) || newPrice < 0) {
    showNotification('❌ El precio debe ser un número válido y positivo', 3000);
    return;
  }
  
  // 3. Stock debe ser un número entero válido y >= 0
  if (isNaN(newStock) || newStock < 0 || !Number.isInteger(newStock)) {
    showNotification('❌ El stock debe ser un número entero positivo', 3000);
    return;
  }
  
  // Buscar el índice del producto en allProducts
  const productIndex = allProducts.findIndex(p => p.id == productId);
  
  if (productIndex === -1) {
    showNotification('❌ Producto no encontrado en la base de datos', 3000);
    console.error(`Producto con ID ${productId} no encontrado en allProducts`);
    return;
  }
  
  try {
    // Actualizar los datos del producto en el array
    allProducts[productIndex] = {
      ...allProducts[productIndex],
      name: newName,
      category: newCategory,
      price: newPrice,
      stock: newStock
    };
    
    // Guardar en localStorage
    localStorage.setItem('products', JSON.stringify(allProducts));
    console.log(`✓ Producto ID ${productId} actualizado:`, allProducts[productIndex]);
    
    // Actualizar la UI
    renderProductsTable(); // Actualizar tabla de productos
    renderProductos();     // Actualizar gráficos y KPIs de la pestaña
    
    // Cerrar el modal
    closeEditProductModal();
    
    // Mostrar notificación de éxito
    showNotification(`✓ Producto "${newName}" actualizado exitosamente`, 3000);
    
  } catch (error) {
    console.error('Error al guardar los cambios del producto:', error);
    showNotification('❌ Error al guardar los cambios. Intenta de nuevo.', 3000);
  }
}

/**
 * Abre el modal de edición de promoción
 * @param {number|string} promoId - ID de la promoción a editar
 */
function openEditPromoModal(promoId) {
  // Buscar la promoción en allProducts
  const promo = allProducts.find(p => p.id == promoId);
  
  if (!promo) {
    showNotification('❌ Promoción no encontrada', 3000);
    console.error(`Promoción con ID ${promoId} no encontrado`);
    return;
  }
  
  // Guardar ID para referencia posterior
  editingProductId = promo.id;
  
  // Llenar los campos del formulario con los datos actuales
  document.getElementById('editPromoId').value = promo.id;
  document.getElementById('editPromoName').value = promo.name || '';
  document.getElementById('editPromoCategory').value = promo.category || '';
  document.getElementById('editPromoOriginalPrice').value = promo.originalPrice || promo.price || 0;
  document.getElementById('editPromoDiscount').value = promo.discountPercentage || 0;
  document.getElementById('editPromoStock').value = promo.stock || 0;
  
  // Calcular y mostrar el precio final
  calculatePromoPrice();
  
  // Mostrar el modal
  const modal = document.getElementById('editPromoModal');
  if (modal) {
    modal.classList.add('active');
    console.log(`✓ Modal de promoción abierto para ID: ${promoId}`);
  }
}

/**
 * Cierra el modal de edición de promoción y limpia el formulario
 */
function closeEditPromoModal() {
  const modal = document.getElementById('editPromoModal');
  if (modal) {
    modal.classList.remove('active');
  }
  
  const form = document.getElementById('editPromoForm');
  if (form) {
    form.reset();
  }
  
  editingProductId = null;
  console.log('✓ Modal de promoción cerrado');
}

/**
 * Calcula automáticamente el precio final basado en precio original y descuento
 */
function calculatePromoPrice() {
  const originalPrice = parseFloat(document.getElementById('editPromoOriginalPrice').value) || 0;
  const discount = parseFloat(document.getElementById('editPromoDiscount').value) || 0;
  
  if (originalPrice > 0 && discount >= 0) {
    const finalPrice = originalPrice * (1 - (discount / 100));
    document.getElementById('editPromoFinalPrice').value = finalPrice.toFixed(2);
  } else {
    document.getElementById('editPromoFinalPrice').value = '0.00';
  }
}

/**
 * Guarda los cambios de la promoción editada
 * @param {Event} e - Evento del formulario
 */
function savePromoChanges(e) {
  e.preventDefault();
  
  // Validar que hay una promoción siendo editada
  if (editingProductId === null) {
    showNotification('❌ Error: No hay promoción para editar', 3000);
    return;
  }
  
  // Obtener valores del formulario
  const promoId = editingProductId;
  const newName = document.getElementById('editPromoName').value.trim();
  const newCategory = document.getElementById('editPromoCategory').value.trim();
  const newOriginalPrice = parseFloat(document.getElementById('editPromoOriginalPrice').value);
  const newDiscount = parseFloat(document.getElementById('editPromoDiscount').value);
  const newStock = parseInt(document.getElementById('editPromoStock').value);
  
  // VALIDACIONES
  // 1. Nombre no puede estar vacío
  if (!newName) {
    showNotification('❌ El nombre de la promoción es requerido', 3000);
    return;
  }
  
  // 2. Precio original debe ser un número válido y >= 0
  if (isNaN(newOriginalPrice) || newOriginalPrice < 0) {
    showNotification('❌ El precio original debe ser un número válido y positivo', 3000);
    return;
  }
  
  // 3. Descuento debe estar entre 0 y 100
  if (isNaN(newDiscount) || newDiscount < 0 || newDiscount > 100) {
    showNotification('❌ El descuento debe estar entre 0 y 100% (con decimales)', 3000);
    return;
  }
  
  // 4. Stock debe ser un número entero válido y >= 0
  if (isNaN(newStock) || newStock < 0 || !Number.isInteger(newStock)) {
    showNotification('❌ El stock debe ser un número entero positivo', 3000);
    return;
  }
  
  // Buscar el índice de la promoción en allProducts
  const promoIndex = allProducts.findIndex(p => p.id == promoId);
  
  if (promoIndex === -1) {
    showNotification('❌ Promoción no encontrada en la base de datos', 3000);
    console.error(`Promoción con ID ${promoId} no encontrada en allProducts`);
    return;
  }
  
  try {
    // Calcular precio final
    const newFinalPrice = newOriginalPrice * (1 - (newDiscount / 100));
    
    // Actualizar los datos de la promoción en el array
    allProducts[promoIndex] = {
      ...allProducts[promoIndex],
      name: newName,
      category: newCategory,
      originalPrice: newOriginalPrice,
      discountPercentage: newDiscount,
      price: newFinalPrice,
      stock: newStock
    };
    
    // Guardar en localStorage
    localStorage.setItem('products', JSON.stringify(allProducts));
    console.log(`✓ Promoción ID ${promoId} actualizada:`, allProducts[promoIndex]);
    
    // Actualizar la UI
    renderPromosTable();
    renderProductos(); // Actualizar gráficos y KPIs
    
    // Cerrar el modal
    closeEditPromoModal();
    
    // Mostrar notificación de éxito
    showNotification(`✓ Promoción "${newName}" actualizada exitosamente`, 3000);
    
  } catch (error) {
    console.error('Error al guardar los cambios de la promoción:', error);
    showNotification('❌ Error al guardar los cambios. Intenta de nuevo.', 3000);
  }
}

/**
 * Función global para abrir el modal desde el onclick del HTML
 */
window.openEditProductModal = openEditProductModal;
window.openEditPromoModal = openEditPromoModal;

/**
 * Función global para cerrar el modal desde el onclick del HTML
 */
window.closeEditProductModal = closeEditProductModal;
window.closeEditPromoModal = closeEditPromoModal;

/**
 * Función global para calcular precio de promoción
 */
window.calculatePromoPrice = calculatePromoPrice;

/**
 * Configurar modales para agregar productos y promociones
 */
function setupAddModals() {
  // Modal para agregar producto
  const addProductForm = document.getElementById('addProductForm');
  if (addProductForm) {
    addProductForm.addEventListener('submit', saveNewProduct);
    const addProductModal = document.getElementById('addProductModal');
    if (addProductModal) {
      addProductModal.addEventListener('click', (e) => {
        if (e.target === addProductModal) {
          closeAddProductModal();
        }
      });
    }
  }
  
  // Modal para agregar promoción
  const addPromoForm = document.getElementById('addPromoForm');
  if (addPromoForm) {
    addPromoForm.addEventListener('submit', saveNewPromo);
    const addPromoModal = document.getElementById('addPromoModal');
    if (addPromoModal) {
      addPromoModal.addEventListener('click', (e) => {
        if (e.target === addPromoModal) {
          closeAddPromoModal();
        }
      });
    }
  }
  
  console.log('✓ Modales para agregar productos configurados');
}

/**
 * Abre el modal para agregar un nuevo producto
 */
function openAddProductModal() {
  const modal = document.getElementById('addProductModal');
  if (modal) {
    modal.classList.add('active');
    console.log('✓ Modal de nuevo producto abierto');
  }
}

/**
 * Cierra el modal de agregar producto
 */
function closeAddProductModal() {
  const modal = document.getElementById('addProductModal');
  if (modal) {
    modal.classList.remove('active');
  }
  const form = document.getElementById('addProductForm');
  if (form) {
    form.reset();
  }
  console.log('✓ Modal de nuevo producto cerrado');
}

/**
 * Abre el modal para agregar una nueva promoción
 */
function openAddPromoModal() {
  const modal = document.getElementById('addPromoModal');
  if (modal) {
    modal.classList.add('active');
    console.log('✓ Modal de nueva promoción abierto');
  }
}

/**
 * Cierra el modal de agregar promoción
 */
function closeAddPromoModal() {
  const modal = document.getElementById('addPromoModal');
  if (modal) {
    modal.classList.remove('active');
  }
  const form = document.getElementById('addPromoForm');
  if (form) {
    form.reset();
  }
  console.log('✓ Modal de nueva promoción cerrado');
}

/**
 * Guarda un nuevo producto
 * @param {Event} e - Evento del formulario
 */
function saveNewProduct(e) {
  e.preventDefault();
  
  const name = document.getElementById('addProductName').value.trim();
  const category = document.getElementById('addProductCategory').value.trim();
  const price = parseFloat(document.getElementById('addProductPrice').value);
  const stock = parseInt(document.getElementById('addProductStock').value);
  
  // VALIDACIONES
  if (!name) {
    showNotification('❌ El nombre del producto es requerido', 3000);
    return;
  }
  
  if (isNaN(price) || price < 0) {
    showNotification('❌ El precio debe ser un número válido y positivo', 3000);
    return;
  }
  
  if (isNaN(stock) || stock < 0 || !Number.isInteger(stock)) {
    showNotification('❌ El stock debe ser un número entero positivo', 3000);
    return;
  }
  
  try {
    // Generar nuevo ID (el máximo ID de productos normales es 30)
    const maxProductId = Math.max(...allProducts.filter(p => p.id < 100).map(p => p.id), 0);
    const newId = maxProductId + 1;
    
    // Crear nuevo producto
    const newProduct = {
      id: newId,
      name: name,
      category: category || 'SIN CATEGORÍA',
      price: price,
      stock: stock,
      image: ''
    };
    
    // Agregar a allProducts
    allProducts.push(newProduct);
    
    // Guardar en localStorage
    localStorage.setItem('products', JSON.stringify(allProducts));
    console.log(`✓ Nuevo producto agregado:`, newProduct);
    
    // Actualizar UI
    renderProductsTable();
    renderProductos();
    
    // Cerrar modal
    closeAddProductModal();
    
    showNotification(`✓ Producto "${name}" agregado exitosamente (ID: ${newId})`, 3000);
  } catch (error) {
    console.error('Error al agregar producto:', error);
    showNotification('❌ Error al agregar el producto. Intenta de nuevo.', 3000);
  }
}

/**
 * Guarda una nueva promoción
 * @param {Event} e - Evento del formulario
 */
function saveNewPromo(e) {
  e.preventDefault();
  
  const name = document.getElementById('addPromoName').value.trim();
  const category = document.getElementById('addPromoCategory').value.trim();
  const originalPrice = parseFloat(document.getElementById('addPromoOriginalPrice').value);
  const discount = parseFloat(document.getElementById('addPromoDiscount').value);
  const stock = parseInt(document.getElementById('addPromoStock').value);
  
  // VALIDACIONES
  if (!name) {
    showNotification('❌ El nombre de la promoción es requerido', 3000);
    return;
  }
  
  if (isNaN(originalPrice) || originalPrice < 0) {
    showNotification('❌ El precio original debe ser un número válido y positivo', 3000);
    return;
  }
  
  if (isNaN(discount) || discount < 0 || discount > 100) {
    showNotification('❌ El descuento debe estar entre 0 y 100%', 3000);
    return;
  }
  
  if (isNaN(stock) || stock < 0 || !Number.isInteger(stock)) {
    showNotification('❌ El stock debe ser un número entero positivo', 3000);
    return;
  }
  
  try {
    // Generar nuevo ID (promotions start from 100)
    const maxPromoId = Math.max(...allProducts.filter(p => p.id >= 100).map(p => p.id), 99);
    const newId = maxPromoId + 1;
    
    // Calcular precio final con descuento
    const finalPrice = originalPrice * (1 - (discount / 100));
    
    // Crear nueva promoción
    const newPromo = {
      id: newId,
      name: name,
      category: category || 'PROMOCIONES',
      price: finalPrice,
      originalPrice: originalPrice,
      discountPercentage: discount,
      stock: stock,
      image: ''
    };
    
    // Agregar a allProducts
    allProducts.push(newPromo);
    
    // Guardar en localStorage
    localStorage.setItem('products', JSON.stringify(allProducts));
    console.log(`✓ Nueva promoción agregada:`, newPromo);
    
    // Actualizar UI
    renderPromosTable();
    renderProductos();
    
    // Cerrar modal
    closeAddPromoModal();
    
    showNotification(`✓ Promoción "${name}" agregada exitosamente (ID: ${newId})`, 3000);
  } catch (error) {
    console.error('Error al agregar promoción:', error);
    showNotification('❌ Error al agregar la promoción. Intenta de nuevo.', 3000);
  }
}

/**
 * Funciones globales para abrir modales desde onclick
 */
window.openAddProductModal = openAddProductModal;
window.closeAddProductModal = closeAddProductModal;
window.openAddPromoModal = openAddPromoModal;
window.closeAddPromoModal = closeAddPromoModal;
