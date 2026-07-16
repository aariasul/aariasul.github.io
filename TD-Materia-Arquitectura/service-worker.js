self.addEventListener("install", function () {
  console.log("Materia Arquitectura service worker installing.");
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  console.log("Materia Arquitectura service worker activating.");
  event.waitUntil(self.clients.claim());
});
