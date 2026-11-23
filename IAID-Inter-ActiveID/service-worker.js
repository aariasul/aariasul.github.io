const CACHE_NAME = "inter-activeid-v3";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./IAID-share.html",
  "./manifest.json",
  "./css/script.js",
  "./css/scriptlanguage.js",
  "./Inter-ActiveID.vcf",
  "./Inter-ActiveID-logo.svg",
  "./Inter-ActiveID-icon-50x50.png",
  "./QR_code.svg",
  "./ink01.svg",
  "./pen02.svg"
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