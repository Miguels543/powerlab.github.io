// Definición de packs y combos
const packs = [
    {
        id: 1,
        name: "Pack Definición",
        category: "PACKS",
        price: 272.00,
        originalPrice: 320.00,
        image: "https://raw.githubusercontent.com/Miguels543/powerlab.github.io/refs/heads/main/assets/img/pack/packdefinition.png",
        items: ["Proteína Isolate", "Quemador de Grasa", "BCAA"],
        discount: "AHORRA 15%"
    },
    {
        id: 2,
        name: "Pack Volumen",
        category: "PACKS",
        price: 304.00,
        originalPrice: 380.00,
        image: "https://raw.githubusercontent.com/Miguels543/powerlab.github.io/refs/heads/main/assets/img/pack/packvolumen.png",
        items: ["Proteína Whey", "Creatina Monohidratada", "Ganador de Masa"],
        discount: "AHORRA 20%"
    },
    {
        id: 3,
        name: "Pack Rendimiento",
        category: "PACKS",
        price: 278.80,
        originalPrice: 340.00,
        image: "https://raw.githubusercontent.com/Miguels543/powerlab.github.io/refs/heads/main/assets/img/pack/packperformance.png",
        items: ["Pre-Entreno", "BCAA", "Proteína de Recuperación"],
        discount: "AHORRA 18%"
    }
];

// Definición de promociones especiales
const promociones = [
    {
        id: 1,
        name: "Iso XP Chopina",
        category: "PROTEÍNAS",
        originalPrice: 540.00,
        price: 410.00,
        image: "assets/img/product/promotion.png",
        description: "Iso xp Chopina + Creatina + Shaker + energizantes/preentreno. Paquete completo para maximizar rendimiento y recuperación muscular.",
        discount: "24% OFF"
    },
    {
        id: 2,
        name: "Creatina Dragon Pharma",
        category: "SUPLEMENTOS",
        price: 99.40,
        originalPrice: 140,
        image: "assets/img/product/promotion(2).png",
        description: "Dragon pharma + shaker + preentreno/energizantes. Creatina premium para aumentar fuerza y masa muscular con extras para impulsar entrenamientos.",
        discount: "NUEVO"
    },
    {
        id: 3,
        name: "Proteína Prostar",
        category: "PROTEÍNAS",
        price: 350.00,
        originalPrice: 485.00,
        image: "assets/img/product/promotion(3).png",
        description: "Prostar + Creatina + shaker + energizantes/preentreno. Batidos proteicos para nutrición deportiva instantánea con suplementos para mejorar rendimiento.",
        discount: "28 OFF"
    }
];


/**
 * Muestra los packs en el contenedor correspondiente
 */
function displayPacks() {
    console.log("Inicializando displayPacks...");
    
    const container = document.getElementById('packs-container');
    if (!container) {
        console.error("Contenedor 'packs-container' no encontrado");
        return;
    }

    console.log(`Se encontraron ${packs.length} packs para mostrar`);
    
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Agregar cada pack
    packs.forEach(pack => {
        // Crear la lista de items
        const itemsList = pack.items.map(item => `<li>${item}</li>`).join('');
        
        const packCard = document.createElement("div");
        packCard.className = "product-card";
        packCard.innerHTML = `
            <div class="product-image">
                <img src="${pack.image}" alt="${pack.name}">
                <div class="pack-badge">${pack.discount}</div>
            </div>
            <div class="product-content">
                <h3>${pack.name}</h3>
                <p class="product-category">${pack.category}</p>
                <ul class="pack-items">
                    ${itemsList}
                </ul>
                <div class="product-price">
                    <span class="original-price">S/.${pack.originalPrice.toFixed(2)}</span>
                    <span class="discount-price">S/.${pack.price.toFixed(2)}</span>
                </div>
                <button class="btn btn-primary full-width" onclick="agregarAlCarrito('${pack.name}', ${pack.price}, '${pack.image}')">Agregar al carrito</button>
            </div>
        `;
        
        container.appendChild(packCard);
    });
    
    console.log("Packs renderizados correctamente");
}

/**
 * Muestra las promociones en el contenedor correspondiente
 */
function displayPromociones() {
    console.log("Inicializando displayPromociones...");
    
    const container = document.getElementById('promociones-container');
    if (!container) {
        console.error("Contenedor 'promociones-container' no encontrado");
        return;
    }

    console.log(`Se encontraron ${promociones.length} promociones para mostrar`);
    
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Agregar cada promoción
    promociones.forEach(promocion => {
        const promocionCard = document.createElement("div");
        promocionCard.className = "product-card";
        promocionCard.innerHTML = `
            <div class="product-image">
                <img src="${promocion.image}" alt="${promocion.name}">
                <div class="promotion-tag">${promocion.discount}</div>
            </div>
            <div class="product-content">
                <h3>${promocion.name}</h3>
                <p class="product-category">${promocion.category}</p>
                <p>${promocion.description}</p>
                <div class="product-price">
                    ${promocion.originalPrice !== promocion.price ? 
                    `<span class="original-price">S/.${promocion.originalPrice.toFixed(2)}</span>` : ''}
                    <span class="discount-price">S/.${promocion.price.toFixed(2)}</span>
                </div>
                <button class="btn btn-primary" onclick="agregarAlCarrito('${promocion.name}', ${promocion.price}, '${promocion.image}')">Agregar al carrito</button>
            </div>
        `;
        
        container.appendChild(promocionCard);
    });
    
    console.log("Promociones renderizadas correctamente");
}

// Exportar packs, promociones y funciones para mostrarlos
export { packs, promociones, displayPacks, displayPromociones };
