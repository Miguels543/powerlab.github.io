// Importar funciones necesarias del carrito
import { agregarAlCarrito } from '../index/carrito.js';

// Modificación de showFullscreenModal para eliminar la funcionalidad de cantidad
function showFullscreenModal(product) {
    const modal = document.createElement('div');
    modal.classList.add('fullscreen-product-modal');
    
    // Generar calificación de estrellas aleatoria para mostrar en el producto
    const rating = Math.floor(Math.random() * 2) + 4;
    const starRating = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    
    modal.innerHTML = `
        <div class="modal-content-fullscreen">
            <span class="modal-close">&times;</span>
            <div class="modal-body-fullscreen">
                <div class="modal-left-column">
                    <div class="thumbnails-container">
                        ${product.additionalImages ? product.additionalImages.map((img, index) => `
                            <div class="thumbnail-wrapper ${index === 0 ? 'active' : ''}">
                                <img src="${img}" alt="${product.name}" class="thumbnail" data-index="${index}">
                            </div>
                        `).join('') : ''}
                    </div>
                    <div class="main-image-container">
                        <img src="${product.image}" alt="${product.name}" id="modalMainImage">
                    </div>
                </div>
                
                <div class="modal-right-column">
                    <h1 class="product-title">${product.name}</h1>
                    <div class="product-rating">${starRating} (${rating} estrellas)</div>
                    <div class="product-category">Categoría: ${product.category}</div>
                    
                    <div class="product-price">
                        <span class="current-price">S/.${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `
                            <span class="original-price">S/.${product.originalPrice.toFixed(2)}</span>
                            <span class="discount-badge">${Math.round((1 - product.price/product.originalPrice) * 100)}% OFF</span>
                        ` : ''}
                    </div>
                    
                    <!-- Se eliminó el selector de cantidad -->
                    
                    <div class="product-actions">
                        <button class="btn-add-to-cart" id="btnAddToCart">Agregar al carrito</button>
                    </div>
                    
                   <div class="payment-methods">
                        <p>Métodos de pago:</p>
                        <div class="payment-icons">
                            <img src="./assets/img/pago/paypal.png" alt="PayPal" class="payment-icon">
                            <img src="./assets/img/pago/visa.png" alt="Visa" class="payment-icon">
                            <img src="./assets/img/pago/plin.png" alt="Plin" class="payment-icon">
                            <img src="./assets/img/pago/yape.png" alt="Yape" class="payment-icon">
                        </div>
                    </div>
                    
                    <div class="product-description">
                        <h3>Descripción</h3>
                        <p>${product.description || 'No hay descripción disponible.'}</p>
                    </div>
                    
                    <div class="product-features">
                        <h3>Características</h3>
                        <ul>
                            ${product.features ? product.features.map(feature => `<li>${feature}</li>`).join('') : '<li>No hay características disponibles</li>'}
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="product-benefits">
                <div class="benefit-item">
                    <span class="benefit-icon">✅</span>
                    <div class="benefit-content">
                        <strong>COMPRA SEGURA</strong>
                        <p>Aceptamos todos los medios de pago</p>
                    </div>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">🛠</span>
                    <div class="benefit-content">
                        <strong>SOPORTE 24/7</strong>
                        <p>Servicio post venta</p>
                    </div>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">🚚</span>
                    <div class="benefit-content">
                        <strong>ENVÍO GRATIS</strong>
                        <p>En compras de 299 PEN o más</p>
                    </div>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">🏬</span>
                    <div class="benefit-content">
                        <strong>TIENDA FÍSICA</strong>
                        <p>Av. Grau 123, Piura</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);

    // Configurar cambio de imagen
    const mainImage = modal.querySelector('#modalMainImage');
    const thumbnails = modal.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Actualizar imagen principal
            mainImage.src = thumbnail.src;
            
            // Actualizar clase active
            thumbnails.forEach(t => t.parentElement.classList.remove('active'));
            thumbnail.parentElement.classList.add('active');
        });
    });

    // Eliminamos la configuración de controles de cantidad
    
    // Configurar botones de acción
    const addToCartBtn = modal.querySelector('#btnAddToCart');
    
    addToCartBtn.addEventListener('click', () => {
        // Llamar a la función del carrito con cantidad fija de 1
        agregarAlCarrito(product.name, product.price, product.image || '');
        
        // Mostrar mensaje de confirmación
        const confirmMessage = document.createElement('div');
        confirmMessage.classList.add('add-to-cart-confirmation');
        confirmMessage.textContent = `${product.name} añadido al carrito`;
        document.body.appendChild(confirmMessage);
        
        // Eliminar mensaje después de 3 segundos
        setTimeout(() => {
            document.body.removeChild(confirmMessage);
        }, 3000);
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
// Función para añadir estilos del modal al documento
function addModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Estilos para el modal de pantalla completa */
        .fullscreen-product-modal {
            position: fixed;
            z-index: 100000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow-y: auto;
        }
        
        .modal-content-fullscreen {
            background-color: #fff;
            width: 100%;
            height: 100%;
            position: relative;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
        }
        
        .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
            z-index: 1010;
            color: #333;
            background-color: rgba(255, 255, 255, 0.8);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-body-fullscreen {
            display: flex;
            padding: 50px;
            flex: 1;
        }
        
        @media (max-width: 768px) {
            .modal-body-fullscreen {
                flex-direction: column;
                padding: 20px;
            }
        }
        
        /* Columna izquierda con imágenes */
        .modal-left-column {
            flex: 0 0 50%;
            display: flex;
            gap: 20px;
        }
        
        .thumbnails-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100px;
        }
        
        .thumbnail-wrapper {
            border: 2px solid transparent;
            cursor: pointer;
            width: 80px;
            height: 80px;
            overflow: hidden;
        }
        
        .thumbnail-wrapper.active {
            border-color: #007bff;
        }
        
        .thumbnail {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .main-image-container {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        #modalMainImage {
            max-width: 100%;
            max-height: 500px;
            object-fit: contain;
        }
        
        /* Columna derecha con información */
        .modal-right-column {
            flex: 0 0 50%;
            padding-left: 50px;
        }
        
        .product-title {
            font-size: 28px;
            margin: 0 0 10px;
            color: #333;
        }
        
        .product-rating {
            color: #f8c32c;
            margin-bottom: 10px;
        }
        
        .product-category {
            color: #777;
            margin-bottom: 20px;
        }
        
        .product-price {
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .current-price {
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }
        
        .original-price {
            font-size: 18px;
            color: #999;
            text-decoration: line-through;
        }
        
        .discount-badge {
            background-color: #e53935;
            color: white;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: bold;
        }
        
        .quantity-selector {
            margin-bottom: 30px;
        }
        
        .quantity-controls {
            display: flex;
            align-items: center;
            width: 150px;
        }
        
        .quantity-btn {
            width: 40px;
            height: 40px;
            background-color: #f5f5f5;
            border: 1px solid #ddd;
            font-size: 20px;
            cursor: pointer;
        }
        
        .quantity-input {
            width: 70px;
            height: 40px;
            text-align: center;
            border: 1px solid #ddd;
            border-left: none;
            border-right: none;
        }
        
        .product-actions {
            display: flex;
            gap: 15px;
            margin-bottom: 30px;
        }
        
        .btn-add-to-cart {
            flex: 1;
            background-color: #000;
            color: white;
            border: none;
            padding: 15px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 4px;
            transition: background-color 0.3s;
        }
        
        .btn-add-to-cart:hover {
            background-color: #333;
        }
        
        .btn-buy-now {
            flex: 1;
            background-color: white;
            color: #007bff;
            border: 2px solid #007bff;
            padding: 15px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 4px;
            transition: all 0.3s;
        }
        
        .btn-buy-now:hover {
            background-color: #007bff;
            color: white;
        }
        
        .payment-methods {
            margin-bottom: 30px;
        }
        
        .payment-icons {
            display: flex;
            gap: 15px;
            margin-top: 10px;
        }
        
        .payment-icon {
            height: 30px;
            max-width: 50px;
            object-fit: contain;
            margin-right: 10px;
        }
        
        .product-description, 
        .product-features {
            margin-bottom: 30px;
        }
        
        .product-description h3,
        .product-features h3 {
            margin-bottom: 10px;
            color: #333;
        }
        
        .product-features ul {
            padding-left: 20px;
        }
        
        .product-features li {
            margin-bottom: 5px;
        }
        
        /* Sección de beneficios en la parte inferior */
        .product-benefits {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            background-color: #f8f9fa;
            padding: 30px 50px;
            border-top: 1px solid #e9ecef;
            gap: 20px;
        }
        
        .benefit-item {
            display: flex;
            align-items: center;
            gap: 15px;
            width: calc(25% - 15px);
        }
        
        .benefit-icon {
            font-size: 30px;
            min-width: 30px;
        }
        
        .benefit-content {
            display: flex;
            flex-direction: column;
        }
        
        .benefit-content strong {
            font-size: 14px;
            color: #333;
        }
        
        .benefit-content p {
            font-size: 12px;
            color: #777;
            margin: 5px 0 0;
        }
        
        /* Mensaje de confirmación de añadir al carrito */
        .add-to-cart-confirmation {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #4caf50;
            color: white;
            padding: 15px 20px;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 1100;
            animation: fadeInOut 3s forwards;
        }
        
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(20px); }
            10% { opacity: 1; transform: translateY(0); }
            90% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(20px); }
        }
        
        /* Media queries para hacer responsive la sección de beneficios */
        @media (max-width: 1200px) {
            .benefit-item {
                width: calc(50% - 15px);
            }
        }
        
        @media (max-width: 768px) {
            .modal-right-column {
                padding-left: 0;
                padding-top: 30px;
            }
            
            .product-benefits {
                padding: 20px;
            }
            
            .benefit-item {
                width: 100%;
            }
        }
        
        @media (max-width: 576px) {
            .product-benefits {
                flex-direction: column;
                padding: 15px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Función de compatibilidad que pueden usar otros módulos
function showProductModal(product) {
    // Ahora usamos el nuevo modal de pantalla completa
    showFullscreenModal(product);
}

// Exportar todas las funciones
export {
    showFullscreenModal,
    showProductModal,
    addModalStyles
};