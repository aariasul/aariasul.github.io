# Infomed Project Handoff — Current Architecture and Supabase Transition

Last updated: 2026-07-21  
Project owner/context: Infomed / Inter-ActiveID emergency bracelet pages  
Primary live example: `https://inter-activeid.com/infomed/Erick-Vega/index.html`

---

## 1. Core Project Purpose

Infomed is an emergency contact webpage system for a person wearing a scannable bracelet or QR code.

When someone scans the bracelet, the page should show:

- The wearer’s photo
- The wearer’s name
- ID / passport field
- Emergency contacts
- WhatsApp emergency message buttons
- Send-location-by-WhatsApp buttons
- Call buttons
- Special medical or emergency conditions
- Bilingual interface: Spanish and English
- Optional Add to Home Screen support for mobile/PWA use

The project must prioritize:

- Stability
- Fast loading
- Low dependency risk
- Easy updating of contacts and conditions
- No stale medical/contact data

---

## 2. Current Live URL Pattern

The current person-specific page pattern is:

```text
https://inter-activeid.com/infomed/Erick-Vega/index.html
```

Current folder pattern:

```text
/infomed/Erick-Vega/index.html
/infomed/Erick-Vega/config.json
/infomed/Erick-Vega/config-builder.html
/infomed/Erick-Vega/manifest.json
/infomed/Erick-Vega/service-worker.js
/infomed/Erick-Vega/Erick-Vega.png
```

Expected future pattern for more people:

```text
/infomed/Person-Folder/index.html
/infomed/Person-Folder/config.json
/infomed/Person-Folder/config-builder.html
/infomed/Person-Folder/manifest.json
/infomed/Person-Folder/service-worker.js
/infomed/Person-Folder/person-photo.png
```

Eventually, the goal is to transition from `config.json` files to Supabase.

---

## 3. Important Path Rules

### 3.1 SVG Icon Paths from `index.html`

From:

```text
/infomed/Erick-Vega/index.html
```

root shared SVG icons are referenced as:

```text
../../svgicons/emergency-location.svg
../../svgicons/whatsapp.svg
../../svgicons/telephone.svg
../../svgicons/homescreen.svg
```

These resolve to:

```text
https://inter-activeid.com/svgicons/emergency-location.svg
https://inter-activeid.com/svgicons/whatsapp.svg
https://inter-activeid.com/svgicons/telephone.svg
https://inter-activeid.com/svgicons/homescreen.svg
```

### 3.2 Infomed App Icons

Infomed PWA/browser icons live at root:

```text
/icons/infomed-icon-192x192.png
/icons/infomed-icon-512x512.png
```

Correct public paths:

```text
https://inter-activeid.com/icons/infomed-icon-192x192.png
https://inter-activeid.com/icons/infomed-icon-512x512.png
```

Do not use:

```text
/icons/infomed-192x192.png
/icons/infomed-512x512.png
/infomed/icons/...
```

Those are invalid or not part of the confirmed structure.

### 3.3 Local Person Assets

For Erick Vega:

```text
./Erick-Vega.png
../infomed.svg
../bg01.jpg
```

From `/infomed/Erick-Vega/index.html`, these mean:

```text
/infomed/Erick-Vega/Erick-Vega.png
/infomed/infomed.svg
/infomed/bg01.jpg
```

---

## 4. Current File Roles

### 4.1 `index.html`

The main public emergency page.

Current responsibilities:

- Loads `./config.json`
- Renders wearer data
- Renders all emergency contacts
- Renders all special conditions
- Handles language toggle
- Handles WhatsApp emergency messages
- Handles location sharing via browser geolocation
- Handles phone calls
- Handles Add to Home Screen / PWA install flow
- Updates metadata from config when available
- Does not depend on `script_check.js`

### 4.2 `config.json`

Current data source for the person-specific emergency page.

Contains:

- Page metadata
- Principal/wearer info
- Contacts
- Conditions

Current dynamic structure:

