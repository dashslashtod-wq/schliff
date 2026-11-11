# Gemsmith auf CrazyGames

Paket bauen:

```bash
node build.js
```

```bash
node build-crazy.js
```

Das erzeugt `schliff-crazygames.zip` (nicht in Git). Titelbilder liegen in `crazygames-media/`.

## Was die CrazyGames-Fassung anders macht

| Punkt | Umsetzung |
| --- | --- |
| SDK | `crazygames-sdk-v3.js` im Kopf, das Spiel startet erst nach `SDK.init()` |
| Spielstand | über das Datenmodul des SDK (`SDK.data`), synchronisiert mit dem CrazyGames-Konto |
| Spielstatus | `gameplayStart` beim Schneiden, `gameplayStop` bei Ergebnis, Laden, Vitrine, Menü |
| Zwischenwerbung | beim Klick auf „Nächster Stein“ / „Neue Schicht“ (das SDK erlaubt höchstens eine alle 3 Minuten) |
| Belohnungsvideo | im Fenster „Willkommen zurück“: Lehrlingslohn doppelt einsammeln |
| Ton | aus während Werbung und wenn CrazyGames Ton aus verlangt (`muteAudio`) |
| Glücksmomente | `happytime` bei legendärem Fund und Meilenstein |
| Entfernt | Bestenliste, itch.io-Link, Spendenhinweis, Link im Teilen-Text, Besucherzählung, App-Manifest, Service Worker |
| Einstieg | ohne Anleitungsfenster, direkt ins Spiel |

## Einstellungen beim Einreichen (Developer Portal → Submit game)

| Feld | Wert |
| --- | --- |
| Game name | Gemsmith |
| Engine / Type | HTML5 |
| Upload | `schliff-crazygames.zip` |
| Progress save | **Data module** auswählen, sonst ist das Speichern abgeschaltet |
| Orientation | beides (Landscape und Portrait) |
| Mobile | ja |
| Genre | Casual / Puzzle |
| Covers | `crazygames-media/cover-landscape.png` (1920 × 1080), `cover-portrait.png` (800 × 1200), `cover-square.png` (800 × 800) |
| Preview video | `crazygames-media/preview-landscape.mp4` (1920 × 1080) und `preview-portrait.mp4` (1080 × 1620), je 18,6 s, ohne Ton. Nicht in Git, liegen nur lokal. |

## Beschreibung (zum Einfügen)

Slice the rock. Free the gem.

Swipe across the stone to cut it. Cut as close to the gem as you can without cracking it. The purer the gem, the more it sells for.

- A new daily stone every day, the same for everyone.
- An endless mine with five rarities, from common to legendary.
- Rush stones: only a few seconds, eight times the price.
- Apprentices who keep earning while you are away.
- Ten shafts, tools, orders, a daily lucky wheel and weekly events.
- Relaxed elevator and shopping mall music.

Controls: swipe or drag with the mouse to cut. Press „Done“ to sell the stone early.

## Ablauf bei CrazyGames

1. Einreichen, dann Prüfung durch das QA-Team.
2. **Basic Launch:** kleiner Testlauf, noch ohne Werbung und ohne Einnahmen.
3. **Full Launch:** nur wenn die Zahlen gut sind. Erst dann laufen Werbung und Einnahmen.
4. Auszahlung über Tipalti, monatlich ab 100 € Guthaben.

Quelle: https://docs.crazygames.com (Stand 2026-11-11). Bedingungen können sich ändern.
