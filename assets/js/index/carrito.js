// Inicializar carrito
let carrito = [];

// Cargar carrito desde localStorage
function loadCart() {
    const savedCart = localStorage.getItem('carrito');
    if (savedCart) {
        try {
            // Parse y validar los datos del carrito
            const parsedCart = JSON.parse(savedCart);
            carrito = parsedCart.filter(item => 
                typeof item.nombre === 'string' && 
                typeof item.precio === 'number' && 
                typeof item.cantidad === 'number'
            ).map(item => ({
                nombre: item.nombre,
                precio: item.precio,
                imagen: item.imagen || '',
                cantidad: item.cantidad
            }));
            
            actualizarCarrito();
        } catch (error) {
            console.error('Error al cargar el carrito:', error);
            localStorage.removeItem('carrito');
        }
    }
}

// Guardar carrito en localStorage
function saveCart() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Mostrar carrito
function mostrarCarrito() {
    document.getElementById('cartOverlay').classList.add('show-overlay');
    document.getElementById('cartSidebar').classList.add('show-cart');
}

// Cerrar carrito
function cerrarCarrito() {
    document.getElementById('cartOverlay').classList.remove('show-overlay');
    document.getElementById('cartSidebar').classList.remove('show-cart');
}

// Agregar producto al carrito
function agregarAlCarrito(nombre, precio, imagen) {
    console.log("Agregando al carrito:", nombre, precio, imagen);
    
    // Validar que los parámetros sean correctos
    if (!nombre || precio === undefined || precio === null) {
        console.error('Datos de producto inválidos');
        return;
    }

    const productoExistente = carrito.find(item => item.nombre === nombre);
    
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: Number(precio),
            imagen: imagen || '',
            cantidad: 1
        });
    }
    
    saveCart();
    actualizarCarrito();
    mostrarCarrito();
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    saveCart();
    actualizarCarrito();
}

// Cambiar cantidad de un producto
function cambiarCantidad(index, delta) {
    carrito[index].cantidad = Math.max(1, carrito[index].cantidad + delta);
    saveCart();
    actualizarCarrito();
}

// Actualizar la UI del carrito
function actualizarCarrito() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) {
        console.error("Elemento 'cartItems' no encontrado");
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    let productos = [];

    carrito.forEach((item, index) => {
        // Validar que el precio sea un número
        const precio = Number(item.precio);
        const cantidad = Number(item.cantidad);
        
        if (isNaN(precio) || isNaN(cantidad)) {
            console.error('Datos de producto inválidos:', item);
            return;
        }

        const subtotal = precio * cantidad;
        total += subtotal;
        productos.push(`${item.nombre} (x${cantidad})`);
        
        // Crear el elemento del item del carrito
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.imagen || ''}" alt="${item.nombre}">
            <div>
                <div class="cart-item-title">${item.nombre}</div>
                <div class="cart-item-price">S/.${precio.toFixed(2)}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus" data-index="${index}">-</button>
                <span>${cantidad}</span>
                <button class="quantity-btn plus" data-index="${index}">+</button>
            </div>
            <button class="cart-item-remove" data-index="${index}">×</button>
        `;
        
        // Agregar el item al contenedor del carrito
        cartItems.appendChild(itemElement);
    });
    
    // Si el carrito está vacío, mostrar mensaje
    if (carrito.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart-message">Tu carrito está vacío</p>';
    } else {
        // Agregar event listeners a los botones
        setupCartButtons();
    }

    // Actualizar el total del carrito
    const cartTotal = document.getElementById('cartTotal');
    if (cartTotal) {
        cartTotal.textContent = total.toFixed(2);
    }
    
    // Actualizar el enlace de WhatsApp
    const mensaje = `Hola, estoy interesado en los siguientes productos: ${productos.join(', ')}. El total es S/.${total.toFixed(2)}.`;
    const whatsappLink = document.getElementById('whatsappLink');
    if (whatsappLink) {
        whatsappLink.href = `https://wa.me/51994379232?text=${encodeURIComponent(mensaje)}`;
    }
}

// Configurar los botones del carrito
function setupCartButtons() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;
    
    // Botones para disminuir cantidad
    const minusButtons = cartItems.querySelectorAll('.quantity-btn.minus');
    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            cambiarCantidad(index, -1);
        });
    });
    
    // Botones para aumentar cantidad
    const plusButtons = cartItems.querySelectorAll('.quantity-btn.plus');
    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            cambiarCantidad(index, 1);
        });
    });
    
    // Botones para eliminar items
    const removeButtons = cartItems.querySelectorAll('.cart-item-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            eliminarDelCarrito(index);
        });
    });
}

// Inicializar event listener para el overlay del carrito
function initCartListeners() {
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', cerrarCarrito);
    }
}

// Exportar funciones y variables
export {
    carrito,
    loadCart,
    saveCart,
    mostrarCarrito,
    cerrarCarrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    cambiarCantidad,
    actualizarCarrito,
    initCartListeners
};