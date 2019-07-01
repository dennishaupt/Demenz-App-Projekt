self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('demenz-store').then(function(cache) {
     return cache.addAll([
         '../logo192.png'
     ]);
     console.log("Service Worker works")
   })
 );
});

self.addEventListener('fetch', function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});