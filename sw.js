// ⚠️ App-কে স্থির রাখতে: নতুন deploy app-এ আসবে না।
// নতুন version চাইলে নিচের CACHE_NAME এর version বাড়াও (v3, v4...) ও app reinstall করো।
const CACHE_NAME = 'insaf-travels-v6';
const FILES_TO_CACHE = [
  './index.html',
  './manifest.json'
];

// Install — cache files once
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  // skipWaiting নেই — নতুন SW সাথে সাথে activate হবে না
});

// Activate — শুধু পুরনো version cache মুছবে
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  // clients.claim() নেই — চালু app পুরনো version-এই থাকবে
});

// Fetch — সবসময় cache থেকে (CACHE-FIRST)। network থেকে index.html আপডেট করবে না।
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