```json
{
  "title": "Infomed | Inter-ActiveID, Erick Vega",
  "description": "Página de emergencia con contactos y envío de ubicación.",
  "app_url": "https://inter-activeid.com/infomed/Erick-Vega/index.html",
  "og_image": "https://inter-activeid.com/icons/infomed-icon-512x512.png",
  "principal": {
    "nombre": "Erick Vega Zúñiga",
    "cedula": "Ced: 108170227",
    "photo_src": "./Erick-Vega.png",
    "logo_src": "../infomed.svg",
    "background_src": "../bg01.jpg"
  },
  "contacts": [
    { "key": "jorling", "nombre": "Jorling Oporta", "telefono": "86893803" },
    { "key": "damaris", "nombre": "Damaris Zúñiga", "telefono": "88694267" },
    { "key": "claire", "nombre": "Claire de Mezerville", "telefono": "87022841" },
    { "key": "contacto_4", "nombre": "Test", "telefono": "60405878" }
  ],
  "conditions": [
    { "title": "Diagnóstico principal", "value": "Cardiópata con Reemplazo Valvular - SJD" },
    { "title": "Anticoagulado", "value": "Sí" },
    { "title": "Mets", "value": "15" },
    { "title": "Alergias", "value": "Ninguna" },
    { "title": "Tipo de sangre", "value": "A+" },
    { "title": "Registrado como donante de órganos", "value": "No" },
    { "title": "título test", "value": "test01" }
  ]
}
```

Important:

- `contacts` must be an array.
- `conditions` must be an array.
- The old fixed-key `conditions` object has been replaced.
- The system no longer needs backward compatibility with the old `conditions` object unless explicitly requested.

### 4.3 `config-builder.html`

Browser-only visual editor for `config.json`.

Current responsibilities:

- Load current `./config.json`
- Load a local JSON file
- Edit main metadata
- Edit principal/wearer data
- Add/edit/delete contacts
- Add/edit/delete conditions
- Preview JSON
- Download updated `config.json`

Important limitation:

- It does not write directly to the server.
- It does not create directories.
- It downloads a new `config.json`, which must then be uploaded/replaced manually.

Important correction needed:

If the builder still says:

```text
El index actual renderiza máximo 3 contactos.
```

change it to:

```text
El index actual renderiza todos los contactos definidos en config.json.
```

Because `index.html` now renders all contacts.

### 4.4 `manifest.json`

PWA manifest.

Important:

- `short_name` controls installed app display name.
- For each person, `short_name` may be person-specific, for example `Erick Vega`.
- Icons must keep using `/icons/infomed-icon-192x192.png` and `/icons/infomed-icon-512x512.png`.

### 4.5 `service-worker.js`

Current preferred service worker is intentionally minimal:

```js
self.addEventListener('install', function(event) {
  console.log('Infomed Service Worker installing.');
});

self.addEventListener('activate', function(event) {
  console.log('Infomed Service Worker activating.');
});
```

Important:

- It does not cache assets.
- This is intentional.
- Emergency medical/contact pages should avoid stale cached data.
- Do not add caching unless there is a very strong reason and a safe cache invalidation plan.

### 4.6 `script_check.js`

`script_check.js` is not part of production Infomed.

Purpose:

- Temporary diagnostic file generated to validate JavaScript syntax with tools like `node --check`.

Important:

- `index.html` should not reference it.
- `config-builder.html` should not reference it.
- It can be deleted from the server.
- Do not treat it as a required project file.

---

## 5. Programming Rules for This Project

1. Do not assume. Diagnose from the actual file, code, error, screenshot, URL, or database structure.

2. Use the latest uploaded file as the source of truth. Do not rely on older ZIPs or previous versions unless explicitly requested.

3. Do not break what already works. Make focused, minimal changes.

4. Separate UI labels from technical fields. Changing visible text like `Person name` to `Name` should not rename variables, JSON keys, or database columns.

5. Do not change database structure unless required. Columns like `nombre_es`, `nombre_en`, `usuario_id`, `telefono`, etc. should stay stable unless there is a real technical reason.

6. Be clear which data source is being used:
   - Current version may use `config.json`.
   - Transition version may use Supabase.

7. For code edits, provide exact replacements or full updated files. Prefer practical copy/paste-ready output.

8. For Infomed, stability wins. Avoid unnecessary caching, unnecessary dependencies, and unnecessary rewrites.

9. When browser output does not match code, check cache. Test with incognito, hard refresh, or cache-busting query string.

10. Validate syntax after changes when possible, especially JavaScript and HTML.

---

## 6. Current `index.html` Important Implementation Details

### 6.1 Config Loading

Current public page reads:

```js
const CONFIG_URL = './config.json';
```

The page should fetch config with cache avoidance, conceptually:

```js
fetch(CONFIG_URL, { cache: 'no-store' })
```

