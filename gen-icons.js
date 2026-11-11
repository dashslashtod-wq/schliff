// Erzeugt die PNG-Bilder für App-Icon und Link-Vorschau ohne Zusatzpakete.
// Aufruf: node gen-icons.js   (nur nötig, wenn sich Farben oder Motiv ändern)
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

function png(w, h, rgba) {
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  const chunk = (type, data) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const body = Buffer.concat([Buffer.from(type), data]);
    const crc = Buffer.alloc(4); crc.writeUInt32BE(zlib.crc32(body) >>> 0);
    return Buffer.concat([len, body, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

const hsl = (h, s, l) => {
  s /= 100; l /= 100;
  const k = n => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0) * 255, f(8) * 255, f(4) * 255];
};
const hex = s => [parseInt(s.slice(1, 3), 16), parseInt(s.slice(3, 5), 16), parseInt(s.slice(5, 7), 16)];
const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const inTri = (p, a, b, c) => {
  const d = (u, v, w) => (u[0] - w[0]) * (v[1] - w[1]) - (v[0] - w[0]) * (u[1] - w[1]);
  const d1 = d(p, a, b), d2 = d(p, b, c), d3 = d(p, c, a);
  return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0));
};
const centroid = p => [p.reduce((s, v) => s + v[0], 0) / p.length, p.reduce((s, v) => s + v[1], 0) / p.length];

// Facettiertes Vieleck: Fächer aus Dreiecken, Helligkeit nach Kantenrichtung (Licht von links oben).
function faceted(poly, colorOf) {
  const c = centroid(poly);
  const tris = poly.map((a, i) => {
    const b = poly[(i + 1) % poly.length];
    let nx = b[1] - a[1], ny = a[0] - b[0]; const l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l;
    if (nx * ((a[0] + b[0]) / 2 - c[0]) + ny * ((a[1] + b[1]) / 2 - c[1]) < 0) { nx = -nx; ny = -ny; }
    return { a, b, col: colorOf(0.5 + 0.5 * (nx * -0.53 + ny * -0.85), i) };
  });
  const table = poly.map(v => [c[0] + (v[0] - c[0]) * 0.5, c[1] + (v[1] - c[1]) * 0.5]);
  return p => {
    for (const t of tris) if (inTri(p, c, t.a, t.b)) {
      for (let i = 0; i < table.length; i++) if (inTri(p, c, table[i], table[(i + 1) % table.length])) return mix(t.col, [255, 255, 255], 0.18);
      return t.col;
    }
    return null;
  };
}

function render(w, h, scene, file) {
  const buf = Buffer.alloc(w * h * 4), N = 3;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    let r = 0, g = 0, b = 0;
    for (let sy = 0; sy < N; sy++) for (let sx = 0; sx < N; sx++) {
      const c = scene((x + (sx + 0.5) / N) / w, (y + (sy + 0.5) / N) / h);
      r += c[0]; g += c[1]; b += c[2];
    }
    const i = (y * w + x) * 4;
    buf[i] = r / (N * N); buf[i + 1] = g / (N * N); buf[i + 2] = b / (N * N); buf[i + 3] = 255;
  }
  fs.writeFileSync(path.join(__dirname, file), png(w, h, buf));
  console.log(file, w + 'x' + h);
}

const BG = hex('#1d2440'), LAMP = hex('#4a57a6');
const gemGold = faceted([[0.5, 0.2], [0.76, 0.4], [0.66, 0.76], [0.34, 0.76], [0.24, 0.4]], sh => hsl(44, 100, 38 + sh * 40));

// App-Icon: Motiv bleibt in der sicheren Mitte, damit runde Masken nichts abschneiden.
const icon = (u, v) => {
  const d = Math.hypot(u - 0.5, v - 0.48);
  return gemGold([u, v]) || mix(LAMP, BG, Math.min(1, d / 0.6));
};
render(192, 192, icon, 'icon-192.png');
render(512, 512, icon, 'icon-512.png');
render(180, 180, icon, 'apple-touch-icon.png');

