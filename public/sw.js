if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return r[e]||(s=new Promise((async s=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]}))},s=(s,r)=>{Promise.all(s.map(e)).then((e=>r(1===e.length?e[0]:e)))},r={require:Promise.resolve(s)};self.define=(s,a,n)=>{r[s]||(r[s]=Promise.resolve().then((()=>{let r={};const c={uri:location.origin+s.slice(1)};return Promise.all(a.map((s=>{switch(s){case"exports":return r;case"module":return c;default:return e(s)}}))).then((e=>{const s=n(...e);return r.default||(r.default=s),r}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/a41beXddIOMNPw2hjbDeE/_buildManifest.js",revision:"a41beXddIOMNPw2hjbDeE"},{url:"/_next/static/a41beXddIOMNPw2hjbDeE/_ssgManifest.js",revision:"a41beXddIOMNPw2hjbDeE"},{url:"/_next/static/chunks/431-771f399a1fee2bbdbc1a.js",revision:"a41beXddIOMNPw2hjbDeE"},{url:"/_next/static/chunks/450-e0771d0d80cfb3393aac.js",revision:"a41beXddIOMNPw2hjbDeE"},{url:"/_next/static/chunks/563-4e41ea43b1ed2ac5fbd4.js",revision:"a41beXddIOMNPw2hjbDeE"},{url:"/_next/static/chunks/framework-2f612445bd50b211f15a.js",revision:"a41beXddIOMNPw2hjbDeE"},{url:"/_next/static/chunks/main-d96c82cd5424faa72153.js",revision:"a41beXddIOMNPw2hjbDeE"},{url:"/_next/static/chunks/pages/%5Bslug%5D-077014bb86197ff215bb.js",revision:"a41beXddIOMNPw2hjbDeE"},{url:"/_next/static/chunks/pages/_app-ee633d369375cbe8ef7c.js",revision:"a41beXddIOMNPw2hjbDeE"},{url:"/_next/static/chunks/pages/_error-9197505bf5c19ed2c4b5.js",revision:"a41beXddIOMNPw2hjbDeE"},{url:"/_next/static/chunks/pages/index-0e7ac313824f3d40f8ca.js",revision:"a41beXddIOMNPw2hjbDeE"},{url:"/_next/static/chunks/pages/search-44a21d73115c62714fe9.js",revision:"a41beXddIOMNPw2hjbDeE"},{url:"/_next/static/chunks/polyfills-e7a279300235e161e32a.js",revision:"a41beXddIOMNPw2hjbDeE"},{url:"/_next/static/chunks/webpack-6aa24242c38afc8913a0.js",revision:"a41beXddIOMNPw2hjbDeE"},{url:"/cursors/computer.png",revision:"ec771d9cf378c688bc65ab1cce0f576c"},{url:"/cursors/cursor-dark.png",revision:"15311ab44bb2040c65c71790ee18e4a1"},{url:"/cursors/cursor-light.png",revision:"ae5bcdf6b3525cc0ca049863a7a09541"},{url:"/cursors/pencil.png",revision:"3106aa4ebf982ef6281e6b3246100c86"},{url:"/cursors/select.png",revision:"3523fc5ef28c844e5644e51ebcf28286"},{url:"/cursors/taco.png",revision:"83dc84d6dafe04d9ca3d57819c10fa4e"},{url:"/graphics/icon-114.png",revision:"d467402b5979de785bb5f09628418e2a"},{url:"/graphics/icon-144.png",revision:"b56b5dd3883b4a20306fcddb514ef525"},{url:"/graphics/icon-512.png",revision:"529c970b551085083568edab4059a6a3"},{url:"/graphics/icon-57.png",revision:"f40d1b621bf2c2c9082bee5e7993f1b4"},{url:"/graphics/icon-72.png",revision:"ac27d12879efdc19f50de66a9aacb58c"},{url:"/graphics/icon-active.png",revision:"6276751c2b05a6cff3600064ee6fc2af"},{url:"/graphics/icon-inactive.png",revision:"dc2db41915e0784cd52611a3d058e4d5"},{url:"/graphics/launch-1125x2436.png",revision:"c43c4b514fa78203a51f8ea54343cf3d"},{url:"/graphics/launch-1242x2148.png",revision:"754b7f8d0f01d4c482c3fae12b75c8be"},{url:"/graphics/launch-1536x2048.png",revision:"26b78be62a781c436ceaad7a83445fe7"},{url:"/graphics/launch-1668x2224.png",revision:"a9c8a7829a4dcadc61810284f90a36e5"},{url:"/graphics/launch-2048x2732.png",revision:"2545fb685c3d3d13117c34c4910a362e"},{url:"/graphics/launch-640x1136.png",revision:"d7a532bb77d15f046672ad5f6a04f25a"},{url:"/graphics/launch-750x1294.png",revision:"cd080c165612443d1a767d8fa2444aa0"},{url:"/graphics/open-graph.png",revision:"bbee0bbcfae3d2c27cb46bec9fee343b"},{url:"/graphics/publisher.png",revision:"b7bedf246f4540ede86dc855e8c379d7"},{url:"/manifest.json",revision:"82f2ce8bb3274fb3c8e88adbea5072ae"},{url:"/pictures/james-y-rauhut-1-hover.png",revision:"566ad0298bbfa3679e48e980992add7e"},{url:"/pictures/james-y-rauhut-1.jpg",revision:"f30dfc9d650d13e8648972e6ede59cff"},{url:"/pictures/james-y-rauhut-1.webp",revision:"74190ef07b93b54eed0a111d1878b55f"},{url:"/pictures/james-y-rauhut-2-hover.png",revision:"12ec644927038539e9317d057fe8d2f6"},{url:"/pictures/james-y-rauhut-2.jpg",revision:"49627267ab324b9eb630f38d818766da"},{url:"/pictures/james-y-rauhut-2.webp",revision:"959411c745ff17f121c0254b4aa5928a"},{url:"/pictures/james-y-rauhut-3-hover.png",revision:"29ca5c101f10343905c2e7893e0642bb"},{url:"/pictures/james-y-rauhut-3.jpg",revision:"377851a87620352867cbb49b8809d8ff"},{url:"/pictures/james-y-rauhut-3.webp",revision:"16302bc951568cad1e16243baa82ee0d"},{url:"/robots.txt",revision:"5e0bd1c281a62a380d7a948085bfe2d1"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:r,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600,purgeOnQuotaError:!0})]}),"GET")}));