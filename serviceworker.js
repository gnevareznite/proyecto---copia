const staticProyFinal = "static-proyectoFinal";
const siteCache = [
    "/",
    "/index.html",
    "/assets/bootstrap4/css/bootstrap.min.css",
    "/assets/css/styles.css",
    "/assets/jquery/jquery-3.2.1.slim.min.js",
    "/assets/bootstrap4/js/bootstrap.min.js",
    "/assets/js/app.js",
    "/assets/fontawesome5/js/solid.min.js",
    "/assets/fontawesome5/js/fontawesome.min.js"
];

self.addEventListener("install", installEvt => {
    console.log('Instalando ServiceWorker...');
    installEvt.waitUntil(
        caches.open(staticProyFinal).then(cache => {
            cache.addAll(siteCache)
        })
    );
});


self.addEventListener("fetch", fetchEvt => {
    fetchEvt.respondWith(
        caches.match(fetchEvt.request).then( res => {
            return res || fetch(fetchEvt.request);
        })
    );
});
