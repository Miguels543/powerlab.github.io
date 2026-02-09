// Definición de productos (valores por defecto)
const defaultProducts = [
  {
    id: 1,
    name: "Carnivor",
    category: "PROTEINAS",
    price: 350.00,
    weight: "2kg",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252570/AnyConv.com__4_hfrzzf.webp",
    description: "Proteína de carne de alta calidad. Ideal para el desarrollo muscular y la recuperación después del entrenamiento.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252570/AnyConv.com__4_hfrzzf.webp",
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1745718852/Tabla_vyhez9.jpg"
    ],
    features: [
      "Alta concentración proteica",
      "Hecha a base de carne de res",
      "Ideal para recuperación muscular",
      "Baja en carbohidratos",
      "Disponible en varios sabores"
    ]
  },
  {
    id: 2,
    name: "Iso Cool",
    category: "PROTEINAS",
    price: 430.00,
    weight: "2.3kg",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252572/AnyConv.com__18_qtcinx.webp",
    description: "Proteína aislada de suero de alta calidad con tecnología de enfriamiento para una mejor preservación de aminoácidos.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252572/AnyConv.com__18_qtcinx.webp"
    ],
    features: [
      "Aislado de suero premium",
      "Proceso de enfriamiento único",
      "Máxima biodisponibilidad",
      "Bajo en lactosa",
      "Rápida absorción"
    ]
  },
  {
    id: 3,
    name: "Whey Pro",
    category: "PROTEINAS",
    price: 110.00,
    weight: "1.1kg",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252570/AnyConv.com__14_qoqvsf.webp",
    description: "Proteína de suero económica para deportistas que buscan un suplemento de calidad a buen precio.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252570/AnyConv.com__14_qoqvsf.webp",
    ],
    features: [
      "Buena relación calidad-precio",
      "Ideal para principiantes",
      "Contiene aminoácidos esenciales",
      "Sabor agradable",
      "Fácil disolución"
    ]
  },
  {
    id: 4,
    name: "Iso XP",
    category: "PROTEINAS",
    price: 430.00,
    weight: "1.8kg",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252575/AnyConv.com__31_rwzoto.webp",
    description: "Aislado proteico de máxima pureza con fórmula mejorada XP para una absorción óptima y recuperación muscular acelerada.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252575/AnyConv.com__31_rwzoto.webp"
    ],
    features: [
      "Más de 90% de proteína pura",
      "Fórmula avanzada XP",
      "Ultra filtrado",
      "Sin grasas ni azúcares añadidos",
      "Máxima asimilación"
    ]
  },
  {
    id: 5,
    name: "Serious Mass",
    category: "GANADORES DE PESO",
    price: 260.00,
    weight: "2.7kg",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252575/AnyConv.com__2_z1kljg.webp",
    description: "Ganador de peso de alta calidad con alto contenido calórico y nutrientes esenciales para aumentar masa muscular.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252575/AnyConv.com__2_z1kljg.webp"
    ],
    features: [
      "1250 calorías por porción",
      "50g de proteína por servicio",
      "Complejo de carbohidratos",
      "Con creatina, glutamina y otros extras",
      "Para ectomorfos y hardgainers"
    ]
  },
  {
    id: 6,
    name: "Hydro Whey",
    category: "PROTEINAS",
    price: 360.00,
    weight: "1.5kg",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742262933/productos-para-la-web-_1__1_efbegv.webp",
    description: "Proteína de suero hidrolizada para una absorción ultrarrápida y recuperación muscular inmediata.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742262933/productos-para-la-web-_1__1_efbegv.webp",
    ],
    features: [
      "Proteína pre-digerida",
      "Absorción instantánea",
      "Ideal post-entreno",
      "Menor probabilidad de intolerancia",
      "Para deportistas exigentes"
    ]
  },
  {
    id: 7,
    name: "100% Isolate",
    category: "PROTEINAS",
    price: 460.00,
    weight: "2.8kg",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742256618/productos-para-la-web-_1__xygo18.webp",
    description: "Proteína aislada de suero 100% pura, con más de 90% de contenido proteico y prácticamente libre de grasas y carbohidratos.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742256618/productos-para-la-web-_1__xygo18.webp"
    ],
    features: [
      "Más de 90% de proteína pura",
      "Virtualmente libre de grasas",
      "Sin lactosa",
      "Para fases de definición",
      "Máxima pureza garantizada"
    ]
  },
  {
    id: 8,
    name: "Nitro Tech",
    category: "PROTEINAS",
    price: 340.00,
    weight: "2.27kg",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252573/AnyConv.com__21_dmwlyc.webp",
    description: "Fórmula avanzada de proteína con tecnología Nitro que incrementa la retención de nitrógeno para un mayor crecimiento muscular.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252573/AnyConv.com__21_dmwlyc.webp"
    ],
    features: [
      "Con creatina añadida",
      "Balance óptimo de aminoácidos",
      "Tecnología de retención de nitrógeno",
      "Para máximo crecimiento muscular",
      "Proteína de liberación prolongada"
    ]
  },
  {
    id: 9,
    name: "Iso 100",
    category: "PROTEINAS",
    price: 520.00,
    weight: "2.3kg",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252575/AnyConv.com__32_unskav.webp",
    description: "La proteína aislada más pura del mercado, con 100% de proteína hidrolizada y filtrada por microfiltración cruzada.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252575/AnyConv.com__32_unskav.webp"
    ],
    features: [
      "25g de proteína por porción",
      "0g de grasas y carbohidratos",
      "Sin lactosa ni gluten",
      "Proceso de microfiltración avanzado",
      "La preferida por culturistas profesionales"
    ]
  },
  {
    id: 10,
    name: "100% Whey",
    category: "PROTEINAS",
    price: 400.00,
    weight: "2.27kg",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252571/AnyConv.com__17_qqmr9x.webp",
    description: "Proteína de suero completa con mezcla de concentrado, aislado e hidrolizado para un perfil de absorción escalonado.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252571/AnyConv.com__17_qqmr9x.webp"
    ],
    features: [
      "Fórmula triplewhey (concentrado, aislado, hidrolizado)",
      "24g de proteína por servicio",
      "Completo perfil de aminoácidos",
      "Absorción escalonada",
      "Excelente sabor y disolución"
    ]
  },
  {
    id: 11,
    name: "Iso Surge",
    category: "PROTEINAS",
    price: 370.00,
    weight: "2.27kg",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252575/AnyConv.com__33_ex8yp0.webp",
    description: "Proteína aislada con tecnología Surge para una absorción inmediata en el músculo y recuperación acelerada.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252575/AnyConv.com__33_ex8yp0.webp"
    ],
    features: [
      "Tecnología Surge de absorción",
      "27g de proteína por servicio",
      "Con péptidos de absorción",
      "Menos de 1g de grasa",
      "Sin azúcares añadidos"
    ]
  },
  {
    id: 12,
    name: "Bigger 60",
    category: "GANADORES DE PESO",
    price: 130.00,
    weight: "2kg",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252573/AnyConv.com__22_rdg146.webp",
    description: "Ganador de peso con 60g de proteína por porción y complejo de carbohidratos para un aumento de peso rápido y efectivo.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252573/AnyConv.com__22_rdg146.webp"
    ],
    features: [
      "60g de proteína por porción",
      "Alta densidad calórica",
      "Carbohidratos complejos",
      "Con creatina y glutamina",
      "Ideal para hardgainers"
    ]
  },
  {
    id: 13,
    name: "Mutant Whey",
    category: "PROTEINAS",
    price: 300.00,
    weight: "2kg",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252573/AnyConv.com__24_eznx5s.webp",
    description: "Proteína multicomponente con 5 fuentes proteicas diferentes para un perfil de aminoácidos único y completo.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252573/AnyConv.com__24_eznx5s.webp"
    ],
    features: [
      "5 fuentes proteicas diferentes",
      "26g de proteína por servicio",
      "Para culturistas extremos",
      "Formula mutante optimizada",
      "Máxima densidad nutricional"
    ]
  },
  {
    id: 14,
    name: "Preentreno Psychotic",
    category: "PRE-ENTRENOS",
    price: 190.00,
    weight: "214g",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742258002/productos-para-la-web_gqkpgl.webp",
    description: "Pre-entreno de alta potencia con una fórmula avanzada de estimulantes y potenciadores de óxido nítrico. Proporciona energía extrema, concentración y bombeo muscular.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742258002/productos-para-la-web_gqkpgl.webp",
      ],
    features: [
      "Alta concentración de cafeína y estimulantes",
      "Contiene beta-alanina para resistencia muscular",
      "Mejora el enfoque mental",
      "Fórmula de liberación prolongada"
    ]
  },
  {
    id: 15,
    name: "Dragon Pharma",
    category: "PRE-ENTRENOS",
    price: 130.00,
    weight: "300g",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252571/AnyConv.com__6_blfa7p.webp",
    description: "Pre-entreno potente de grado farmacéutico con estimulantes avanzados y potenciadores de rendimiento para entrenamientos intensos.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252571/AnyConv.com__6_blfa7p.webp"
    ],
    features: [
      "Formula farmacéutica avanzada",
      "Potenciadores neurológicos",
      "Máxima concentración y energía",
      "Con L-citrulina y arginina",
      "Con estimulantes exóticos"
    ]
  },
  {
    id: 16,
    name: "Black Viper",
    category: "QUEMADORES DE GRASA",
    price: 200.00,
    weight: "90 cápsulas",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742263694/productos-para-la-web-_4__seax5b.webp",
    description: "Potente quemador de grasa termogénico con estimulantes y compuestos lipotrópicos para maximizar la pérdida de grasa.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742263694/productos-para-la-web-_4__seax5b.webp"
    ],
    features: [
      "Efecto termogénico potente",
      "Supresión del apetito",
      "Energía sostenida",
      "Maximiza la oxidación de grasas",
      "Con extractos naturales quemadores"
    ]
  },
  {
    id: 17,
    name: "Nutrabio Cafeine",
    category: "ENERGIZANTES",
    price: 240.00,
    weight: "250 cápsulas",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742263385/productos-para-la-web-_2__zh7h1y.webp",
    description: "Cafeína de grado farmacéutico de liberación controlada para proporcionar energía sostenida durante horas sin picos ni caídas.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742263385/productos-para-la-web-_2__zh7h1y.webp"
    ],
    features: [
      "200mg de cafeína por cápsula",
      "Liberación controlada",
      "Energía sostenida sin crash",
      "Mejora el enfoque y concentración",
      "Pureza farmacéutica garantizada"
    ]
  },
  {
    id: 18,
    name: "Omega-3",
    category: "SALUD",
    price: 150.00,
    weight: "150 cápsulas",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742263500/productos-para-la-web-_3__ubcwv2.webp",
    description: "Aceite de pescado purificado rico en ácidos grasos omega-3 EPA y DHA para salud cardiovascular, articular y cerebral.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742263500/productos-para-la-web-_3__ubcwv2.webp"
    ],
    features: [
      "Alta concentración de EPA y DHA",
      "Reduce la inflamación muscular",
      "Mejora la salud cardiovascular",
      "Protege las articulaciones",
      "Purificado y libre de metales pesados"
    ]
  },
  {
    id: 19,
    name: "Shaker",
    category: "ACCESORIOS",
    price: 20.00,
    weight: "200ml",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252574/AnyConv.com__28_iqv57n.webp",
    description: "Shaker resistente con rejilla anti-grumos para mezclar proteínas y suplementos de forma perfecta y sin grumos.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252574/AnyConv.com__28_iqv57n.webp",
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252574/AnyConv.com__27_pljnww.webp",
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252573/AnyConv.com__25_ey7jvz.webp",
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252574/AnyConv.com__26_jdd6v6.webp"
    ],
    features: [
      "Material resistente a impactos",
      "Con rejilla anti-grumos",
      "Cierre hermético",
      "Fácil de limpiar",
      "Marcas de medición incorporadas"
    ]
  },
  {
    id: 20,
    name: "Hydroxy",
    category: "QUEMADORES DE GRASA",
    price: 200.00,
    weight: "90 cápsulas",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742263822/productos-para-la-web-_5__gnjb44.webp",
    description: "Quemador de grasa avanzado a base de hidroxicitrato y otros componentes naturales que potencian la pérdida de grasa.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742263822/productos-para-la-web-_5__gnjb44.webp"
    ],
    features: [
      "Con extracto de Garcinia Cambogia",
      "Bloquea la formación de grasa",
      "Reduce el apetito",
      "Incrementa el metabolismo",
      "Sin estimulantes fuertes"
    ]
  },
  {
    id: 21,
    name: "Clembuterol",
    category: "QUEMADORES DE GRASA",
    price: 180.00,
    weight: "50 comprimidos",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252572/AnyConv.com__19_vkj1re.webp",
    description: "Potente quemador de grasa con efecto termogénico y preservador de masa muscular durante fases de definición extrema.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252572/AnyConv.com__19_vkj1re.webp"
    ],
    features: [
      "Potente efecto termogénico",
      "Preserva la masa muscular",
      "Aumenta el metabolismo basal",
      "Mejora el rendimiento cardiorrespiratorio",
      "Ideal para fases de definición"
    ]
  },
  {
    id: 22,
    name: "Collagen Pro",
    category: "SALUD",
    price: 120.00,
    weight: "500g",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252572/AnyConv.com__13_izbu5q.webp",
    description: "Colágeno hidrolizado de alta biodisponibilidad para la salud articular, de la piel, cabello y uñas. Esencial para deportistas con alta exigencia en articulaciones.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252572/AnyConv.com__13_izbu5q.webp"
    ],
    features: [
      "Colágeno tipo I, II y III",
      "Alta absorción y biodisponibilidad",
      "Con vitamina C para mejor síntesis",
      "Sabor neutro, fácil de mezclar",
      "Ideal para deportistas y personas mayores"
    ]
  },
  {
    id: 23,
    name: "X-B Collagen Fit",
    category: "SALUD",
    price: 50.00,
    weight: "15 unidades",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252570/AnyConv.com__15_zzlfrh.webp",
    description: "Suplemento de colágeno en formato bebible con vitamina C, ácido hialurónico y biotina para belleza y salud articular.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252570/AnyConv.com__15_zzlfrh.webp",
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252571/AnyConv.com__16_ylke10.webp"
    ],
    features: [
      "Formato bebible listo para consumir",
      "Con ácido hialurónico y biotina",
      "Mejora la elasticidad de la piel",
      "Fortalece articulaciones",
      "Sabor agradable a frutos rojos"
    ]
  },
  {
    id: 24,
    name: "Psychotic",
    category: "PRE-ENTRENOS",
    price: 9.00,
    weight: "6g",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252574/AnyConv.com__29_ifbkjn.webp",
    description: "Dosis única de pre-entreno Psychotic de alta potencia, ideal para probar o para llevar al gimnasio sin cargar todo el bote.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252574/AnyConv.com__29_ifbkjn.webp"
    ],
    features: [
      "Dosis única en sobre monodosis",
      "Misma potencia que el formato grande",
      "Fácil de transportar",
      "Ideal para probar antes de comprar",
      "Perfecta para llevar al gimnasio"
    ]
  },
  {
    id: 25,
    name: "Creatina Micronizada",
    category: "CREATINAS",
    price: 270.00,
    weight: "600g",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252572/AnyConv.com__20_j5gmzb.webp",
    description: "Creatina monohidratada de la más alta pureza y micronizada para una mejor disolución y absorción intestinal.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252572/AnyConv.com__20_j5gmzb.webp"
    ],
    features: [
      "100% monohidrato de creatina pura",
      "Micronizada para mejor disolución",
      "Aumenta fuerza y rendimiento",
      "Sin sabor, mezcla perfecta",
      "600g para varios meses de uso"
    ]
  },
  {
    id: 26,
    name: "Impact Creatina",
    category: "CREATINAS",
    price: 95.00,
    weight: "250g",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252573/AnyConv.com__23_tzk4jl.webp",
    description: "Creatina monohidratada pura de marca Impact, con 5g de creatina por servicio para mejorar la fuerza y el rendimiento en ejercicios intensos.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252573/AnyConv.com__23_tzk4jl.webp"
    ],
    features: [
      "5g de creatina pura por servicio",
      "Calidad farmacéutica garantizada",
      "Aumento de fuerza y potencia",
      "Mejora la recuperación entre series",
      "Formato económico de 250g"
    ]
  },
  {
    id: 27,
    name: "Pro BCAA",
    category: "AMINOACIDOS",
    price: 120.00,
    weight: "500g",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252572/AnyConv.com__12_qstkxx.webp",
    description: "Suplemento de aminoácidos de cadena ramificada (BCAA) en proporción 2:1:1, para mejorar la recuperación muscular y prevenir el catabolismo.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252572/AnyConv.com__12_qstkxx.webp"
    ],
    features: [
      "Proporción 2:1:1 (Leucina, Isoleucina, Valina)",
      "Previene degradación muscular",
      "Mejora recuperación",
      "Con electrolitos añadidos",
      "Sabor refrescante a frutos rojos"
    ]
  },
  {
    id: 28,
    name: "Beta-Alanine GAT Sport",
    category: "AMINOACIDOS",
    price: 145.00,
    weight: "200g",
    image: "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252570/AnyConv.com__7_bbwaa9.webp",
    description: "Beta-Alanina pura de GAT Sport, un bloque de construcción esencial de carnosina que proporciona resistencia muscular y mejora el rendimiento durante el entrenamiento intenso.",
    additionalImages: [
      "https://res.cloudinary.com/dnw35uxqn/image/upload/v1742252570/AnyConv.com__7_bbwaa9.webp"
    ],
    features: [
      "2g de beta-alanina por servicio",
      "100 porciones por envase",
      "Aumenta los niveles de carnosina muscular",
      "Mejora la resistencia y retrasa la fatiga",
      "Sin sabor, fácil de mezclar con otros suplementos"
    ]
  }
];

// Inicializar `products` a partir de localStorage si está disponible,
// y asegurar que cada producto tenga la propiedad `stock`.
let products = defaultProducts.map(p => ({ ...p, stock: p.stock ?? 10 }));

try {
  if (typeof window !== 'undefined' && window.localStorage) {
    const stored = localStorage.getItem('products');
    if (stored) {
      products = JSON.parse(stored);
    } else {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }
} catch (e) {
  console.error('Error accessing localStorage for products', e);
}

export default products;

