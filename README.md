# Kolmården Run Club

```sh
npm install
npm run dev
```

Push till `main` bygger och publicerar på GitHub Pages (`.github/workflows/deploy.yml`).

## Event

Facebook har stängt API:t för gruppers event, så event läggs in för hand i `src/events.json`:

```json
{ "name": "Långpass", "start": "2026-11-03T19:00", "place": "Hyttans lekplats", "url": "https://www.facebook.com/events/..." }
```

`place` och `url` är valfria. Passerade event döljs automatiskt.
