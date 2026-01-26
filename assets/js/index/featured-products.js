// Importar dependencias necesarias
import { showProductModal } from './modal.js';
import { agregarAlCarrito } from './carrito.js';

/**
 * Muestra productos destacados específicos seleccionados por ID
 * @param {Array} productsArray - Array con todos los productos
 * @param {Array} productIds - IDs de los productos que se quieren mostrar
 * @param {Number} limit - Límite de productos a mostrar (por defecto 10)
 */
export function displayFeaturedProducts(productsArray, productIds = [], limit = 10) {
    const container = document.getElementById("featured-products-container");
    if (!container) {
        console.error("Contenedor de productos destacados no encontrado");
        return;
    }
    
    // Mostrar información de depuración
    console.log("Total de productos disponibles:", productsArray.length);
    console.log("Primer producto:", productsArray[0]);
    console.log("IDs de productos solicitados:", productIds);
    
    // Limpia el contenedor
    container.innerHTML = "";
    
    // Si no hay productos, mostrar mensaje y salir
    if (!productsArray || productsArray.length === 0) {
        container.innerHTML = '<p class="no-products">No hay productos disponibles</p>';
        return;
    }
    
    // Si se proporcionaron IDs específicos, filtrar por ellos
    let featuredProducts;
    
    if (productIds && productIds.length > 0) {
        // Filtrar productos por los IDs proporcionados - usando el nombre como ID principal
        featuredProducts = productsArray.filter(product => {
            const match = productIds.includes(product.name);
            // Para depuración
            if (match) {
                console.log(`Producto encontrado: ${product.name}`);
            }
            return match;
        });
        
        // Si hay menos productos encontrados que IDs proporcionados, algunos IDs pueden ser incorrectos
        if (featuredProducts.length < productIds.length) {
            console.warn(`Algunos productos no fueron encontrados. Productos encontrados: ${featuredProducts.length}/${productIds.length}`);
        }
        
        // Si no se encontró ningún producto, usar los primeros 'limit' productos como fallback
        if (featuredProducts.length === 0) {
            console.warn(`No se encontró ningún producto con los IDs proporcionados. Mostrando los primeros ${limit} productos como alternativa.`);
            featuredProducts = productsArray.slice(0, limit);
        } else if (featuredProducts.length > limit) {
            // Limitar la cantidad de productos si se excede el límite
            featuredProducts = featuredProducts.slice(0, limit);
        }
    } else {
        // Si no se proporcionaron IDs, usar los primeros 'limit' productos
        featuredProducts = productsArray.slice(0, limit);
    }
    
    // Si no hay productos para mostrar, salir
    if (featuredProducts.length === 0) {
        container.innerHTML = '<p class="no-products">No hay productos destacados para mostrar</p>';
        return;
    }
    
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
    
    // Agregar botones de navegación para el scroll
    const scrollButtons = document.createElement("div");
    scrollButtons.className = "scroll-buttons";
    scrollButtons.innerHTML = `
        <button class="scroll-button scroll-left">←</button>
        <button class="scroll-button scroll-right">→</button>
    `;
    container.appendChild(scrollButtons);
    
    // Agregar event listeners a los botones de scroll
    const scrollLeftBtn = scrollButtons.querySelector('.scroll-left');
    const scrollRightBtn = scrollButtons.querySelector('.scroll-right');
    
    scrollLeftBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
    });
    
    scrollRightBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
    });
    
    // Agregar enlace a la tienda completa
    const viewAllLink = document.createElement("div");
    viewAllLink.className = "view-all-link";
    viewAllLink.innerHTML = `<a href="tienda.html" class="btn btn-outline">Ver todos los productos</a>`;
    container.appendChild(viewAllLink);
}

// Exportar la función
export default displayFeaturedProducts;