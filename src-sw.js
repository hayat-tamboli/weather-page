importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js"
);
//custom adjustments
workbox.routing.registerRoute(
  new RegExp("https://favqs.com/api/qotd"),
  workbox.strategies.cacheFirst()
);
workbox.routing.registerRoute(
  new RegExp(
    "https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=India"
  ),
  workbox.strategies.cacheFirst()
);

self.__WB_MANIFEST;
workbox.precaching.precacheAndRoute([]);
