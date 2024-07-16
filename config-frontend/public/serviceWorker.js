const CACHE_NAME = 'version-1'
const urlsToCache = ['index.html', 'offline.html']

this.addEventListener('install', (event) => {
    event.waitUnitl(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened Cache")
        })
    )
})