const CACHE_NAME = 'wizard-chat-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/main.bundle.js',
  '/static/css/main.bundle.css',
  '/wizWaiting.png',
  '/wizListening.png',
  '/wizThinking.png',
  '/wizSpeaking.png',
  '/wizDead.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
}); 