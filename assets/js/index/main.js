// Importar los módulos necesarios
import products from './productos.js';
import { loadCart, mostrarCarrito, cerrarCarrito, agregarAlCarrito } from './carrito.js';
import { addModalStyles } from './modal.js';
import { displayProducts, initPaginationListeners } from './paginacion.js';
import { displayFeaturedProducts } from './featured-products.js';
// Importar los nuevos módulos
import { accesorios, displayAccesorios } from './accesorios.js';
import { packs, promociones, displayPacks, displayPromociones } from './packs.js';
// Importar el módulo de caché de imágenes
import '../cache-imagenes.js';
// Hacer que agregarAlCarrito esté disponible globalmente para los onclick en el HTML
window.products = products;
window.agregarAlCarrito = agregarAlCarrito;

// Función para configurar la navegación móvil
function setupMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.toggle('active');
            }
        });
    }
}

// Función para configurar los eventos del carrito
function setupCartEvents() {
    // Agregar evento al icono del carrito
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', mostrarCarrito);
    }
    
    // Agregar evento al botón de cerrar carrito
    const closeCartBtn = document.getElementById('cart-close');
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', cerrarCarrito);
    }
    
    // Agregar evento al overlay del carrito
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', cerrarCarrito);
    }
}

// Función para manejar el formulario de suscripción
function setupSubscriptionForm() {
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert('¡Gracias por suscribirte! Te mantendremos informado.');
            this.reset();
        });
    }
}

// Función para detectar en qué página estamos
function detectCurrentPage() {
    const isHomePage = document.body.classList.contains('home-page') || 
                       window.location.pathname === '/' || 
                       window.location.pathname.includes('index');
                       
    const isShopPage = document.body.classList.contains('shop-page') || 
                       window.location.pathname.includes('tienda');
                       
    return { isHomePage, isShopPage };
}

// Función para manejar errores generales
function handleError(message) {
    console.error(`Error: ${message}`);
    // Aquí podrías añadir código para mostrar el error al usuario
}

// Función para cargar todos los tipos de productos
function loadAllProducts() {
    console.log("Cargando todos los tipos de productos...");
    
    // 1. Mostrar productos destacados si existe el contenedor
    if (document.getElementById('featured-products-container')) {
        try {
            console.log("Intentando mostrar productos destacados...");
            displayFeaturedProducts(products, [], 6); // Sin IDs específicos, muestra los 10 primeros
            console.log("Productos destacados mostrados correctamente");
        } catch (error) {
            console.error("Error al mostrar productos destacados:", error);
        }
    }
    
    // 2. Mostrar accesorios si existe el contenedor
    if (document.getElementById('accesorios-container')) {
        try {
            console.log("Intentando mostrar accesorios...");
            displayAccesorios();
            console.log("Accesorios mostrados correctamente");
        } catch (error) {
            console.error("Error al mostrar accesorios:", error);
        }
    }
    
    // 3. Mostrar packs si existe el contenedor
    if (document.getElementById('packs-container')) {
        try {
            console.log("Intentando mostrar packs...");
            displayPacks();
            console.log("Packs mostrados correctamente");
        } catch (error) {
            console.error("Error al mostrar packs:", error);
        }
    }
    
    // 4. Mostrar promociones si existe el contenedor
    if (document.getElementById('promociones-container')) {
        try {
            console.log("Intentando mostrar promociones...");
            displayPromociones();
            console.log("Promociones mostradas correctamente");
        } catch (error) {
            console.error("Error al mostrar promociones:", error);
        }
    }

    // 5. Si estamos en la página de tienda, mostrar todos los productos
    if (document.getElementById('product-container')) {
        try {
            console.log("Intentando mostrar todos los productos...");
            initPaginationListeners();
            displayProducts(products);
            console.log("Todos los productos mostrados correctamente");
        } catch (error) {
            console.error("Error al mostrar todos los productos:", error);
        }
    }
}

// Inicialización de la aplicación cuando el DOM está listo
document.addEventListener("DOMContentLoaded", () => {
    console.log("Documento cargado. Inicializando aplicación...");
    
    try {
        // Cargar carrito desde localStorage
        loadCart();
        
        // Configurar eventos del carrito
        setupCartEvents();
        
        // Agregar estilos para el modal
        addModalStyles();
        
        // Configurar la navegación móvil
        setupMobileNav();
        
        // Configurar formulario de suscripción
        setupSubscriptionForm();
        
        // Cargar todos los tipos de productos
        loadAllProducts();
        
        console.log("Aplicación inicializada correctamente");
    } catch (error) {
        handleError(`Error al inicializar la aplicación: ${error.message}`);
    }
});

// Cambiar el título cuando el usuario cambia de pestaña
document.addEventListener('visibilitychange', function() {
    document.title = document.hidden ? "¿Ya te vas?😢" : "PowerLab - Suplementos Deportivos";
});

console.log("main.js cargado correctamente");