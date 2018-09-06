importScripts("/matchit/precache-manifest.064ccbac6d192673bd156890349a00c9.js", "/matchit/workbox-v3.4.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/matchit/workbox-v3.4.1"});
// See https://developers.google.com/web/tools/workbox/guides/configure-workbox
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

// We need this in Webpack plugin (refer to swSrc option): https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_injectmanifest_config
workbox.precaching.precacheAndRoute(self.__precacheManifest);

// app-shell
workbox.routing.registerRoute("/", workbox.strategies.cacheFirst());
