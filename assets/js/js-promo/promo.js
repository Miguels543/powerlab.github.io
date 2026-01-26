// Importaciones necesarias
import { agregarAlCarrito } from '../index/carrito.js';
import { showFullscreenModal } from './modal-promo.js';

// Datos de promociones con descripciones y características expandidas
const promociones = [
    {
        id: 1,
        name: "Iso XP Chopina",
        category: "PROTEÍNAS",
        originalPrice: 545.00,
        discountPercentage: 24.6,
        image: "assets/img/product/promotion.png",
        description: "Iso xp Chopina + Creatina Nutrex o Dragon Pharma + Shaker + 2 energizantes x-b + preentreno. Paquete completo diseñado para maximizar tu rendimiento y recuperación muscular con todos los suplementos necesarios. Proteína de alta calidad para construcción muscular y creatina para potenciar fuerza y resistencia durante entrenamientos intensos.",
        features: [
            "80% de contenido proteico para recuperación óptima",
            "Bajo en grasa y azúcar, compatible con cualquier dieta",
            "20g de proteína por porción con todos los aminoácidos esenciales",
            "Digestión rápida para máximo aprovechamiento",
            "Incluye shaker, preentreno y energizantes complementarios"
        ],
        additionalImages: [
            "assets/img/product/promotion.png"
        ]
    },
    {
        id: 2,
        name: "Creatina Dragon Pharma",
        category: "SUPLEMENTOS",
        originalPrice: 140,
        discountPercentage: 29,
        image: "assets/img/product/promotion(2).png",
        description: "Dragon pharma + shaker + 1 preentreno o 2 energizantes x-b. Creatina premium de máxima pureza, uno de los suplementos más estudiados y eficaces para aumentar fuerza, potencia y masa muscular. Incluye shaker y, a elección, un potente preentreno o energizantes para impulsar tus entrenamientos.",
        features: [
            "Aumenta la fuerza muscular en entrenamientos intensos",
            "100% monohidrato puro sin aditivos innecesarios",
            "Fórmula micronizada para mejor absorción",
            "Promueve la hidratación intramuscular y síntesis de ATP",
            "Incluye shaker y suplementos energéticos complementarios"
        ],
        additionalImages: [
            "assets/img/product/promotion(2).png"
        ]
    },
    {
        id: 3,
        name: "Proteína Prostar",
        category: "PROTEÍNAS",
        originalPrice: 485.00,
        discountPercentage: 27.8,
        image: "assets/img/product/promotion(3).png",
        description: "Prostar + Creatina Nutrex o dragón pharma + shaker + 2 x-b o preentreno. Batidos proteicos listos para beber, ideales para deportistas con necesidad de nutrición instantánea. Incluye creatina premium, shaker profesional y energizantes para potenciar tu rendimiento.",
        features: [
            "Proteína lista para consumir sin preparación necesaria",
            "25g de proteína por botella para máxima nutrición",
            "Fórmula con proteínas de rápida y lenta absorción",
            "Bajo en grasas y azúcares, sin conservantes artificiales",
            "Formato conveniente con suplementos complementarios incluidos"
        ],
        additionalImages: [
            "assets/img/product/promotion(3).png"
        ]
    },
    {
        id: 4,
        name: "Iso Cool",
        category: "PROTEÍNAS",
        originalPrice: 580.00,
        discountPercentage: 27.6,
        image: "/assets/img/product/promotion(4).jpg",
        description: "Iso cool + Creatina dragón o la nutrex + shaker + preentreno o 2 energizantes. Proteína aislada de nueva generación con filtración avanzada que elimina grasas, carbohidratos y lactosa. Combinada con creatina premium, shaker profesional y preentreno o energizantes para maximizar tu rendimiento deportivo.",
        features: [
            "Proteína aislada >90% de pureza, mínimo contenido de grasas",
            "Filtración avanzada para máxima calidad y asimilación",
            "Virtualmente libre de lactosa, ideal para intolerantes",
            "Rica en BCAA's y glutamina para mejor recuperación",
            "Perfecta para fases de definición muscular con sabores premium"
        ],
        additionalImages: [
            "assets/img/product/promotion(4).jpg"
        ]
    }
];


// Función para calcular el precio con descuento
function calcularPrecioConDescuento(producto) {
    const precioDescuento = producto.originalPrice * (1 - (producto.discountPercentage / 100));
    return precioDescuento.toFixed(2);
}

// Función para renderizar las promociones
function renderizarPromociones() {
    const gridContainer = document.getElementById('promociones-grid');
    
    // Validar existencia del contenedor
    if (!gridContainer) {
        console.error('Contenedor de promociones no encontrado');
        return;
    }

    // Limpiar contenedor
    gridContainer.innerHTML = '';
    
    // Renderizar cada producto
    promociones.forEach(producto => {
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
                        <span class="precio-original">S/.${producto.originalPrice.toFixed(2)}</span>
                        <span class="precio-descuento">S/.${precioDescuento}</span>
                    </div>
                </div>
                <div class="producto-botones">
                    <button class="btn-ver-mas" data-id="${producto.id}">Ver más</button>
                    <button class="btn-agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
                </div>
            </div>
        `;
        
        gridContainer.appendChild(productoCard);

        // Configurar event listeners
        const btnVerMas = productoCard.querySelector('.btn-ver-mas');
        const btnAgregarCarrito = productoCard.querySelector('.btn-agregar-carrito');

        // Ahora usamos el nuevo modal de pantalla completa
        btnVerMas.addEventListener('click', () => {
            // Crear objeto con estructura necesaria para el modal
            const productoParaModal = {
                ...producto,
                price: parseFloat(precioDescuento)
            };
            
            // Llamar a la función que muestra el modal de pantalla completa
            showFullscreenModal(productoParaModal);
        });

        // Evento Agregar al carrito
        btnAgregarCarrito.addEventListener('click', () => {
            agregarAlCarrito(
                producto.name, 
                parseFloat(precioDescuento), 
                producto.image || ''
            );
        });
    });
}

// Renderizar las promociones cuando la página carga
// Comentando esta línea para evitar inicialización duplicada
// document.addEventListener('DOMContentLoaded', renderizarPromociones);

// Exportar para posible uso en otros módulos
export { 
    promociones, 
    renderizarPromociones, 
    calcularPrecioConDescuento 
};
