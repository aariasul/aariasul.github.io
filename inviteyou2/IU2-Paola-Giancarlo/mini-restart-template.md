
# Mini Restart / Runbook — Wedding Invitation (Final Build)

Use this checklist if **something breaks** or after moving the site.

---

## 0) Quick view
- The site is static: `index.html` + `config.json` + assets.
- RSVP uses **endpoint + token** (`?t=...`) to a Google Apps Script **/exec** URL.
- Each guest must open **their personal link** (column **I** in the sheet).

---

## 1) Hard refresh & cache
- Reload with **hard refresh**: `Ctrl/Cmd + Shift + R`.
- Optionally add a cache‑buster: `index.html?v=2`.

---

## 2) Validate `config.json`
Open DevTools Console and run:
```js
fetch('config.json',{cache:'no-store'}).then(r=>r.json()).then(cfg=>console.log('✅ JSON OK',cfg)).catch(e=>console.error('❌ JSON inválido',e))
```
Common mistakes: trailing commas, duplicate keys, or missing quotes.

---

## 3) Check that `window.config` exists
```js
setTimeout(()=>console.log('config:', window.config), 300);
```

---

## 4) Check RSVP endpoint
```js
console.log('Endpoint:', window.config?.rsvp?.endpoint)
```

If undefined: fix `config.json` (`rsvp.endpoint`) or use the Google Form fallback:
```json
"rsvp": { "type": "google_form", "embed_url": "https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true", "height": 900 }
```

---

## 5) Backend smoke tests

### Lookup (replace TOKEN)
```js
fetch(window.config.rsvp.endpoint+'?action=lookup&token=TOKEN').then(r=>r.json()).then(console.log)
```
Expect: `{ ok:true, nombre, allowed_max, acomp_prev }`.

### Confirm (replace TOKEN and value)
```js
const p=new URLSearchParams({action:'confirm',token:'TOKEN',acompanantes:'2'});
fetch(window.config.rsvp.endpoint,{method:'POST',body:p}).then(r=>r.json()).then(console.log)
```
Expect: `{ ok:true, acompanantes:2, total_confirmado:3, timestamp:... }`.

---

## 6) Google Sheet sanity

Tab **Invitados** with headers:
```
A nombre | B telefono | C cupo_max | D token | E usado | F acompanantes_confirmados | G total_confirmado | H timestamp | I link
```
- **I link** must be `BASE_URL + '?t=' + token`.
- **BASE_URL** in Apps Script must point to your public `index.html` URL.

**Regenerate links/tokens:** Apps Script menu → **RSVP → Generar tokens y links**.

---

## 7) Apps Script deployment

- `Deploy → Manage deployments → Web app → Anyone with the link`.
- Copy `/exec` URL into `config.json` → `rsvp.endpoint`.
- If you change code or scopes, create a **New deployment**.

---

## 8) Moving domain/folder

- Update **Apps Script** `BASE_URL` to the new `.../index.html`.
- Re‑run **RSVP → Generar tokens y links**.
- Update image/audio paths if folder names changed.

---

## 9) UI quick checks

- **RSVP with token** shows: “Hola NOMBRE. Podés traer a N acompañante(s)…” with a **centered select (max 50% width)** and a bold **Total de personas**.
- **RSVP without token** shows the hint: “Para confirmar usa tu enlace personal (incluye token).”
- After confirming, options shrink to **0..valor** (solo reducción) and “Avisar por WhatsApp” appears if `rsvp.phone` exists.

---

## 10) Audio troubleshooting

- Ensure at least one of `audio/song.mp3 | .m4a | .ogg` exists and is referenced in `config.json` (`audio.src`).  
- Browser may block autoplay; use the visible play buttons.

---

## 11) Known good `config.json` template

```json
{
  "title": "Invitación de boda — Paola & Giancarlo",
  "names": { "primary": "Paola Arias & Giancarlo Álvarez" },
  "texts": { "hero": "¡Nos casamos!" },
  "date": {
    "iso": "2025-10-25T10:00:00-06:00",
    "readable": "25 de octubre de 2025 • 10:00 a. m."
  },
  "links": {
    "church": {
      "title": "Iglesia católica de Paquera",
      "desc": "Provincia de Puntarenas, Paquera",
      "waze": "https://waze.com/ul?...",
      "maps": "https://www.google.com/maps/search/?api=1&query=R398+W5Q%2C%20Provincia%20de%20Puntarenas%2C%20Paquera",
      "query": "R398+W5Q, Provincia de Puntarenas, Paquera"
    },
    "reception": {
      "title": "Bella Vista House — Paquera",
      "desc": "Provincia de Puntarenas, Gigante",
      "waze": "https://waze.com/ul?...",
      "maps": "https://www.google.com/maps/search/?api=1&query=V3X7+MF%2C%20Provincia%20de%20Puntarenas%2C%20Gigante",
      "query": "V3X7+MF, Provincia de Puntarenas, Gigante"
    }
  },
  "audio": { "src": "audio/song.mp3" },
  "rsvp": {
    "type": "endpoint",
    "endpoint": "https://script.google.com/macros/s/XXXX/exec",
    "phone": "+50660032092",
    "deadline": "2025-10-10"
  }
}
```

---

## 12) Final sanity steps

- Test **3 personal links** end‑to‑end.
- Mobile check (iOS + Android): maps deep links, audio, countdown label “SEG”.
- Keep this runbook next to the project root.
