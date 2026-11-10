# Schliff

Edelstein-Schleifspiel für den Browser. Quer über den Stein wischen, um ihn zu schneiden. Ziel ist, das Juwel so knapp wie möglich freizulegen, ohne es zu treffen.

Live: https://dashslashtod-wq.github.io/schliff/

## Was es gibt

- **Tagesstein:** jeden Tag ein Stein, für alle derselbe, ein Versuch. Zahlt das Zehnfache plus Serien-Bonus.
- **Mine:** endlos Steine, 3 Leben. Jeder Stein wird verkauft.
- **Seltenheit:** gewöhnlich, ungewöhnlich, selten, episch, legendär.
- **Zeitstein:** wenige Sekunden, achtfacher Preis oder nichts.
- **Laden:** Schächte, Hilfsmittel, Werkstatt (Lehrlinge verdienen auch offline).
- **Vitrine:** Tagessteine, Sammlung aller Steinarten, Erfolge mit Belohnung.
- **Menü:** Musik, Geräusche, Sprache (Deutsch/Englisch), Anleitung, Spielstand sichern, laden, löschen.
- **App:** auf dem Handy installierbar, läuft ohne Netz weiter.

## Dateien

| Datei | Zweck |
| --- | --- |
| `schliff.html` | Quelle des Spiels (HTML, CSS, JS in einer Datei). Hier wird bearbeitet. |
| `build.js` | Baut daraus `index.html` mit Kopfzeilen für Suche, Link-Vorschau und App-Installation. |
| `index.html` | Fertige Seite fürs Hosting. Nicht von Hand bearbeiten. |
| `sw.js` | Service Worker: Netz zuerst, ohne Netz die letzte gespeicherte Fassung. |
| `manifest.webmanifest` | Angaben für die Installation als App. |
| `gen-icons.js` | Erzeugt `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` und `og.png`. |

## Bauen

```bash
node build.js
```

Icons und Vorschaubild neu erzeugen (nur bei geändertem Motiv):

```bash
node gen-icons.js
```

## Veröffentlichen

GitHub Pages liefert den Branch `gh-pages` aus. Nach jeder Änderung beide Branches hochladen:

```bash
git push origin main main:gh-pages
```

## Stellschrauben in `schliff.html`

| Name | Bedeutung |
| --- | --- |
| `SHAFTS`, `TOOLS`, `IDLE` | Preise und Wirkung im Laden |
| `TYPES` | Steinarten, Häufigkeit (`w`) und Wert (`v`) |
| `RUSH_P`, `RUSH_X`, `RUSH_MIN` | Zeitstein: Chance, Preisfaktor, Mindest-Reinheit |
| `DAILY_X` | Faktor für den Tagesstein |
| `ACH` | Erfolge und Belohnungen |
| `M_BARS`, `M_LEAD` | Musik: Akkorde, Bass, Melodie |

## Spielstand

Liegt nur im `localStorage` des Browsers (Schlüssel `schliff.v1`). Kein Konto, kein Server. Im Menü lässt er sich als Code sichern und auf einem anderen Gerät laden.
