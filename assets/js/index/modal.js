// Importar funciones necesarias del carrito
import { agregarAlCarrito } from './carrito.js';

// Modal Estándar (el existente anteriormente)
function showStandardModal(product) {
    const modal = document.createElement('div');
    modal.classList.add('product-modal');
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="modal-body">
                <div class="modal-images-container">
                    <div class="thumbnails-vertical">
                        ${product.additionalImages ? product.additionalImages.map((img, index) => `
                            <div class="thumbnail-wrapper ${index === 0 ? 'active' : ''}">
                                <img src="${img}" alt="${product.name}" class="thumbnail" data-index="${index}">
                            </div>
                        `).join('') : ''}
                    </div>
                    <div class="main-image-container">
                        <button class="slider-arrow prev" id="prevImage">&#10094;</button>
                        <div class="main-image-wrapper">
                            <img src="${product.image}" alt="${product.name}" id="modalMainImage">
                        </div>
                        <button class="slider-arrow next" id="nextImage">&#10095;</button>
                    </div>
                </div>
                <div class="modal-info">
                    <h2>${product.name}</h2>
                    <p class="modal-category">Categoría: ${product.category}</p>
                    <p class="modal-weight">Contenido: ${product.weight || 'No especificado'}</p>
                    <p class="modal-price" style="color: blue;">S/.${product.price.toFixed(2)}</p>
                    <div class="modal-description">
                        <h3>Descripción</h3>
                        <p>${product.description || 'No hay descripción disponible.'}</p>
                    </div>
                    ${product.features ? `
                        <div class="modal-features">
                            <h3>Características</h3>
                            <ul>
                                ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    <button class="buy-button" onclick="agregarAlCarrito('${product.name}', ${product.price}, '${product.image}')">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);

    // Lógica de navegación de imágenes del modal estándar
    const mainImage = modal.querySelector('#modalMainImage');
    const prevButton = modal.querySelector('#prevImage');
    const nextButton = modal.querySelector('#nextImage');
    const thumbnails = modal.querySelectorAll('.thumbnail');
    let currentImageIndex = 0;
    const images = product.additionalImages || [product.image];

    function updateImage(index) {
        currentImageIndex = index;
        mainImage.src = images[index];
        
        // Actualizar thumbnails activos
        thumbnails.forEach((thumb, i) => {
            thumb.parentElement.classList.toggle('active', i === index);
        });

        // Mostrar/ocultar botones de navegación
        prevButton.style.display = index === 0 ? 'none' : 'block';
        nextButton.style.display = index === images.length - 1 ? 'none' : 'block';
    }

    // Event listeners para botones y thumbnails
    prevButton.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            updateImage(currentImageIndex - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentImageIndex < images.length - 1) {
            updateImage(currentImageIndex + 1);
        }
    });

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            updateImage(index);
        });
    });

    // Cerrar modal
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.onclick = () => {
        document.body.removeChild(modal);
    };
}

// Nuevo Modal Detallado 
function showDetailedModal(product) {
    // Generar calificación de estrellas aleatoria
    const rating = Math.floor(Math.random() * 2) + 4;
    const starRating = '★'.repeat(rating) + '☆'.repeat(5 - rating);

    const modal = document.createElement('div');
    modal.classList.add('detailed-product-modal');
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="modal-body">
                <div class="modal-images">
                    <div class="thumbnails">
                        ${product.additionalImages ? product.additionalImages.map((img, index) => `
                            <img src="${img}" alt="${product.name}" class="thumbnail" data-index="${index}">
                        `).join('') : ''}
                    </div>
                    <div class="main-image">
                        <img src="${product.image}" alt="${product.name}" id="mainImage">
                    </div>
                </div>
                <div class="modal-details">
                    <div class="modal-info-grid">
                        <p><strong>📌 TÍTULO:</strong> ${product.name}</p>
                        <p><strong>📂 CATEGORÍA:</strong> ${product.category}</p>
                        <p><strong>⭐ CALIFICACIÓN:</strong> ${starRating} (${rating} estrellas)</p>
                        <p><strong>💰 PRECIO:</strong> S/. ${product.price.toFixed(2)}</p>
                        <p><strong>📏 PRESENTACIÓN:</strong> ${product.weight || 'No especificado'}</p>
                        
                        <div class="cantidad-selector">
                            <strong>➕ CANTIDAD:</strong>
                            <div class="quantity-control">
                                <button class="quantity-minus">-</button>
                                <input type="number" value="1" min="1" max="10" class="quantity-input">
                                <button class="quantity-plus">+</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-botones">
                        <button class="btn-agregar-carrito" onclick="agregarAlCarrito('${product.name}', ${product.price}, '${product.image}')">🛒 Agregar al Carrito</button>
                        <button class="btn-comprar-ahora">⚡ Comprar Ahora</button>
                    </div>
                    
                    <p><strong>💳 MÉTODOS DE PAGO:</strong> Tarjeta de crédito, PayPal, Transferencia</p>
                    
                    <p><strong>📄 DESCRIPCIÓN:</strong> ${product.description}</p>
                    
                    <div class="modal-caracteristicas">
                        <strong>🔍 CARACTERÍSTICAS:</strong>
                        <ul>
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="modal-beneficios">
                        <strong>💪 BENEFICIOS:</strong>
                        <ul>
                            <li><strong>Conservación óptima:</strong> Envase sellado herméticamente</li>
                            <li><strong>Portabilidad:</strong> Diseño compacto y ligero</li>
                            <li><strong>Higiene garantizada:</strong> Producto sellado y protegido</li>
                            <li><strong>Versatilidad:</strong> Múltiples usos y aplicaciones</li>
                            <li><strong>Practicidad:</strong> Fácil de usar y transportar</li>
                            <li><strong>Dosificación precisa:</strong> Medidas exactas</li>
                        </ul>
                    </div>
                    
                    <div class="modal-garantias">
                        <p>✅ <strong>COMPRA SEGURA:</strong> Aceptamos todos los medios de pago</p>
                        <p>🛠 <strong>SOPORTE 24/7:</strong> Servicio post venta</p>
                        <p>🚚 <strong>ENVÍO GRATIS:</strong> En toda Piura</p>
                        <p>🏬 <strong>TIENDA FÍSICA:</strong> Av. Grau 123, Piura</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);

    // Configurar cambio de imagen
    const mainImage = modal.querySelector('#mainImage');
    const thumbnails = modal.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            mainImage.src = thumbnail.src;
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
        });
    });

    // Configurar controles de cantidad
    const quantityMinus = modal.querySelector('.quantity-minus');
    const quantityPlus = modal.querySelector('.quantity-plus');
    const quantityInput = modal.querySelector('.quantity-input');

    quantityMinus.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    quantityPlus.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
        }
    });

    // Cerrar modal
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.onclick = () => {
        document.body.removeChild(modal);
    };

    // Cerrar al hacer clic fuera del modal
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Función para compatibilidad con importaciones anteriores
function showProductModal(product) {
    // Por defecto, usar el modal estándar
    showStandardModal(product);
}

// Función de estilos para los modales
function addModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Estilos para modal estándar */
        .product-modal {
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Resto de los estilos... (los mismos del script anterior) */
    `;
    document.head.appendChild(style);
}

// Exportar todas las funciones
export {
    showStandardModal,
    showDetailedModal,
    showProductModal,  // Para mantener compatibilidad
    addModalStyles
};