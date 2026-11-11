// Baut das Paket für CrazyGames: schliff-crazygames.zip mit einer index.html.
// Aufruf: node build-crazy.js   (vorher node build.js)
// Lädt das CrazyGames-SDK v3, startet das Spiel erst nach SDK.init() und gibt es als window.SCHLIFF_CG weiter.
// Entfernt App-Manifest, Service Worker und die Besucherzählung (GoatCounter).
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const dir = path.join(__dirname, 'crazygames');
const zip = path.join(__dirname, 'schliff-crazygames.zip');
let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const swap = (re, to, what) => {
  if (!re.test(html)) throw new Error('nicht gefunden: ' + what);
  html = html.replace(re, to);
};
swap(/<link rel="manifest"[^>]*>\r?\n?/, '', 'manifest');
swap(/<link rel="apple-touch-icon"[^>]*>\r?\n?/, '', 'apple-touch-icon');
swap(/<script>if\('serviceWorker' in navigator\)[^<]*<\/script>\r?\n?/, '', 'service worker');
swap(/<script data-goatcounter[^>]*><\/script>\r?\n?/, '', 'goatcounter');

// SDK in den Kopf, Text auf dem Handy nicht markierbar (Vorgabe von CrazyGames)
swap(/<\/head>/, '<script src="https://sdk.crazygames.com/crazygames-sdk-v3.js"></script>\n' +
  '<style>body{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}input,textarea{-webkit-user-select:text;user-select:text}</style>\n</head>', 'head');

// Spiel nicht sofort starten, sondern als Funktion ablegen
swap(/\(\(\)=>\{\r?\n'use strict';/, "window.__schliffStart=()=>{\n'use strict';", 'game start');
const end = html.lastIndexOf('})();');
if (end < 0) throw new Error('nicht gefunden: game end');
html = html.slice(0, end) + '};' + html.slice(end + 5);

// Nach dem Spielcode: SDK starten, dann das Spiel
swap(/<\/body>/, '<script>(async()=>{let cg=null;try{const S=window.CrazyGames&&window.CrazyGames.SDK;' +
  "if(S){await S.init();if(S.environment!=='disabled')cg={sdk:S,env:S.environment,store:S.data}}}catch(e){}" +
  'window.SCHLIFF_CG=cg;window.__schliffStart()})();</script>\n</body>', 'body');

fs.rmSync(dir, { recursive: true, force: true });
fs.mkdirSync(dir);
fs.writeFileSync(path.join(dir, 'index.html'), html);
fs.rmSync(zip, { force: true });
execFileSync('powershell', ['-NoProfile', '-Command', `Compress-Archive -Path '${path.join(dir, 'index.html')}' -DestinationPath '${zip}'`]);
console.log('schliff-crazygames.zip gebaut (' + Math.round(fs.statSync(zip).size / 1024) + ' KB)');