This helps prevent stale `config.json`.

### 6.2 Emergency Contacts Rendering

Current correct behavior:

```js
contacts.forEach((contact, idx) => {
  ...
});
```

Incorrect old behavior:

```js
contacts.slice(0, 3).forEach((contact, idx) => {
  ...
});
```

Do not use `.slice(0, 3)` anymore unless the user explicitly wants a maximum of 3 contacts.

### 6.3 Conditions Rendering

Current correct dynamic condition format:

```js
function renderCondiciones(){
  const box = document.getElementById('condiciones');
  if(!box) return;
  box.innerHTML = '';

  const conditions = Array.isArray(appConfig.conditions) ? appConfig.conditions : [];
  const cleanConditions = conditions
    .map(condition => ({
      title: safeText(condition?.title),
      value: safeText(condition?.value)
    }))
    .filter(condition => condition.title || condition.value);

  if(!cleanConditions.length){
    addConditionLine(box, '', t('noConditions'));
    return;
  }

  cleanConditions.forEach(condition => {
    addConditionLine(box, condition.title, condition.value, true);
  });
}
```

### 6.4 Language Toggle

The language toggle currently uses inline SVG, not external `n-english.svg` or `n-spanish.svg`.

Correct behavior:

```text
English / off  → shows n
Spanish / on   → shows ñ
```

Current inline SVG concept:

```html
<span class="icon-host">
  <svg class="lang-icon lang-icon-en" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <text x="24" y="33" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="700">n</text>
  </svg>
  <svg class="lang-icon lang-icon-es" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <text x="24" y="33" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="700">ñ</text>
  </svg>
</span>
```

Current CSS concept:

```css
.lang-icon{
  display:none;
}

.switch.is-on .lang-icon-es{
  display:block;
}

.switch:not(.is-on) .lang-icon-en{
  display:block;
}
```

### 6.5 Language Labels

In English, the wearer field label should be:

```js
personNameLabel: 'Name',
```

Not:

```js
personNameLabel: 'Person name',
```

Do not use:

```js
personNameLabel: 'Person’s name',
```

Reason:

- `Name` is cleaner and more natural in a UI.
- The page context already makes it clear this is the wearer/person name.

Current recommended English labels:

```js
personNameLabel: 'Name',
personIdLabel: 'ID / Passport',
```

---

## 7. WhatsApp and Phone Behavior

### 7.1 WhatsApp Navigation

WhatsApp currently uses same-tab navigation:

