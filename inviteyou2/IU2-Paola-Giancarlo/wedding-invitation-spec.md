
# Wedding Invitation — Functional Spec (Final)

This document describes the **final version** of the invitation used for *Paola & Giancarlo*.
It matches exactly what is deployed in `index.html` after integrating the **RSVP Option 2 (endpoint + token)**.

---

## Overview

- Front‑end: a single `index.html` (your original design: hero, animated photos, countdown, maps, program, dress code, adults note, audio controls).
- Config: `config.json` loaded by a **minimal** `config-loader.js` that sets `window.config` (no DOM mutations).
- RSVP: dynamic section that **requires a personal link** with `?t=TOKEN`. It talks to a Google Apps Script **Web App** (the “endpoint”).
- Backend data: Google Sheet **Invitados** with one row per invitee and a generated URL with the token.
- WhatsApp notice (optional): if `config.rsvp.phone` exists, a “Avisar por WhatsApp” button appears after confirming.

The rest of the page is unchanged and renders as before.

---

## Files & Structure

```
/index.html                # your invitation (visuals/animations intact)
/config.json               # runtime configuration (see schema below)
/config-loader.js          # minimal loader => window.config
/img/...                   # images (logo, hero, decor, photos, program.svg)
/audio/song.(mp3|m4a|ogg)  # background audio (optional)
```

> **Serving**: Use any static HTTP server (e.g., `python -m http.server`). Avoid opening via `file://` due to CORS/Fetch restrictions.

---

## `config.json` — Schema (used in this build)

```jsonc
{
  "title": "Invitación de boda — Paola & Giancarlo",
  "names":   { "primary": "Paola Arias & Giancarlo Álvarez" },
  "texts":   { "hero": "¡Nos casamos!" },

  "date": {
    "iso": "2025-10-25T10:00:00-06:00",          // countdown target
    "readable": "25 de octubre de 2025 • 10:00 a. m."
  },

  "links": {
    "church": {
      "title": "Iglesia católica de Paquera",
      "desc":  "Provincia de Puntarenas, Paquera",
      "waze":  "https://waze.com/ul?...",
      "maps":  "https://www.google.com/maps/search/?api=1&query=...",
      "query": "R398+W5Q, Provincia de Puntarenas, Paquera"
    },
    "reception": {
      "title": "Bella Vista House — Paquera",
      "desc":  "Provincia de Puntarenas, Gigante",
      "waze":  "https://waze.com/ul?...",
      "maps":  "https://www.google.com/maps/search/?api=1&query=...",
      "query": "V3X7+MF, Provincia de Puntarenas, Gigante"
    }
  },

  "audio": { "src": "audio/song.mp3" },

  "rsvp": {
    // One of:
    // 1) Endpoint mode (final build)
    "type": "endpoint",
    "endpoint": "https://script.google.com/macros/s/....../exec",
    "phone": "+50660032092",      // optional: shows WhatsApp button after confirming
    "deadline": "2025-10-10"

    // 2) (Alternative) Google Form embed
    // "type": "google_form",
    // "embed_url": "https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true",
    // "height": 900
  }
}
```

> The page **still works without `config.json`**, but you will lose dynamic pieces; for production you must provide it.

---

## Front‑end Behavior (what `index.html` does)

### 1) Hero, photos, and animations
- Your original hero image fade‑in and name rise animations stay intact.
- Left/right “fly‑in” photos on scroll via `IntersectionObserver` (unchanged).

### 2) Audio Controls
- Desktop chip (play/pause + toggle) and a compact mobile button.
- The `<audio>` loads from `config.audio.src` (if not set, controls are visible but playback may fail).

### 3) Countdown
- Ticks against `date.iso`.  
- **Mobile label tweak**: on ≤768 px, the last label (“Segundos”) changes to **“SEG”** automatically.

### 4) Maps / Navigation
- Buttons use **deep links** to open Waze / Google Maps app when available, falling back to web URLs.  
- If `config.links.*.query` is present it’s used by the deeplink; otherwise the hardcoded `data-query` from the HTML.

### 5) RSVP (Endpoint + Token)
- If `config.rsvp.type === "google_form"`: show the iframe `embed_url` and stop.
- Else if `config.rsvp.endpoint` exists:
  - Read `token` from the URL: `?t=XXXXXXXX`.
  - If **no token**, show the note: *“Para confirmar usa tu enlace personal (incluye token).”*.
  - With token:
    1. **Lookup** (GET): `endpoint?action=lookup&token=...`  
       Expects JSON: `{ ok, nombre, allowed_max, acomp_prev }`.
       - Shows **prominent line**: **“Hola {nombre}. Podés traer a {allowed_max} acompañante(s) o escoger otro número de acompañantes.”**
       - Populates a centered `<select>` ranging **0..allowed_max** (preselect `acomp_prev` or `allowed_max`).
       - Shows **“Total de personas: {acompanantes + 1}”** prominently.
    2. **Confirm** (POST): body `action=confirm&token=...&acompanantes=K`  
       Returns `{ ok, acompanantes, total_confirmado, timestamp }`.
       - Locks the selector so the invitee can **only reduce** later (options 0..K).
       - If `config.rsvp.phone` exists, shows “Avisar por WhatsApp” opening WhatsApp with a prebuilt message.

