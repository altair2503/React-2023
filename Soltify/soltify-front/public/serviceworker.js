const CACHE_NAME = "version-1";
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("Opened cache");
                return cache.addAll(urlsToCache);
            })
    );
});

// Listen for request
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // If request is found in cache, return cached response
                if (cachedResponse) {
                    return cachedResponse;
                }

                // If request is not found in cache, fetch from network
                return fetch(event.request)
                    .then((response) => {
                        // Check if the requested resource is an audio file
                        
                        if (event.request.url.includes('.mp3') || event.request.url.includes('.ogg')) {
                            // Clone the response to cache and return the original response
                            const responseToCache = response.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });
                        }
                        return response;
                    })
                    .catch(() => caches.match('offline.html')); // If fetching fails, return offline page
            })
    );
});

// Activate SW
self.addEventListener('activate', (event) => {
    const cacheWhiteList = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhiteList.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    );
});