```js
function openWhatsApp(phoneDigits, text){
  if(!phoneDigits){
    alert(t('missingPhoneAlert'));
    return;
  }

  const url = `https://wa.me/${phoneDigits}?text=${encodeTxt(text)}`;
  window.location.href = url;
}
```

This avoids popup issues.

### 7.2 Costa Rica Phone Formatting

Current helper behavior:

```js
function normalizePhoneForWhatsApp(raw){
  const digits = String(raw || '').replace(/\D+/g, '');
  if(digits.length === 8) return `506${digits}`;
  return digits;
}
```

So an 8-digit Costa Rican number becomes:

```text
506XXXXXXXX
```

---

## 8. Browser Cache Testing

A previous issue happened where:

- `config.json` had 4 contacts
- `index.html` supported all contacts
- Normal browser showed only 3 contacts
- Incognito showed 4 contacts

Conclusion:

```text
The code was correct. The browser had a cached version.
```

Testing tools:

```text
Ctrl + F5
Incognito window
index.html?v=2
config.json?v=2
```

---

## 9. Supabase Transition Overview

The project is transitioning from this:

```text
index.html → config.json
config-builder.html → downloads config.json
```

To something like this:

```text
index-db.html or updated index.html → Supabase
config-builder-db.html → Supabase
Supabase → stores users, contacts, conditions
```

Important:

- Do not rename database columns just because UI labels change.
- Supabase stores structured data.
- UI labels should live in code, not in the database, unless there is a deliberate CMS requirement.

---

## 10. Current Supabase Schema Observed from Screenshot

The Supabase screenshot shows at least these tables:

### 10.1 `usuarios`

Observed columns:

```text
id
nombre_es
nombre_en
cedula
photo_src
logo_src
background_src
uid
```

Purpose:

- Main wearer/person profile.
- One row per Infomed wearer/card.

### 10.2 `contactos`

Observed columns:

```text
id
usuario_id
nombre_es
nombre_en
telefono
```

Purpose:

- Emergency contacts for each wearer.

Recommended relationship:

```text
contactos.usuario_id → usuarios.id
```

### 10.3 `condiciones`

Observed columns:

```text
id
usuario_id
titulo_es
titulo_en
valor_es
valor_en
```

Purpose:

- Special conditions for each wearer.

Recommended relationship:

```text
condiciones.usuario_id → usuarios.id
```

---

## 11. Recommended Supabase Data Model

### 11.1 `usuarios`

Recommended row example:

```json
{
  "id": 1,
  "nombre_es": "Erick Vega Zúñiga",
  "nombre_en": "Erick Vega Zúñiga",
  "cedula": "Ced: 108170227",
  "photo_src": "./Erick-Vega.png",
  "logo_src": "../infomed.svg",
  "background_src": "../bg01.jpg",
  "uid": "erick-vega"
}
```

### 11.2 `contactos`

Recommended row examples:

```json
[
  {
    "id": 1,
    "usuario_id": 1,
    "nombre_es": "Jorling Oporta",
    "nombre_en": "Jorling Oporta",
    "telefono": "86893803"
  },
  {
    "id": 2,
    "usuario_id": 1,
    "nombre_es": "Damaris Zúñiga",
    "nombre_en": "Damaris Zúñiga",
    "telefono": "88694267"
  }
]
```

### 11.3 `condiciones`

Recommended row examples:

```json
[
  {
    "id": 1,
    "usuario_id": 1,
    "titulo_es": "Diagnóstico principal",
    "titulo_en": "Primary diagnosis",
    "valor_es": "Cardiópata con Reemplazo Valvular - SJD",
    "valor_en": "Heart patient with valve replacement - SJD"
  },
  {
    "id": 2,
    "usuario_id": 1,
    "titulo_es": "Anticoagulado",
    "titulo_en": "Anticoagulated",
    "valor_es": "Sí",
    "valor_en": "Yes"
  }
]
```

---

## 12. `config-builder-db.html` Current State

The current uploaded `config-builder-db.html` is an early/generic Supabase test page.

Current observed features:

- Loads Supabase JS from CDN
- Creates Supabase client
- Has language toggle
- Has signup/signin
- Has generic DB config fields:
  - Database name
  - Table name
  - Field name
- Has generic user profile fields:
  - Name
  - Phone
- `saveConfig()` currently only shows an alert:
  - `alert('Config Saved');`

Important conclusion:

```text
config-builder-db.html is not yet a real Infomed Supabase builder.
```

It still needs to be expanded or replaced so it can actually manage:

```text
usuarios
contactos
condiciones
```

---

## 13. What `config-builder-db.html` Must Eventually Do

The real Supabase builder should allow:

### 13.1 Authentication

- Sign in with Supabase Auth
- Optional sign up, if allowed
- Log out
- Show current logged-in user
- Restrict edits to authorized users

### 13.2 Profile Selection

The builder needs a way to know which Infomed wearer profile is being edited.

Options:

1. Select from existing `usuarios`
2. Search by name
3. Search by slug or ID
4. Use URL parameter, for example:

```text
config-builder-db.html?usuario_id=1
```

or:

```text
config-builder-db.html?uid=erick-vega
```

Recommended for clarity:

```text
config-builder-db.html?usuario_id=1
```

### 13.3 Edit `usuarios`

Fields to edit:

```text
nombre_es
nombre_en
cedula
photo_src
logo_src
background_src
uid
```

Recommended UI labels:

Spanish:

```text
Nombre
Nombre en inglés
Cédula / Pasaporte
Foto
Logo
Fondo
UID / Identificador
```

English:

```text
Name
English name
ID / Passport
Photo
Logo
Background
UID / Identifier
```

### 13.4 Edit `contactos`

For the selected `usuario_id`, allow:

- List contacts
- Add contact
- Edit contact
- Delete contact
- Save all contacts

Fields:

```text
nombre_es
nombre_en
telefono
```

Recommended UI labels:

Spanish:

```text
Nombre del contacto
Nombre del contacto en inglés
Teléfono
```

English:

```text
Contact name
Contact name in English
Phone
```

### 13.5 Edit `condiciones`

For the selected `usuario_id`, allow:

- List conditions
- Add condition
- Edit condition
- Delete condition
- Save all conditions

Fields:

```text
titulo_es
titulo_en
valor_es
valor_en
```

Recommended UI labels:

Spanish:

```text
Título
Título en inglés
Valor
Valor en inglés
```

English:

```text
Title
English title
Value
English value
```

### 13.6 Save Behavior

The DB builder should not pretend to save if nothing is actually written.

It should:

- Show loading state
- Save to Supabase
- Show success or error
- Log useful debug info during development
- Avoid exposing secrets beyond public anon key

---

## 14. Supabase Client Notes

Current client pattern:

```js
const { createClient } = supabase;

