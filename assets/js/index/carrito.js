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
    
    // Preparar mensaje de WhatsApp
    const mensaje = `Hola, estoy interesado en los siguientes productos: ${productos.join(', ')}. El total es S/.${total.toFixed(2)}.`;
    const whatsappLink = document.getElementById('whatsappLink');
    if (whatsappLink) {
        // Interceptar click para mostrar formulario de datos antes de abrir WhatsApp
        whatsappLink.href = '#';
        whatsappLink.onclick = function(e) {
            e.preventDefault();
            if (carrito.length === 0) {
                alert('Tu carrito está vacío. Agrega productos antes de comprar.');
                return;
            }
            showCheckoutForm(mensaje, total);
        };
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

// --- Checkout modal + registro ---
function showCheckoutForm(mensaje, total) {
    // Crear overlay/modal
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.left = 0;
    overlay.style.top = 0;
    overlay.style.right = 0;
    overlay.style.bottom = 0;
    overlay.style.background = 'rgba(0,0,0,0.5)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 9999;

    const box = document.createElement('div');
    box.style.background = '#fff';
    box.style.padding = '20px';
    box.style.borderRadius = '8px';
    box.style.width = '320px';
    box.innerHTML = `
        <h3 style="margin-top:0">Completa tus datos</h3>
        <form id="checkoutForm">
          <div style="margin-bottom:8px"><label>Nombre<br><input name="name" required style="width:100%"></label></div>
          <div style="margin-bottom:8px"><label>Celular (ej: 9XXXXXXXX)<br><input name="phone" required pattern="[0-9]+" style="width:100%"></label></div>
          <div style="margin-bottom:8px"><label>Dirección (opcional)<br><input name="address" style="width:100%"></label></div>
          <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px">
            <button type="button" id="cancelCheckout" style="padding:8px 12px">Cancelar</button>
            <button type="submit" style="padding:8px 12px;background:#25D366;color:#fff;border:none;border-radius:4px">Enviar por WhatsApp</button>
          </div>
        </form>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    const form = box.querySelector('#checkoutForm');
    box.querySelector('#cancelCheckout').addEventListener('click', () => {
        document.body.removeChild(overlay);
    });

    form.addEventListener('submit', function(evt) {
        evt.preventDefault();
        const formData = new FormData(form);
        const name = formData.get('name') || '';
        let phone = formData.get('phone') || '';
        const address = formData.get('address') || '';

        // Normalizar teléfono (añadir código país si falta, asumimos Perú +51 si inicia con 9)
        phone = phone.replace(/[^0-9]/g, '');
        if (phone.length === 9) phone = '51' + phone;
        if (phone.length === 11 && phone.startsWith('51')) {
            // ok
        }

        // Guardar registro en localStorage para el admin dashboard
        try {
            const regs = JSON.parse(localStorage.getItem('registrations') || '[]');
            const registro = {
                name,
                phone,
                address,
                cart: carrito.map(i => ({ nombre: i.nombre, cantidad: i.cantidad, precio: i.precio })),
                total: Number(total),
                createdAt: new Date().toISOString()
            };
            regs.push(registro);
            localStorage.setItem('registrations', JSON.stringify(regs));
        } catch (e) {
            console.error('Error al guardar registro', e);
        }

        // Construir mensaje final para WhatsApp incluyendo datos del cliente
        const clientInfo = `\n\nDatos del cliente:\nNombre: ${name}\nCelular: ${phone}${address ? `\nDirección: ${address}` : ''}`;
        const finalMessage = mensaje + clientInfo;
        const waNumber = '51994379232';
        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(finalMessage)}`;

        // Abrir WhatsApp en nueva pestaña y cerrar modal
        window.open(waUrl, '_blank');
        document.body.removeChild(overlay);
    });
}