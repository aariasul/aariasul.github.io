const CACHE_NAME = "grupo-tsunami-iaid-v2";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./IAID-share.html",
  "./manifest.json",
  "./Juan_Ignacio_Castro.vcf",
  "./Grupo-Tsunami-icon-50x50.png",
  "./Grupo-Tsunami-logo.svg",
  "./images/Fogo-Rodizio-logo.svg",
  "./images/Graffiti-Wine-Bistro-logo.svg",
  "./images/Ponte-Vecchio-logo.svg",
  "./images/The-Surfer-House-logo.svg",
  "./images/Tsunami-Sushi-logo.svg",
  "./images/Trium-Restaurant-logo.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(CORE_ASSETS.map((url) => cache.add(url)))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200 && response.type === "basic") {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