const supabaseClient = createClient(
  'https://xuayajienpmmgzbqbcee.supabase.co',
  'sb_publishable_...'
);
```

Important:

- Supabase anon/publishable key can be public in frontend code.
- Do not put service role keys in frontend code.
- Any sensitive write protection must be enforced with Row Level Security policies.

---

## 15. Recommended Future Public DB-Based `index.html`

A future Supabase-powered public page should do this:

```text
1. Identify which wearer/profile to load.
2. Fetch one row from usuarios.
3. Fetch related rows from contactos.
4. Fetch related rows from condiciones.
5. Map Supabase data into the same internal shape currently used by index.html.
6. Reuse the existing render functions as much as possible.
```

### 15.1 Recommended URL Strategy

Option A:

```text
https://inter-activeid.com/infomed/Erick-Vega/index.html?usuario_id=1
```

Option B:

```text
https://inter-activeid.com/infomed/Erick-Vega/index.html?uid=erick-vega
```

Option C:

Use folder name as slug:

```text
/infomed/Erick-Vega/
```

Then map `Erick-Vega` to `usuarios.uid`.

Recommended for long-term scalability:

```text
uid / slug approach
```

Example:

```text
uid = erick-vega
```

Public URL:

```text
https://inter-activeid.com/infomed/Erick-Vega/index.html
```

The page can infer the slug from the URL path.

### 15.2 Recommended Mapping from Supabase to Current App Config

Build an internal object like:

```js
appConfig = {
  title: `Infomed | Inter-ActiveID, ${usuario.nombre_es}`,
  description: 'Página de emergencia con contactos y envío de ubicación.',
  app_url: window.location.href,
  og_image: 'https://inter-activeid.com/icons/infomed-icon-512x512.png',
  principal: {
    nombre: currentLang === 'en' ? usuario.nombre_en : usuario.nombre_es,
    cedula: usuario.cedula,
    photo_src: usuario.photo_src,
    logo_src: usuario.logo_src,
    background_src: usuario.background_src
  },
  contacts: contactos.map(contacto => ({
    key: `contacto_${contacto.id}`,
    nombre: currentLang === 'en' ? contacto.nombre_en : contacto.nombre_es,
    telefono: contacto.telefono
  })),
  conditions: condiciones.map(condicion => ({
    title: currentLang === 'en' ? condicion.titulo_en : condicion.titulo_es,
    value: currentLang === 'en' ? condicion.valor_en : condicion.valor_es
  }))
};
```

---

## 16. Recommended Supabase Query Flow for Public Page

Conceptual code:

```js
async function loadFromSupabaseByUid(uid){
  const { data: usuario, error: userError } = await supabaseClient
    .from('usuarios')
    .select('*')
    .eq('uid', uid)
    .single();

  if(userError) throw userError;

  const { data: contactos, error: contactsError } = await supabaseClient
    .from('contactos')
    .select('*')
    .eq('usuario_id', usuario.id)
    .order('id', { ascending: true });

  if(contactsError) throw contactsError;

  const { data: condiciones, error: conditionsError } = await supabaseClient
    .from('condiciones')
    .select('*')
    .eq('usuario_id', usuario.id)
    .order('id', { ascending: true });

  if(conditionsError) throw conditionsError;

  return { usuario, contactos, condiciones };
}
```

Do not implement blindly without confirming actual RLS policies and exact table/column names.

---

## 17. Row Level Security RLS Considerations

For a public emergency page, some data must be readable publicly, otherwise the page will not work without login.

Recommended model:

```text
Public SELECT for emergency data.
Protected writes.
```

Possible policy model:

```text
Allow public SELECT on published/active profiles.
Allow authenticated INSERT/UPDATE/DELETE for authorized owner/admin only.
```

Not recommended:

```text
Auth required for everything.
```

Problem:

- A stranger scanning the QR during an emergency would not be able to see the page.

Important:

If there is sensitive medical information, decide carefully how much should be publicly visible.

---

## 18. Supabase Builder Save Strategy

There are two common strategies for contacts and conditions.

### 18.1 Simple Delete-and-Reinsert

For a selected `usuario_id`:

1. Update `usuarios`
2. Delete old `contactos` for `usuario_id`
3. Insert current contacts array
4. Delete old `condiciones` for `usuario_id`
5. Insert current conditions array

Pros:

- Simple
- Good for small lists
- Avoids complex diff logic

Cons:

- Changes IDs each save unless preserving them
- Requires DELETE permission
- Not ideal if audit history matters

### 18.2 Upsert Per Row

For each contact/condition:

- Update if existing `id`
- Insert if no `id`
- Delete rows removed from UI

Pros:

- Preserves IDs
- More precise

Cons:

- More code
- More edge cases

Recommendation for initial builder:

```text
Use simple delete-and-reinsert unless preserving row IDs matters.
```

---

## 19. Migration Plan from JSON to Supabase

### Phase 1 — Keep JSON Working

Do not break current public pages.

Keep:

```text
index.html
config.json
config-builder.html
```

Working until Supabase version is fully tested.

### Phase 2 — Build DB Builder

Upgrade or replace:

```text
config-builder-db.html
```

So it can actually:

```text
- authenticate
- load usuarios
- edit selected usuario
- edit contactos
- edit condiciones
- save to Supabase
```

### Phase 3 — Insert Existing JSON Data into Supabase

For each current person:

1. Create a row in `usuarios`
2. Create related rows in `contactos`
3. Create related rows in `condiciones`

Example for Erick:

`usuarios`:

```text
nombre_es: Erick Vega Zúñiga
nombre_en: Erick Vega Zúñiga
cedula: Ced: 108170227
photo_src: ./Erick-Vega.png
logo_src: ../infomed.svg
background_src: ../bg01.jpg
uid: erick-vega
```

`contactos`:

```text
usuario_id: Erick's usuarios.id
nombre_es/nombre_en: Jorling Oporta
telefono: 86893803
...
```

`condiciones`:

```text
usuario_id: Erick's usuarios.id
titulo_es/titulo_en
valor_es/valor_en
```

### Phase 4 — Build DB-Based Public Page

Create a test version first, for example:

```text
index-db.html
```

Do not replace production `index.html` immediately.

### Phase 5 — Test

Test:

```text
index-db.html?uid=erick-vega
```

Confirm:

- Name appears
- Photo appears
- 4+ contacts render
- Conditions render
- Spanish/English switch works
- WhatsApp works
- Location button works
- Call button works
- Mobile layout works
- Incognito works
- No login required for public emergency page

### Phase 6 — Replace Production

Only after testing:

```text
index.html → DB-based version
```

Keep fallback or backup:

```text
index-json-backup.html
config.json backup
```

---

## 20. Recommended Fallback Strategy

For emergency pages, it is wise to keep a fallback.

Option:

```text
Try Supabase first.
If Supabase fails, load config.json.
If config.json fails, use defaultConfig.
```

Conceptual flow:

```js
try {
  appConfig = await loadSupabaseConfig();
} catch (supabaseError) {
  try {
    appConfig = await loadJsonConfig();
  } catch (jsonError) {
    appConfig = defaultConfig;
    showStatusMessage(t('configFallbackWarning'));
  }
}
```

This keeps the emergency page usable even if Supabase has a temporary issue.

---

## 21. Email Automation Context: Zoho, Brevo, Supabase

Current email transition context:

- Zoho Mail is being configured for domain email.
- Brevo is intended for transactional/automatic email sending.
- Supabase will use SMTP settings to send auth emails or automated emails.

Important distinction:

```text
Zoho Mail  = mailbox / receive domain email
Brevo      = transactional SMTP sending
Supabase   = application using SMTP to send emails
```

### 21.1 DNS Records

MX records are for the root domain:

```text
inter-activeid.com
```

Not normally:

```text
www.inter-activeid.com
```

`www` is for web.  
MX is for domain email like:

```text
info@inter-activeid.com
admin@inter-activeid.com
```

### 21.2 Current DNS / Nameserver Situation

The domain was purchased through 123ehost.

123ehost said current active nameservers are:

```text
dns1.name-services.com
dns2.name-services.com
dns3.name-services.com
```

That means DNS records must be edited wherever those nameservers are managed.

Important:

- Do not ask GitHub to add MX.
- GitHub only hosts the page.
- Ask 123ehost or the registrar DNS provider to add DNS records or provide DNS zone access.

### 21.3 Do Not Change Nameservers Casually

Current website relies on GitHub Pages A records:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

If nameservers are changed without copying existing A/CNAME records, the website can go down.

---

## 22. Recommended Message to 123ehost

Use this if DNS confusion continues:

```text
Hi 123ehost team,

