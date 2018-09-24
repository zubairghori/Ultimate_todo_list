var cacheName01 = 'persistence-todo-web-cache-03';
var files = [
    '/',
    './html/unCompletedTask.html',
    './html/completedTask.html',
    './js/indexedDB.js',
    './js/completeTask.js',
    './js/unCompleteTask.js',
    './js/materialJquery.js',
    './css/index.css'
];

// ===== Installing Service Worker =====
self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName01).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(files);
        })
    );
});

// ===== Activating the Service Worker =====

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName01) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
                return self.clients.claim();
            }));
        })
    );
});


// ===== Fetch EVENT__HANDLER =====

self.addEventListener('fetch', function (e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});
