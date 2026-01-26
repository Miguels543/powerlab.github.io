// Importaciones necesarias
import { agregarAlCarrito } from '../index/carrito.js';
import { showFullscreenModal } from './modal-promo.js';

// Datos de promociones de proteínas
const promocionesProteinas = [
    {
        id: 4,
        name: "Iso Xp",
        category: "PROTEINAS",
        originalPrice: 420,
        discountPercentage: 20,
        image: "/assets/img/protein/iso.jpeg",
        description: "Proteína en polvo de alta calidad con un 80% de contenido proteico.",
        features: [
            "80% de contenido proteico",
            "Bajo en grasa y azúcar", 
            "Ideal para recuperación muscular"
        ],
        additionalImages: [
            "/assets/img/protein/iso.jpeg",
            "/assets/img/protein/iso-xp-choco.png",
            "/assets/img/protein/iso-xp-chocolate.png",
            "/assets/img/protein/iso-xp-vainilla.png",
        ]
    },
    {
        id: 5,
        name: "Gold estándar 100% whey gold",
        category: "PROTEINAS",
        originalPrice: 480,
        discountPercentage: 25,
        image: "/assets/img/protein/gold.jpeg",
        description: "Proteína 100% vegetal, perfecta para dietas vegetarianas y veganas.",
        features: [
            "Proteína 100% vegetal",
            "Sin lácteos",
            "Rico en aminoácidos esenciales"
        ],
        additionalImages: [
            "/assets/img/protein/gold.jpeg", 
            "/assets/img/protein/gold.png"   
        ]
    },
    {
        id: 6,
        name: "Whey pro 1.1kg",
        category: "PROTEINAS",
        originalPrice: 140,
        discountPercentage: 36,
        image: "/assets/img/protein/whey.jpeg",
        description: "Proteína aislada de última generación, ultrapura y de rápida absorción.",
        features: [
            "Proteína aislada",
            "Máxima pureza",
            "Rápida absorción"
        ],
        additionalImages: [
            "/assets/img/protein/whey.jpeg",
            "/assets/img/protein/hydro-whey.png"
         ]
    }
];

// Función para calcular el precio con descuento
function calcularPrecioConDescuento(producto) {
    const precioDescuento = producto.originalPrice * (1 - (producto.discountPercentage / 100));
    return precioDescuento.toFixed(2);
}

// Función para renderizar las promociones de proteínas
function renderizarPromocionesProteinas() {
    console.log('Renderizando proteínas...');
    const carouselContainer = document.getElementById('proteinas-carousel');
    
    // Verificar si el contenedor existe
    if (!carouselContainer) {
        console.error('Contenedor de proteínas no encontrado');
        return;
    }
    
    // Limpiar contenedor para evitar duplicados
    carouselContainer.innerHTML = '';
    
    promocionesProteinas.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.classList.add('producto-card');
        
        const precioDescuento = calcularPrecioConDescuento(producto);
        
        productoCard.innerHTML = `
            <img src="${producto.image}" alt="${producto.name}">
            <div class="producto-info">
                <h3>${producto.name}</h3>
                <p>${producto.description}</p>
                <div class="producto-precios">
                    <span class="descuento-tag">${producto.discountPercentage}% OFF</span>
                    <div>
                        <span class="precio-original">S/${producto.originalPrice.toFixed(2)}</span>
                        <span class="precio-descuento">S/${precioDescuento}</span>
                    </div>
                </div>
                <div class="producto-botones">
                    <button class="btn-ver-mas" data-id="${producto.id}">Ver más</button>
                    <button class="btn-agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
                </div>
            </div>
        `;
        
        carouselContainer.appendChild(productoCard);

        // Agregar event listeners para los botones
        const btnVerMas = productoCard.querySelector('.btn-ver-mas');
        const btnAgregarCarrito = productoCard.querySelector('.btn-agregar-carrito');

        // Evento ver más - Ahora usa showFullscreenModal
        btnVerMas.addEventListener('click', () => {
            // Preparar objeto para el modal con el precio ya calculado
            const productoParaModal = {
                ...producto,
                price: parseFloat(precioDescuento)
            };
            
            // Mostrar el modal de pantalla completa
            showFullscreenModal(productoParaModal);
        });

        // Evento Agregar al carrito - Corregido para pasar los parámetros correctos
        btnAgregarCarrito.addEventListener('click', () => {
            agregarAlCarrito(
                producto.name,
                parseFloat(precioDescuento),
                producto.image
            );
        });
    });
}

// Declaración para la función setupCarouselControls
function setupCarouselControls() {
    console.log('Controles de carrusel inicializados');
    // Aquí iría la lógica para controlar el carrusel
}

// NO inicializamos aquí, lo dejamos para prin.js
// Comentamos el event listener para evitar inicialización duplicada
/*
document.addEventListener('DOMContentLoaded', () => {
    renderizarPromocionesProteinas();
    setupCarouselControls();
});
*/

// Exportar variables y funciones para uso en otros módulos
export { 
    promocionesProteinas, 
    calcularPrecioConDescuento, 
    renderizarPromocionesProteinas,
    setupCarouselControls 
};