Thank you for checking.

Since I purchased inter-activeid.com through 123ehost and the active nameservers are:

dns1.name-services.com
dns2.name-services.com
dns3.name-services.com

Could you please confirm where the DNS zone for inter-activeid.com is managed?

Previously, your team added the GitHub Pages A records for me, so I would like to know whether you can also add the Zoho Mail DNS records, or if I need access to a separate DNS management panel.

Just to clarify, I need to add MX/TXT/CNAME records for the root domain inter-activeid.com, not for www.inter-activeid.com.

Thank you.
```

---

## 23. Open Questions for the Next Chat

Before coding the Supabase version, confirm:

1. Exact Supabase table names:
   - Are they exactly `usuarios`, `contactos`, `condiciones`?

2. Exact column names:
   - Confirm all columns from screenshot.
   - Confirm data types.

3. Does `usuarios.uid` mean:
   - Supabase Auth user ID?
   - Public slug?
   - Something else?

4. What public URL strategy should be used?
   - Folder name?
   - `?uid=erick-vega`
   - `?usuario_id=1`

5. Should the public page use Supabase only, or Supabase with JSON fallback?

6. Should emergency data be publicly readable?
   - Likely yes, because QR bracelet pages must work without login.

7. Should `config-builder-db.html` create new profiles or only edit existing ones?

8. Should each person still have a folder, or should one generic page serve all profiles?

Recommended long-term architecture:

```text
One generic DB-powered Infomed page + profile slug
```

But short-term, preserving current folder structure is safer.

---

## 24. Recommended Next Development Task

The next real coding task should be:

```text
Create a real config-builder-db.html for the current Supabase schema:
usuarios, contactos, condiciones.
```

It should:

```text
- sign in
- select or load one usuario
- edit usuario fields
- list/add/remove/edit contactos
- list/add/remove/edit condiciones
- save to Supabase
- show clear success/error states
```

Do not start by changing the public `index.html` to Supabase. Build and test the DB builder first.

Then create:

```text
index-db.html
```

for testing Supabase public rendering.

Only after both work should production `index.html` be replaced.

---

## 25. Minimal Test Checklist for Any Future Change

After any change to `index.html`:

```text
1. Open normal browser.
2. Open incognito.
3. Confirm Spanish loads.
4. Toggle to English.
5. Confirm "Name" appears, not "Person name".
6. Confirm n/ñ toggle icon works.
7. Confirm all contacts render.
8. Confirm all conditions render.
9. Test WhatsApp button.
10. Test call button.
11. Test location button.
12. Test mobile viewport.
13. Test cache-buster URL: index.html?v=next.
14. Check console for JavaScript errors.
```

After any change to `config-builder.html`:

```text
1. Load current config.json.
2. Add one contact.
3. Add one condition.
4. Download config.json.
5. Replace server config.json.
6. Open index.html in incognito.
7. Confirm new contact appears.
8. Confirm new condition appears.
```

After any change to `config-builder-db.html`:

```text
1. Sign in.
2. Load one usuario.
3. Edit name.
4. Add contact.
5. Add condition.
6. Save.
7. Refresh builder.
8. Confirm data persisted.
9. Check Supabase table directly.
10. Test public DB page if available.
```

---

## 26. Final Working Summary

Current stable production approach:

```text
index.html loads config.json.
config-builder.html generates config.json.
service-worker.js does not cache.
contacts and conditions are dynamic arrays.
language toggle uses inline n/ñ SVG.
English label should be "Name".
script_check.js is not production.
```

Target Supabase approach:

```text
Supabase stores usuarios, contactos, condiciones.
config-builder-db.html manages Supabase data.
Future index-db.html reads Supabase and renders emergency page.
Production index.html should only move to Supabase after DB builder and public DB rendering are tested.
```

Main rule:

```text
Keep the JSON version working until the Supabase version is fully proven.
```
