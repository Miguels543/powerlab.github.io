// Importaciones de promo.js
import { 
    promociones, 
    renderizarPromociones, 
    calcularPrecioConDescuento 
} from './promo.js';

// Importaciones implícitas de faq-2.js
// Este archivo no exporta funciones específicas, 
// pero se puede importar para que se ejecute su código
import './faq-2.js';

// Importación implícita de regresive.js
// Este archivo maneja la cuenta regresiva
import './regresive.js';

// Importaciones de protein.js
import { 
    promocionesProteinas, 
    renderizarPromocionesProteinas,
    setupCarouselControls 
} from './protein.js';

// Importación del carrito con la ruta correcta
import { agregarAlCarrito } from '../index/carrito.js';

// Importar el nuevo modal de pantalla completa
import { showFullscreenModal, addModalStyles } from './modal-promo.js';

// Función principal para inicializar la aplicación
function inicializarAplicacion() {
    console.log('Aplicación inicializada desde prin.js');
    
    // Verificar si el DOM ya está cargado
    if (document.readyState === "loading") {
        // Si no está cargado, añadir event listener
        document.addEventListener('DOMContentLoaded', inicializarComponentes);
    } else {
        // Si ya está cargado, inicializar directamente
        inicializarComponentes();
    }
}

// Función separada para inicializar componentes
function inicializarComponentes() {
    console.log('Inicializando componentes desde prin.js');
    
    // Inicializar estilos de modal
    addModalStyles();
    
    // Renderizar promociones generales
    renderizarPromociones();
    
    // Renderizar promociones de proteínas
    renderizarPromocionesProteinas();
    
    // Inicializar controles de carrusel
    setupCarouselControls();
    
    console.log('Componentes inicializados correctamente');
}

// Iniciar la aplicación
inicializarAplicacion();

// Exportar funciones y objetos que podrían ser útiles para otros módulos
export {
    inicializarAplicacion,
    promociones,
    promocionesProteinas,
    calcularPrecioConDescuento,
    agregarAlCarrito,
    showFullscreenModal
};