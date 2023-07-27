// service-worker.js

// Menyimpan file statis dalam cache saat Service Worker diinstal
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/WebPerformance.html',
        '/src/gambar.jpg'
        // Tambahkan file lain yang ingin Anda cache di sini
      ]);
    })
  );
});

// Menggunakan cache saat mengambil permintaan
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
