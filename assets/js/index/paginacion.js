// Importar los productos y funciones necesarias
import products from './productos.js';
import { showProductModal } from './modal.js';
import { agregarAlCarrito } from './carrito.js';

// Variables para la paginación
let currentPage = 1;
const productsPerPage = 9;

// Función para mostrar productos en la página actual
function displayProducts(filteredProducts) {
    const container = document.getElementById("product-container");
    if (!container) {
        console.error("Elemento 'product-container' no encontrado");
        return;
    }
    
    container.innerHTML = "";
    
    // Calcular productos para la página actual
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    // Mostrar productos
    productsToShow.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">Categoría: ${product.category}</p>
                <div class="product-price">S/.${product.price.toFixed(2)}</div>
                <button class="see-more-button">Ver más</button>
                <button class="buy-button">Agregar al carrito</button>
            </div>
        `;
        
        // Agregar event listeners a los botones
        const seeMoreBtn = productCard.querySelector('.see-more-button');
        seeMoreBtn.addEventListener('click', () => showProductModal(product));
        
        const buyBtn = productCard.querySelector('.buy-button');
        buyBtn.addEventListener('click', () => agregarAlCarrito(product.name, product.price, product.image));
        
        container.appendChild(productCard);
    });

    // Actualizar paginación
    updatePagination(filteredProducts.length);
}

// Función para actualizar la paginación
function updatePagination(totalProducts) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const paginationContainer = document.getElementById("pagination");
    
    if (!paginationContainer) {
        console.error("Elemento 'pagination' no encontrado");
        return;
    }
    
    paginationContainer.innerHTML = "";

    // Botón anterior
    const prevButton = document.createElement("button");
    prevButton.innerText = "Anterior";
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            filterAndSortProducts();
        }
    };
    paginationContainer.appendChild(prevButton);

    // Botones de página
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i;
        pageButton.classList.toggle("active", i === currentPage);
        pageButton.onclick = () => {
            currentPage = i;
            filterAndSortProducts();
        };
        paginationContainer.appendChild(pageButton);
    }

    // Botón siguiente
    const nextButton = document.createElement("button");
    nextButton.innerText = "Siguiente";
    nextButton.disabled = currentPage === totalPages || totalPages === 0;
    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            filterAndSortProducts();
        }
    };
    paginationContainer.appendChild(nextButton);
}

// Función para filtrar y ordenar productos
function filterAndSortProducts() {
    const categorySelect = document.getElementById('category-select');
    const sortSelect = document.getElementById('sort-select');
    
    if (!categorySelect || !sortSelect) {
        console.error("Elementos de selección no encontrados");
        return;
    }
    
    const selectedCategory = categorySelect.value;
    const sortOrder = sortSelect.value;

    let filteredProducts = [...products];

    // Filtrar por categoría
    if (selectedCategory !== 'TODOS') {
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }

    // Ordenar productos
    switch(sortOrder) {
        case 'menor':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'mayor':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'ultimo':
            filteredProducts.reverse();
            break;
        default:
            // Mantener orden original para 'predeterminado'
            if (selectedCategory !== 'TODOS') {
                filteredProducts = products.filter(product => product.category === selectedCategory);
            }
    }

    displayProducts(filteredProducts);
}

// Inicializar event listeners para los selectores de filtro
function initPaginationListeners() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', filterAndSortProducts);
    }
    
    const categorySelect = document.getElementById('category-select');
    if (categorySelect) {
        categorySelect.addEventListener('change', () => {
            currentPage = 1; // Resetear a primera página al cambiar categoría
            filterAndSortProducts();
        });
    }
}

// Exportar funciones y variables
export {
    displayProducts,
    updatePagination,
    filterAndSortProducts,
    initPaginationListeners,
    currentPage,
    productsPerPage
};
// En paginacion.js, agrega una nueva función:
export function displayFeaturedProducts(productsArray, limit = 6) {
    const container = document.getElementById("featured-products-container");
    if (!container) return;
    
    // Limpia el contenedor
    container.innerHTML = "";
    
    // Toma solo los primeros 'limit' productos o productos destacados
    const featuredProducts = productsArray.slice(0, limit);
    
    // Crear contenedor con scroll horizontal
    const scrollContainer = document.createElement("div");
    scrollContainer.className = "featured-products-scroll";
    
    // Agregar productos al contenedor
    featuredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card", "featured-product");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">Categoría: ${product.category}</p>
                <div class="product-price">S/.${product.price.toFixed(2)}</div>
                <button class="see-more-button">Ver más</button>
                <button class="buy-button">Agregar al carrito</button>
            </div>
        `;
        
        // Agregar event listeners a los botones
        const seeMoreBtn = productCard.querySelector('.see-more-button');
        seeMoreBtn.addEventListener('click', () => showProductModal(product));
        
        const buyBtn = productCard.querySelector('.buy-button');
        buyBtn.addEventListener('click', () => agregarAlCarrito(product.name, product.price, product.image));
        
        scrollContainer.appendChild(productCard);
    });
    
    // Agregar el contenedor con scroll al contenedor principal
    container.appendChild(scrollContainer);
    
    // Agregar enlace a la tienda completa
    const viewAllLink = document.createElement("div");
    viewAllLink.className = "view-all-link";
    viewAllLink.innerHTML = `<a href="tienda.html" class="btn btn-outline">Ver todos los productos</a>`;
    container.appendChild(viewAllLink);
}