const CACHE = "leadscript-v3";
const ASSETS = [
  "/",
  "/static/css/app.css",
  "/static/js/app.js",
  "/static/manifest.json",
  "/static/icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((resp) => {
      const copy = resp.clone();
      caches.open(CACHE).then((c) => c.put(event.request, copy));
      return resp;
    }).catch(() => cached))
  );
});
