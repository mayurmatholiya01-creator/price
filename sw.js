const CACHE_NAME = 'granicer-pl-v1';
// List of all files your app needs to run offline
const assetsToCache = [
  '.', // This caches the index.html file
  'index.html',
  'imagedata.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'
];

// Install event: Cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache. Caching all assets...');
        return cache.addAll(assetsToCache);
      })
  );
});

// Fetch event: Serve from cache first (Cache-First Strategy)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response from cache
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request);
      }
    )
  );
});
