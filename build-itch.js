// Baut das Paket für itch.io: schliff-itch.zip mit einer index.html.
// Aufruf: node build-itch.js   (vorher node build.js)
// Für itch.io ohne App-Manifest und ohne Service Worker: das Spiel läuft dort in einem eingebetteten Rahmen.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const dir = path.join(__dirname, 'itch');
const zip = path.join(__dirname, 'schliff-itch.zip');
let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const drop = (re, what) => {
  if (!re.test(html)) throw new Error('nicht gefunden: ' + what);
  html = html.replace(re, '');
};
drop(/<link rel="manifest"[^>]*>\r?\n?/, 'manifest');
drop(/<link rel="apple-touch-icon"[^>]*>\r?\n?/, 'apple-touch-icon');
drop(/<script>if\('serviceWorker' in navigator\)[^<]*<\/script>\r?\n?/, 'service worker');

fs.rmSync(dir, { recursive: true, force: true });
fs.mkdirSync(dir);
fs.writeFileSync(path.join(dir, 'index.html'), html);
fs.rmSync(zip, { force: true });
execFileSync('powershell', ['-NoProfile', '-Command', `Compress-Archive -Path '${path.join(dir, 'index.html')}' -DestinationPath '${zip}'`]);
console.log('schliff-itch.zip gebaut (' + Math.round(fs.statSync(zip).size / 1024) + ' KB)');
