const CACHE_NAME = 'nicolas-portfolio-v4';
const urlsToCache = [
  '/favicon.svg'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Cache installation failed:', error);
        // Continue with installation even if caching fails
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip external domains (like Kaspersky)
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) {
    return;
  }

  // Don't cache HTML files to ensure fresh asset references
  if (event.request.url.endsWith('.html') || event.request.url.endsWith('/')) {
    event.respondWith(
      fetch(event.request)
        .catch((error) => {
          console.log('Fetch failed for:', event.request.url, error);
          return new Response('Network error', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          return response;
        }

        // Try to fetch from network with error handling
        return fetch(event.request)
          .catch((error) => {
            console.log('Fetch failed for:', event.request.url, error);
            // Return a basic response for failed requests
            return new Response('Network error', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      // Force clients to reload
      return self.clients.claim();
    })
  );
});