Accessibility and responsive concerns are preserved (labels, ARIA, keyboard use).

---

## Backend: Google Sheet and Apps Script

### Sheet: **Invitados** (tab name must match `SHEET_NAME`)

| Col | Header                    | Type        | Notes                                                   |
|----:|---------------------------|-------------|---------------------------------------------------------|
| A   | `nombre`                  | text        | Invitee display name                                    |
| B   | `telefono`                | text        | Optional                                                |
| C   | `cupo_max`                | number      | Allowed companions (without the invitee)                |
| D   | `token`                   | text        | Random token per row                                    |
| E   | `usado`                   | boolean     | TRUE after first confirmation                           |
| F   | `acompanantes_confirmados`| number/null | Chosen companions (0..cupo_max)                         |
| G   | `total_confirmado`        | number/null | `acompanantes_confirmados + 1`                          |
| H   | `timestamp`               | datetime    | Last confirmation time (App Script fills it)            |
| I   | `link`                    | url         | `BASE_URL + '?t=' + token`                              |

> **BASE_URL** must point to your public invitation **including `index.html`** (e.g., `https://domain/path/index.html`).

### Apps Script (Web App)

- Constants:
  - `const SHEET_NAME = 'Invitados';`
  - `const BASE_URL   = 'https://YOUR.DOMAIN/path/index.html';`
- Menu: **RSVP → Generar tokens y links**  
  - Generates missing tokens and writes the `link` column using `BASE_URL`.
- `doGet(e)` supports `action=lookup`:
  - Find row by token and return `{ ok:true, nombre, allowed_max:cupo_max, acomp_prev:F or null }`.
- `doPost(e)` supports `action=confirm`:
  - Validate: can **reduce** but not increase beyond prior confirmed value.
  - Write columns E–H; return `{ ok:true, acompanantes, total_confirmado, timestamp }`.
- Deployment: **Deploy → New deployment → Web app → Anyone with the link**. Use the `/exec` URL in `config.json` as `rsvp.endpoint`.

---

## Operations

- **Change domain/folder**: update `BASE_URL` in Apps Script → re‑deploy (if needed) → **RSVP → Generar tokens y links** to refresh column I.
- **Change cupo_max** for a guest: edit column C. The UI still won’t allow increasing above the last confirmed value.
- **Switch to Google Form** temporarily: change `config.rsvp` to type `"google_form"` with `embed_url`; no code changes.

---

## Test Plan (copy‑paste in Console)

**Config loaded**  
```js
fetch('config.json',{cache:'no-store'}).then(r=>r.json()).then(c=>console.log('OK',c)).catch(e=>console.error('JSON inválido',e))
```

**Endpoint present**  
```js
console.log('EP:', window.config?.rsvp?.endpoint)
```

**Lookup** (replace TOKEN)  
```js
fetch(window.config.rsvp.endpoint+'?action=lookup&token=TOKEN').then(r=>r.json()).then(console.log)
```

**Confirm** (replace TOKEN & value)  
```js
const p=new URLSearchParams({action:'confirm',token:'TOKEN',acompanantes:'2'});
fetch(window.config.rsvp.endpoint,{method:'POST',body:p}).then(r=>r.json()).then(console.log)
```

---

## Styling notes (applied)

```css
#rsvp-note{
  font-size: clamp(16px, 2.6vw, 20px);
  font-weight: 700;
  color: var(--brand-ink);
  text-align: center;
  margin: 10px auto 14px;
}
#rsvpSelect{
  display:block;
  width:100%;
  max-width:50%;
  margin:0 auto;
  padding:12px 14px;
  font-size: clamp(18px, 3.8vw, 24px);
  font-weight: 700;
  text-align:center; text-align-last:center; -moz-text-align-last:center;
}
#rsvpSelect option{ text-align:center; }
#rsvp-total{ display:block; text-align:center; margin-top:8px; font-size: clamp(16px, 2.6vw, 20px); font-weight: 700; }
```

---

## Known‑good copies

- `index.html` contains:
  - The dynamic RSVP block (form + fallback iframe).
  - The RSVP JS that builds UI with lookup/confirm and the **new greeting copy**:  
    “Hola {nombre}. **Podés traer a {allowed_max} acompañante(s) o escoger otro número de acompañantes.**”
  - The mobile “SEG” patch for the countdown.

This spec is the source of truth for the current deployment.