// Link-Vorschau 1200 x 630: Stein mit Rubin, eine Ecke schon abgeschnitten.
const AR = 1200 / 630;
const ring = (n, rx, ry, cx, cy, rot, wob) => Array.from({ length: n }, (_, i) => {
  const a = rot + (i + wob[i % wob.length]) / n * Math.PI * 2;
  return [cx + Math.cos(a) * rx / AR, cy + Math.sin(a) * ry];
});
const rockPoly = ring(11, 0.4, 0.4, 0.5, 0.5, 0.3, [0, 0.2, -0.15, 0.1, -0.2, 0.15]);
const rock = faceted(rockPoly, sh => hsl(26 + sh * 10, 14 + sh * 7, 25 + sh * 30));
const ruby = faceted(ring(6, 0.17, 0.21, 0.5, 0.5, 0.5, [0, 0.12, -0.1]), sh => hsl(350, 80, 32 + sh * 42));
const og = (u, v) => {
  const p = [u, v];
  // Schnittlinie oben rechts: was darüber liegt, ist schon weg
  const cut = (u - 0.5) * AR * 0.62 - (v - 0.5) * 0.78 > 0.27;
  const d = Math.hypot((u - 0.5) * AR, v - 0.5);
  const bg = mix(LAMP, BG, Math.min(1, d / 0.75));
  return ruby(p) || (!cut && rock(p)) || bg;
};
render(1200, 630, og, 'og.png');

// Titelbild für itch.io (630 x 500): Stein mit Saphir, oben schon ein Stück abgeschnitten.
const AR2 = 630 / 500;
const ring2 = (n, rx, ry, cx, cy, rot, wob) => Array.from({ length: n }, (_, i) => {
  const a = rot + (i + wob[i % wob.length]) / n * Math.PI * 2;
  return [cx + Math.cos(a) * rx / AR2, cy + Math.sin(a) * ry];
});
const rock2 = faceted(ring2(11, 0.42, 0.42, 0.5, 0.52, 0.5, [0, 0.18, -0.12, 0.1, -0.2, 0.15]), sh => hsl(26 + sh * 10, 14 + sh * 7, 25 + sh * 30));
const sapphire = faceted(ring2(7, 0.2, 0.22, 0.5, 0.52, 0.2, [0, 0.1, -0.12]), sh => hsl(222, 78, 32 + sh * 42));
const cover = (u, v) => {
  const p = [u, v];
  const cut = (u - 0.5) * AR2 * -0.55 - (v - 0.52) * 0.83 > 0.3;
  const d = Math.hypot((u - 0.5) * AR2, v - 0.52);
  return sapphire(p) || (!cut && rock2(p)) || mix(LAMP, BG, Math.min(1, d / 0.7));
};
render(630, 500, cover, 'itch-media/cover.png');

// Titelbilder für CrazyGames: 1920 x 1080, 800 x 1200, 800 x 800 (ohne Rahmen, ohne Text)
function coverScene(w, h) {
  const ar = w / h, k = Math.min(1, ar);
  const rg = (n, rx, ry, cx, cy, rot, wob) => Array.from({ length: n }, (_, i) => {
    const a = rot + (i + wob[i % wob.length]) / n * Math.PI * 2;
    return [cx + Math.cos(a) * rx * k / ar, cy + Math.sin(a) * ry * k];
  });
  const rock = faceted(rg(11, 0.42, 0.42, 0.5, 0.5, 0.5, [0, 0.18, -0.12, 0.1, -0.2, 0.15]), sh => hsl(26 + sh * 10, 14 + sh * 7, 25 + sh * 30));
  const gem = faceted(rg(7, 0.2, 0.22, 0.5, 0.5, 0.2, [0, 0.1, -0.12]), sh => hsl(222, 78, 32 + sh * 42));
  return (u, v) => {
    const x = (u - 0.5) * ar / k, y = (v - 0.5) / k;
    const cut = x * -0.55 - y * 0.83 > 0.3;
    return gem([u, v]) || (!cut && rock([u, v])) || mix(LAMP, BG, Math.min(1, Math.hypot((u - 0.5) * ar, v - 0.5) / (0.7 * Math.max(1, ar))));
  };
}
for (const [w, h, f] of [[1920, 1080, 'crazygames-media/cover-landscape.png'], [800, 1200, 'crazygames-media/cover-portrait.png'], [800, 800, 'crazygames-media/cover-square.png']]) render(w, h, coverScene(w, h), f);
