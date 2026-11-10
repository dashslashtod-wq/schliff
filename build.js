// Baut index.html (eigenständige Seite fürs Hosting) aus schliff.html (Spielquelle).
// Aufruf: node build.js
const fs = require('fs');
const path = require('path');

const SITE = 'https://dashslashtod-wq.github.io/schliff/';
const src = fs.readFileSync(path.join(__dirname, 'schliff.html'), 'utf8');
const icon = "data:image/svg+xml," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#1d2440"/>' +
  '<polygon points="32,10 52,26 44,52 20,52 12,26" fill="#ffc94d"/><polygon points="32,10 52,26 32,32" fill="#ffe6a3"/>' +
  '<polygon points="12,26 32,32 20,52" fill="#d9971a"/></svg>');

const head = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="description" content="Schliff: slice the rock, free the gem. A new stone every day, the same for everyone. Sell gems, dig deeper, earn while you are away.">
<meta name="theme-color" content="#1d2440">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Schliff">
<meta property="og:title" content="Schliff">
<meta property="og:description" content="Slice the rock, free the gem. A new stone every day, the same for everyone.">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}">
<meta property="og:image" content="${SITE}og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="${SITE}">
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="icon" href="${icon}">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
</head>
<body>
`;

const tail = `
<script>if('serviceWorker' in navigator)addEventListener('load',()=>{navigator.serviceWorker.register('sw.js').catch(()=>{})});</script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), head + src + tail);
console.log('index.html gebaut (' + (head.length + src.length + tail.length) + ' Zeichen)');
