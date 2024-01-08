importScripts('/assets/js/workbox-sw.js');

var CACHE_NAME = '2.1.326-';

var client;
var origins = ['https://doctor.cureskin.com', 'https://staging-doctor.cureskin.com', 'https://test-doctor.cureskin.com', 'http://localhost:3002'];

workbox.core.setCacheNameDetails({
  prefix: CACHE_NAME,
});

for (var i = 0; i < origins.length; i++) {

  workbox.routing.registerRoute(
    new RegExp(origins[i]+'/assets/.*'),
    new workbox.strategies.CacheFirst()
  );
  workbox.routing.registerRoute(
    new RegExp(origins[i]+'/.*/assets/.*'),
    new workbox.strategies.CacheFirst()
  );
  workbox.routing.registerRoute(
    new RegExp(origins[i]+'/.*[.]js'),
    new workbox.strategies.CacheFirst()
  );
  workbox.routing.registerRoute(
      new RegExp(origins[i]),
      new workbox.strategies.CacheFirst()
  );

}

async function clearOldCache(currentCacheVersion, event) {
  return self.clients.matchAll()
  .then((clientsArr) => {
    return caches.keys()
      .then((cacheNames) => Promise.all(cacheNames.map((cacheName) => {
        if (cacheName.indexOf(currentCacheVersion) === -1) {
          clientsArr.forEach((each) => each.postMessage('update found'))
          return caches.delete(cacheName);
        }
        return Promise.resolve();
    })));
  });
}

self.addEventListener('install', (event) => {
  'use strict';

  self.skipWaiting();
});

self.addEventListener('activate', async (event) => {
  'use strict';
  event.waitUntil(clearOldCache(CACHE_NAME, event));
});
