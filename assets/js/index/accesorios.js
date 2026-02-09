// Definición de accesorios
const accesorios = [
    {
        id: 1,
        name: "Shaker Premium",
        category: "ACCESORIOS",
        price: 25.00,
        image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Guantes de Entrenamiento",
        category: "ACCESORIOS",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Cinturón de Levantamiento",
        category: "ACCESORIOS",
        price: 85.00,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Set de Bandas Elásticas",
        category: "ACCESORIOS",
        price: 60.00,
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Bolso Deportivo",
        category: "ACCESORIOS",
        price: 120.00,
        image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=1969&auto=format&fit=crop"
    }
];

/**
 * Muestra los accesorios en el contenedor correspondiente
 */
function displayAccesorios() {
    console.log("Inicializando displayAccesorios...");
    
    const container = document.getElementById('accesorios-container');
    if (!container) {
        console.error("Contenedor 'accesorios-container' no encontrado");
        return;
    }

    console.log(`Se encontraron ${accesorios.length} accesorios para mostrar`);
    
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Agregar cada accesorio
    accesorios.forEach(accesorio => {
        const accesorioCard = document.createElement("div");
        accesorioCard.className = "product-card";
        accesorioCard.innerHTML = `
            <div class="product-image">
                <img src="${accesorio.image}" alt="${accesorio.name}">
            </div>
            <div class="product-content">
                <h3>${accesorio.name}</h3>
                <p class="product-category">${accesorio.category}</p>
                <div class="product-price">S/.${accesorio.price.toFixed(2)}</div>
                <button class="btn btn-primary" onclick="agregarAlCarrito('${accesorio.name}', ${accesorio.price}, '${accesorio.image}')">Comprar</button>
            </div>
        `;
        
        container.appendChild(accesorioCard);
    });
    
    console.log("Accesorios renderizados correctamente");
}

// Exportar accesorios y función para mostrarlos
export { accesorios, displayAccesorios };