# Gemsmith auf itch.io

Seite: https://dashslashtod.itch.io/schliff

Alles zum Hochladen. Paket bauen:

```bash
node build.js
```

```bash
node build-itch.js
```

Das erzeugt `schliff-itch.zip` (nicht in Git). Titelbild: `itch-media/cover.png` (630 × 500).

## Einstellungen beim Anlegen (Dashboard → Create new project)

| Feld | Wert |
| --- | --- |
| Title | Gemsmith |
| Project URL | `schliff` |
| Short description or tagline | Slice the rock, free the gem. A new stone every day. |
| Classification | Games |
| Kind of project | HTML |
| Release status | Released |
| Pricing | No payments |
| Uploads | `schliff-itch.zip`, Häkchen bei „This file will be played in the browser“ |
| Embed options | Viewport 960 × 720, „Mobile friendly“ an (Orientation: Portrait), „Fullscreen button“ an, „Automatically start on page load“ an |
| Genre | Puzzle |
| Tags | `casual`, `relaxing`, `idle`, `incremental`, `daily`, `satisfying`, `gems`, `mouse-only`, `touch-friendly`, `singleplayer` |
| App store links | leer |
| Custom noun | leer |
| Community | Comments |
| Visibility & access | erst „Draft“, nach dem Testen „Public“ |
| Cover image | `itch-media/cover.png` |
| Screenshots | 3 bis 5 eigene Bildschirmfotos (Stein beim Schneiden, Legendär-Fund, Laden, Vitrine) |

## Beschreibung (zum Einfügen)

**Slice the rock. Free the gem.**

Swipe across the stone to cut it. Cut as close to the gem as you can without cracking it. The purer the gem, the more it sells for.

- **Daily stone:** one new stone every day, the same for everyone, one try. Compare your cut with friends and climb today's leaderboard.
- **Mine:** endless stones, five rarities from common to legendary, rush stones with only a few seconds on the clock.
- **Workshop:** hire apprentices who keep earning while you are away.
- **Ten shafts, tools, orders, a daily lucky wheel, weekly events and a master's certificate** for when you want to start over stronger.
- Relaxed elevator and shopping mall music.

Plays in the browser on desktop and phone. No account needed. Your progress is saved in your browser; back it up as a code in the menu.

---

**Schneide den Stein. Leg das Juwel frei.**

Wisch quer über den Stein, um ihn zu schneiden. Schneide so knapp wie möglich am Juwel entlang, ohne es zu treffen. Je reiner das Juwel, desto mehr bringt es.

Jeden Tag ein neuer Stein, für alle gleich. Dazu eine endlose Mine, fünf Seltenheiten, Zeitsteine, Lehrlinge, die auch offline verdienen, zehn Schächte, Aufträge, Glücksrad und Wochen-Events. Spielt im Browser auf PC und Handy, ohne Konto. Deutsch und Englisch.

## Hinweise

- Auf itch.io läuft das Spiel in einem eingebetteten Rahmen. Spielstand, Bestenliste und Besucherzählung funktionieren dort. Der Spielstand auf itch.io ist ein anderer als auf der GitHub-Seite; mit „Code kopieren“ und „Code laden“ im Menü lässt er sich übertragen.
- Nach jeder Änderung am Spiel: `node build.js`, `node build-itch.js`, dann in itch.io unter „Edit game“ die neue ZIP hochladen und die alte löschen.
