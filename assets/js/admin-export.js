/**
 * admin-export.js
 * Módulo de exportación para CRM Dashboard
 * Proporciona funcionalidades para exportar datos a CSV, Excel y PDF
 */

// ===== FUNCIONES DE UI =====

/**
 * Muestra o oculta el loader
 */
function showLoader(show = true, text = 'Generando reportes...') {
  const loader = document.getElementById('loader');
  if (!loader) return;
  
  if (show) {
    document.getElementById('loaderText').textContent = text;
    loader.classList.add('active');
  } else {
    loader.classList.remove('active');
  }
}

/**
 * Muestra notificaciones al usuario
 */
function showNotification(message, duration = 3000) {
  const notification = document.getElementById('notification');
  if (!notification) {
    console.warn('Elemento de notificación no encontrado');
    return;
  }
  
  notification.textContent = message;
  notification.classList.add('active');
  
  setTimeout(() => {
    notification.classList.remove('active');
  }, duration);
}

// ===== EXPORTACIÓN A CSV =====

/**
 * Exporta datos a formato CSV
 * @param {Array} data - Array de objetos con los datos
 * @param {Array} headers - Array con los encabezados
 * @param {string} filename - Nombre del archivo a descargar
 */
function exportToCSV(data, headers, filename = 'datos.csv') {
  if (!data || data.length === 0) {
    showNotification('❌ No hay datos para exportar', 3000);
    return;
  }
  
  showLoader(true, 'Generando CSV...');
  
  try {
    // Convertir datos a CSV usando Papa Parse si está disponible
    const csv = Papa.unparse({
      fields: headers,
      data: data
    });
    
    // Crear blob y descargar
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification(`✓ ${filename} descargado exitosamente`, 3000);
    console.log(`✓ CSV exportado: ${filename}`);
    
  } catch (error) {
    console.error('Error exportando CSV:', error);
    showNotification('❌ Error al exportar CSV', 3000);
  } finally {
    showLoader(false);
  }
}

// ===== EXPORTACIÓN A EXCEL =====

/**
 * Exporta datos a formato Excel (.xlsx)
 * @param {Array} data - Array de objetos con los datos
 * @param {Array} headers - Array con los encabezados
 * @param {string} filename - Nombre del archivo a descargar
 * @param {string} sheetName - Nombre de la hoja de Excel
 */
function exportToExcel(data, headers, filename = 'datos.xlsx', sheetName = 'Datos') {
  if (!data || data.length === 0) {
    showNotification('❌ No hay datos para exportar', 3000);
    return;
  }
  
  showLoader(true, 'Generando Excel...');
  
  try {
    // Crear workbook y hoja
    const workbook = XLSX.utils.book_new();
    
    // Convertir datos a formato para Excel
    const worksheetData = [headers, ...data.map(row => 
      headers.map(header => row[header] || '')
    )];
    
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    
    // Ajustar ancho de columnas
    const colWidths = headers.map(h => ({ wch: Math.min(h.length + 2, 20) }));
    worksheet['!cols'] = colWidths;
    
    // Agregar hoja al workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    
    // Descargar
    XLSX.writeFile(workbook, filename);
    
    showNotification(`✓ ${filename} descargado exitosamente`, 3000);
    console.log(`✓ Excel exportado: ${filename}`);
    
  } catch (error) {
    console.error('Error exportando Excel:', error);
    showNotification('❌ Error al exportar Excel', 3000);
  } finally {
    showLoader(false);
  }
}

// ===== EXPORTACIÓN A PDF =====

/**
 * Exporta una tabla a PDF
 * @param {Array} data - Array de objetos con los datos
 * @param {Array} headers - Array con los encabezados
 * @param {string} filename - Nombre del archivo a descargar
 * @param {string} title - Título del documento
 */
function exportToPDF(data, headers, filename = 'datos.pdf', title = 'Reporte') {
  if (!data || data.length === 0) {
    showNotification('❌ No hay datos para exportar', 3000);
    return;
  }
  
  showLoader(true, 'Generando PDF...');
  
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Agregar título
    doc.setFontSize(16);
    doc.text(title, 14, 22);
    
    // Formato de tabla
    const tableData = data.map(row =>
      headers.map(header => {
        const value = row[header];
        return value !== undefined && value !== null ? String(value) : '';
      })
    );
    
    // Usar autoTable para crear tabla
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 30,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' }
    });
    
    // Descargar
    doc.save(filename);
    
    showNotification(`✓ ${filename} descargado exitosamente`, 3000);
    console.log(`✓ PDF exportado: ${filename}`);
    
  } catch (error) {
    console.error('Error exportando PDF:', error);
    showNotification('❌ Error al exportar PDF', 3000);
  } finally {
    showLoader(false);
  }
}

// ===== EXPORTACIÓN DE GRÁFICOS =====

/**
 * Convierte un canvas (gráfico) a imagen PNG
 * @param {string} canvasId - ID del canvas a convertir
 * @returns {Promise<string>} URL de datos en base64
 */
async function canvasToImage(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas ${canvasId} no encontrado`);
    return null;
  }
  
  return canvas.toDataURL('image/png');
}

/**
 * Exporta un gráfico a PDF
 * @param {string} canvasId - ID del canvas del gráfico
 * @param {string} filename - Nombre del archivo
 * @param {string} title - Título del gráfico
 */
async function exportChartToPDF(canvasId, filename = 'grafico.pdf', title = 'Gráfico') {
  showLoader(true, 'Capturando gráfico...');
  
  try {
    const imageUrl = await canvasToImage(canvasId);
    if (!imageUrl) {
      showNotification('❌ No se pudo capturar el gráfico', 3000);
      return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text(title, 14, 20);
    
    doc.addImage(imageUrl, 'PNG', 10, 30, 190, 120);
    doc.save(filename);
    
    showNotification(`✓ ${filename} descargado exitosamente`, 3000);
    
  } catch (error) {
    console.error('Error exportando gráfico:', error);
    showNotification('❌ Error al exportar gráfico', 3000);
  } finally {
    showLoader(false);
  }
}

// ===== FUNCIONES GLOBALES =====

/**
 * Hacer funciones disponibles globalmente para onclick en HTML
 */
window.showLoader = showLoader;
window.showNotification = showNotification;
window.exportToCSV = exportToCSV;
window.exportToExcel = exportToExcel;
window.exportToPDF = exportToPDF;
window.exportChartToPDF = exportChartToPDF;
window.canvasToImage = canvasToImage;

console.log('✓ Módulo de exportación cargado');
