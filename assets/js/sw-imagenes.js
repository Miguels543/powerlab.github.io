// sw-images.js - Service Worker para cachear imágenes de productos
// NOTA: Este archivo debe estar en /assets/js/

// Nombre del caché
const CACHE_NAME = 'powerlab-images-cache-v1';

// Lista de dominios de imágenes que queremos cachear
const VALID_IMAGE_DOMAINS = [
  'res.cloudinary.com',
  'th.bing.com',
  'resources.claroshop.com',
  'www.palabraderunner.com',
  'guiaguatemalteca.com',
  'i5.walmartimages.com',
  'www.redbull.com',
  'm.media-amazon.com',
  'www.qntsport.com',
  'cdn.shopify.com'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker para imágenes instalándose');
  self.skipWaiting(); // Activar inmediatamente
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker para imágenes activado');
  
  // Limpiar cachés antiguos
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      return self.clients.claim(); // Tomar control de los clientes inmediatamente
    })
  );
});

// Verificar si la URL es una imagen que deberíamos cachear
function shouldCacheImage(url) {
  try {
    const urlObj = new URL(url);
    // Verificar si el dominio está en nuestra lista de dominios válidos
    return VALID_IMAGE_DOMAINS.some(domain => urlObj.hostname.includes(domain)) &&
           // Verificar si la extensión parece ser de imagen
           /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(urlObj.pathname);
  } catch (e) {
    return false;
  }
}

// Cachear una lista de URLs de imágenes
async function cacheImages(imageUrls) {
  const cache = await caches.open(CACHE_NAME);
  
  const cachePromises = imageUrls.map(async url => {
    try {
      // Verificar si ya está en caché
      const match = await cache.match(url);
      if (match) {
        return; // Ya está en caché
      }
      
      // Obtener la imagen y almacenarla en caché
      const response = await fetch(url, { mode: 'no-cors' });
      if (response) {
        await cache.put(url, response);
        console.log(`Imagen cacheada: ${url}`);
      }
    } catch (error) {
      console.error(`Error al cachear imagen ${url}:`, error);
    }
  });
  
  return Promise.all(cachePromises);
}

// Escuchar mensajes del script principal
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CACHE_IMAGES') {
    console.log('Recibida solicitud para cachear imágenes:', event.data.imageUrls.length);
    cacheImages(event.data.imageUrls);
  }
});

// Interceptar solicitudes de red para imágenes
self.addEventListener('fetch', event => {
  const request = event.request;
  
  // Solo interceptar solicitudes GET y que sean de imágenes
  if (request.method !== 'GET' || !shouldCacheImage(request.url)) {
    return;
  }
  
  // Estrategia: Cache First, luego Red (si falla, usar caché)
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(request).then(cachedResponse => {
        // Si está en caché y estamos offline, devolver respuesta cacheada
        if (cachedResponse && !navigator.onLine) {
          return cachedResponse;
        }
        
        // Intentar obtener de la red
        return fetch(request)
          .then(networkResponse => {
            // Guardar una copia en caché
            cache.put(request, networkResponse.clone());
            return networkResponse;
          })
          .catch(error => {
            // Si falla la red, intentar devolver desde caché
            return cachedResponse || Promise.reject('No se pudo obtener la imagen');
          });
      });
    })
  );
});