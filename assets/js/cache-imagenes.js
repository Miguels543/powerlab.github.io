// cache-images.js - Script para cachear imágenes de productos PowerLab
console.log('Inicializando sistema de caché de imágenes...');

// Función para extraer todas las URLs de imágenes de los productos
function extractAllImageUrls() {
    // Este array almacenará todas las URLs únicas de imágenes
    const allImageUrls = new Set();
    
    // Verificar si los productos están disponibles
    if (!window.products || !Array.isArray(window.products)) {
        console.warn('No se encontraron productos para cachear imágenes');
        return [];
    }
    
    console.log(`Encontrados ${window.products.length} productos para cachear imágenes`);
    
    // Recorrer cada producto
    window.products.forEach(product => {
        // Añadir la imagen principal
        if (product.image && product.image.startsWith('http')) {
            allImageUrls.add(product.image);
        }
        
        // Añadir imágenes adicionales
        if (product.additionalImages && Array.isArray(product.additionalImages)) {
            product.additionalImages.forEach(imgUrl => {
                if (imgUrl && imgUrl.startsWith('http')) {
                    allImageUrls.add(imgUrl);
                }
            });
        }
    });
    
    // También buscar imágenes en otros modulos si están disponibles
    if (window.accesorios && Array.isArray(window.accesorios)) {
        window.accesorios.forEach(item => {
            if (item.image && item.image.startsWith('http')) {
                allImageUrls.add(item.image);
            }
        });
    }
    
    if (window.packs && Array.isArray(window.packs)) {
        window.packs.forEach(item => {
            if (item.image && item.image.startsWith('http')) {
                allImageUrls.add(item.image);
            }
        });
    }
    
    if (window.promociones && Array.isArray(window.promociones)) {
        window.promociones.forEach(item => {
            if (item.image && item.image.startsWith('http')) {
                allImageUrls.add(item.image);
            }
        });
    }
    
    return Array.from(allImageUrls);
}

// Registrar el Service Worker
function registerImageServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/assets/js/sw-imagenes.js')
        .then(registration => {
                console.log('Service Worker para imágenes registrado correctamente:', registration.scope);
                
                // Enviar la lista de URLs al Service Worker
                setTimeout(() => {
                    const imageUrls = extractAllImageUrls();
                    console.log(`Se encontraron ${imageUrls.length} imágenes para cachear`);
                    
                    if (registration.active) {
                        registration.active.postMessage({
                            type: 'CACHE_IMAGES',
                            imageUrls: imageUrls
                        });
                    }
                }, 1000); // Pequeño retraso para asegurar que los productos estén cargados
            })
            .catch(error => {
                console.error('Error al registrar el Service Worker para imágenes:', error);
            });
    } else {
        console.warn('Este navegador no soporta Service Workers');
    }
}

// Configurar detectores de conexión
function setupConnectionHandlers() {
    // Cuando se recupera la conexión
    window.addEventListener('online', () => {
        console.log('✅ Conexión a internet restablecida');
        document.querySelectorAll('img[data-original-src]').forEach(img => {
            // Restaurar la imagen original si estamos online
            img.src = img.getAttribute('data-original-src');
        });
    });
    
    // Cuando se pierde la conexión
    window.addEventListener('offline', () => {
        console.log('❌ Conexión a internet perdida. Usando imágenes en caché');
        // No es necesario hacer nada aquí, el Service Worker se encargará
        // automáticamente de servir las imágenes desde la caché
    });
}

// Función para configurar imágenes para manejo offline
function setupOfflineImages() {
    // Detectar todas las imágenes que ya existen en el DOM
    document.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src');
        if (src && src.startsWith('http') && !img.hasAttribute('data-original-src')) {
            img.setAttribute('data-original-src', src);
            
            // Añadir manejador de errores para recuperación
            img.addEventListener('error', function(e) {
                if (!navigator.onLine) {
                    console.log('Intentando recuperar imagen desde caché:', this.src);
                    // Forzar recarga desde caché
                    const currentSrc = this.src;
                    this.src = '';
                    setTimeout(() => { this.src = currentSrc; }, 50);
                }
            });
        }
    });
    
    // Observar cambios en el DOM para capturar nuevas imágenes
    if (window.MutationObserver) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        // Si es un elemento img
                        if (node.nodeName === 'IMG') {
                            const src = node.getAttribute('src');
                            if (src && src.startsWith('http') && !node.hasAttribute('data-original-src')) {
                                node.setAttribute('data-original-src', src);
                            }
                        }
                        // Si contiene elementos img
                        else if (node.querySelectorAll) {
                            node.querySelectorAll('img').forEach(img => {
                                const src = img.getAttribute('src');
                                if (src && src.startsWith('http') && !img.hasAttribute('data-original-src')) {
                                    img.setAttribute('data-original-src', src);
                                }
                            });
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }
}

// Inicializar el sistema de caché de imágenes
function initImageCaching() {
    // Registrar el Service Worker
    registerImageServiceWorker();
    
    // Configurar manejadores de conexión
    setupConnectionHandlers();
    
    // Configurar imágenes para manejo offline
    document.addEventListener('DOMContentLoaded', () => {
        // Esperar a que se carguen los productos
        setTimeout(setupOfflineImages, 1000);
    });
}

// Iniciar el sistema
initImageCaching();

// Exportar funciones para uso en otros módulos
export { extractAllImageUrls, registerImageServiceWorker };