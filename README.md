# Schliff

Edelstein-Schleifspiel für den Browser. Quer über den Stein wischen, um ihn zu schneiden. Ziel ist, das Juwel so knapp wie möglich freizulegen, ohne es zu treffen.

- **Tagesstein:** jeden Tag ein Stein, für alle derselbe, ein Versuch.
- **Mine:** Endlos-Modus mit 3 Leben und steigender Schwierigkeit.
- **Vitrine:** Sammlung aller geschliffenen Tagessteine.

## Dateien

| Datei | Zweck |
| --- | --- |
| `schliff.html` | Quelle des Spiels (HTML, CSS, JS in einer Datei). Hier wird bearbeitet. |
| `build.js` | Baut daraus `index.html`. |
| `index.html` | Fertige Seite fürs Hosting. Nicht von Hand bearbeiten. |

## Bauen

```bash
node build.js
```

## Lokal ansehen

`index.html` im Browser öffnen. Kein Server nötig.

## Hosting

Die Seite ist statisch. `index.html` reicht. GitHub Pages: Repo-Einstellungen, Pages, Branch `main`, Ordner `/`.

## Spielstand

Liegt nur im `localStorage` des Browsers (Schlüssel `schliff.v1`). Kein Konto, kein Server.
