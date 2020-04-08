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

workbox.precaching.precacheAndRoute([
  { revision: "1de571ae660b6ebe9e59819dbbbac3c9", url: "assets/favicon.png" },
  {
    revision: "2fb4cde4dc28145acbceaa20ca1347aa",
    url: "assets/india_flag.png",
  },
  { revision: "e919cd48460fe087511c5d53f8f8f253", url: "assets/info.png" },
  { revision: "acb21fe4178a7b8e5242d568b3a255f7", url: "assets/more.png" },
  { revision: "71ea1a568d9c587d0f9bdd10ad0a4b3c", url: "assets/plus.png" },
  {
    revision: "e0d9eab3c75035d714a61243b4bdc069",
    url: "assets/webfonts/archia-regular-webfont.eot",
  },
  {
    revision: "44b223ad896c78b16682dcf37a6bb6af",
    url: "assets/webfonts/archia-regular-webfont.ttf",
  },
  {
    revision: "571e46710904236b3eb8a4212d62d49d",
    url: "assets/webfonts/archia-regular-webfont.woff",
  },
  {
    revision: "02155d96e4a3f18305ab944925389c77",
    url: "assets/webfonts/archia-regular-webfont.woff2",
  },
  {
    revision: "56e0475f03d3c9baad18e70a6babb93a",
    url: "assets/webfonts/stylesheet.css",
  },
  { revision: "e40a028a5991e4bec59d3e21861968ed", url: "css/style.css" },
  { revision: "cd05b5f4e87aa1b649a053eed3d98ac6", url: "index.html" },
  { revision: "c270dd2a3beb2c8e4cbcbf177c3c35f4", url: "js/app.js" },
  { revision: "ee4fb8d615d49807f96d5e2c503f6e29", url: "js/skycons.js" }
]
);
