# MASTER SOP — CREATE A NEW INTER-ACTIVEID BUSINESS CARD

## 1. PURPOSE

Use this document to create a new interactive digital business card and promotional landing page based on the existing Inter-ActiveID system.

The process always involves up to three projects:

1. **Functional source template**
   - Usually the latest production version of Inter-ActiveID.
   - This is the source of truth for behavior and features.
   - Its current HTML, CSS, JavaScript, PWA behavior, sharing logic, local storage, QR integration, contact handling, language switching, and installation logic must be preserved unless a change is explicitly requested.

2. **Visual reference project**
   - This can be Materia Arquitectura or any other existing digital business card.
   - It is used only as a visual and content-structure reference.
   - Its colors, typography, card shapes, backgrounds, spacing, visual hierarchy, accordion style, profile presentation, decorative elements, and general appearance may be reused.
   - Its older or incomplete functionality must not replace the newer Inter-ActiveID functionality.

3. **New target business**
   - This is the new business card project to be created.
   - It must combine:
     - Inter-ActiveID functionality.
     - The selected visual reference style.
     - The new business's branding, text, contact data, assets, URLs, icons, and PWA configuration.

---

## 2. NON-NEGOTIABLE WORKING RULES

### 2.1 Source-of-truth rules

- Always inspect the latest actual files.
- Never rely on memory, old ZIPs, previous versions, screenshots alone, or assumptions.
- The latest uploaded or provided file is the source of truth.
- Before editing, identify:
  - The current functional source project.
  - The current visual reference project.
  - The target project.
- Never mix files from unrelated versions without verifying them line by line.
- Never invent file names, folder names, variables, storage keys, database fields, routes, or URLs.

### 2.2 Stability rules

- Do not break working functionality.
- Make focused and minimal changes.
- Preserve working:
  - WhatsApp integration.
  - QR generation and QR destinations.
  - Language switching.
  - Local contact storage.
  - Contact editing.
  - Contact deletion.
  - Contact-list export.
  - Message editing.
  - Message locking.
  - Country selection.
  - Country search.
  - Country-code handling.
  - Automatic country detection.
  - Native Web Share API support.
  - PWA manifest.
  - Add-to-home-screen behavior.
  - Service-worker registration.
  - vCard download.
  - Social accordion behavior.
  - Closed accordion behavior.
  - Responsive layout.
  - Existing accessibility behavior.

### 2.3 No-caching rule

- Use a non-caching service worker unless the user explicitly requests caching.
- The service worker may:
  - Register.
  - Install.
  - Activate.
  - Claim clients.
- It must not:
  - Use `caches.open`.
  - Add files to Cache Storage.
  - Intercept `fetch` requests for caching.
  - Provide offline caching.
  - Serve stale assets.
- When browser output does not match code:
  - Test in incognito mode.
  - Perform a hard refresh.
  - Use a cache-busting query string such as `?v=2`.
  - Check for an old registered service worker.
  - Unregister the old service worker if necessary.

### 2.4 Shared icon rules

Shared SVG icons already exist outside each business project.

Use paths such as:

```html
../svgicons/facebook.svg
../svgicons/instagram.svg
../svgicons/whatsapp.svg
../svgicons/share-white.svg
../svgicons/homescreen.svg
```

Do not include or recreate shared SVG icons inside the project ZIP.

Shared PWA/browser icons also exist outside each project.

Use paths such as:

```html
../icons/BusinessName-icon-192x192.png
../icons/BusinessName-icon-512x512.png
```

Do not include or recreate shared PWA icons inside the project ZIP.

The final ZIP for the new business must contain only the files inside the target business folder.

### 2.5 Technical naming rules

- Visible labels may change without changing technical fields.
- Never rename JavaScript variables, local-storage keys, JSON keys, database columns, or API fields just because visible text changes.
- Example:
  - Visible label can change from `Person name` to `Name`.
  - Internal key should remain unchanged unless there is a real technical reason.
- If storage keys are renamed:
  - Use a deliberate migration.
  - Preserve previous user data when needed.
- Each business must use its own local-storage namespace to prevent conflicts.

Example:

```js
const STORAGE_PREFIX = "lumi";
```

Possible keys:

```text
lumiLanguage
lumiSavedContactsText
lumiCountryIso2
lumiCountryLocked
lumiMessageManualText
lumiMessageManuallyEdited
lumiMessageLocked
lumiMessageBakedPhone
```

Do not reuse Inter-ActiveID or Materia keys in a new business unless explicitly requested.

---

## 3. REQUIRED INPUTS

Before building the target project, obtain the following.

### 3.1 Functional source files

Request the latest functional source ZIP or folder containing, at minimum:

```text
index.html
IAID-share.html
manifest.json
service-worker.js
```

Also inspect any related:

```text
css/
js/
assets/
images/
documents/
```

### 3.2 Visual reference files

Request the latest visual reference ZIP or folder.

Identify:

- Main landing page.
- Sharing page.
- Logo.
- Profile image.
- Background images.
- Decorative SVG files.
- Fonts.
- Color variables.
- Button styles.
- Accordions.
- Spacing and responsive behavior.

### 3.3 Target business information

Collect:

- Business name.
- Public display name.
- Contact person's name.
- Job title or role.
- Phone number.
- WhatsApp number.
- Normalized WhatsApp number without spaces or punctuation.
- Email.
- Website.
- Public project URL.
- Local project folder.
- Logo filename.
- Profile image filename.
- vCard filename.
- Brand colors.
- Preferred language.
- Secondary language.
- Social links.
- Social links that are not available yet.
- Accordion titles and content.
- QR target URL.
- PWA icon paths.
- PWA short name.
- PWA full name.
- Theme color.
- Background color.

### 3.4 Asset validation

Confirm that each referenced asset actually exists.

Do not generate placeholder references to files that were not provided.

If an asset will be added later:

- Keep the code valid.
- Use a clearly identified temporary state.
- Do not invent a fake asset file.
- Do not create broken `<img>` references.

---

## 4. ROLE SELECTION

For every request, automatically choose the best role or roles.

Available roles:

- Senior Front-End Engineer & UX Writer
- Accessibility Engineer
- Performance Architect
- Search UX Engineer
- UI Theming/Design Systems Stylist
- QA Tester
- Neuroscience and Web Funnel Expert

Typical selection:

- Primary:
  - Senior Front-End Engineer & UX Writer
- Secondary:
  - UI Theming/Design Systems Stylist
  - Accessibility Engineer
  - Performance Architect
  - QA Tester

Add Search UX Engineer when working on:

- Country search.
- Contact search.
- Filters.
- Highlighting.
- Query matching.

Add Neuroscience and Web Funnel Expert when working on:

- Lead conversion.
- Call-to-action placement.
- Trust-building.
- Booking funnels.
- WhatsApp conversion.
- Service presentation.
- User decision paths.

---

## 5. ANALYSIS PHASE

Before changing code, create a comparison map.

### 5.1 Functional source map

Document:

- Page responsibilities.
- Main files.
- JavaScript modules.
- CSS modules.
- Storage keys.
- Manifest paths.
- Service-worker path.
- QR targets.
- WhatsApp targets.
- Shared icon paths.
- vCard paths.
- Language mechanism.
- Add-to-home-screen mechanism.
- Country detection provider.
- External dependencies.

### 5.2 Visual reference map

Document:

- Main background.
- Primary color.
- Secondary color.
- Accent color.
- Text color.
- Muted text color.
- Card radius.
- Button radius.
- Shadows.
- Typography.
- Logo size.
- Profile image treatment.
- Accordion treatment.
- CTA hierarchy.
- Mobile behavior.
- Desktop behavior.

### 5.3 Target mapping table

Create a mapping similar to:

| Functional element | Functional source | Visual source | Target result |
|---|---|---|---|
| WhatsApp sharing | Inter-ActiveID | Ignore old logic | Preserve latest logic |
| Primary button | Inter-ActiveID behavior | Materia style | New business colors |
| Country picker | Inter-ActiveID | Materia form style | Preserve logic, restyle |
| Social accordion | Inter-ActiveID | Materia accordion style | Keep expanded |
| Closed accordion | Inter-ActiveID | Materia accordion style | Keep one sample |
| PWA | Inter-ActiveID | Target branding | New manifest |
| Service worker | Non-caching source | Not applicable | Non-caching |
| Contact storage | Inter-ActiveID | Not applicable | Target-specific keys |

---

## 6. TARGET FILE STRUCTURE

Use this structure unless the latest source files prove that another structure is required.

```text
Target-Business/
├── index.html
├── IAID-share.html
├── manifest.json
├── service-worker.js
│
├── assets/
│   ├── documents/
│   │   └── Contact-Name.vcf
│   │
│   └── images/
│       ├── Contact-Name.jpg
│       ├── Business-Logo.svg
│       ├── QR_code.png
│       ├── QR_code.svg
│       └── background.svg
│
├── css/
│   ├── styles.css
│   └── share.css
│
└── js/
    ├── app.js
    ├── install.js
    ├── language.js
    └── share.js
```

Do not add:

```text
icons/
svgicons/
```

inside the project when they are shared at repository root.

---

## 7. LANDING PAGE REQUIREMENTS

The target `index.html` should include the following when available.

### 7.1 Metadata

- Correct page title.
- Correct description.
- Correct canonical/public URL when used.
- Correct social-preview metadata.
- Correct theme color.
- Correct favicon.
- Correct Apple touch icon.
- Correct manifest path.

Example:

```html
<link rel="icon" type="image/png" sizes="192x192"
      href="../icons/Business-icon-192x192.png">

<link rel="apple-touch-icon"
      href="../icons/Business-icon-192x192.png">

<link rel="manifest" href="./manifest.json">
```

### 7.2 Main identity

- Business logo.
- Contact photo.
- Contact name.
- Position.
- Business name.
- Business description.
- Primary CTA.
- WhatsApp CTA.
- Email CTA.
- vCard download.
- QR access.
- Share page access.

### 7.3 Accordion requirements

Keep:

1. One expanded accordion for social/contact links.
2. One closed accordion as a sample content section.

When social links do not exist:

- Do not add fake links.
- Show a controlled disabled or “Coming soon” state.
- Keep WhatsApp or email active if available.
- Disabled controls must not navigate.
- Disabled controls must remain accessible.

### 7.4 Shared icon paths

Use the existing shared icon paths.

Example:

```html
<a href="SOCIAL_URL"
   target="_blank"
   rel="noopener noreferrer"
   aria-label="Facebook">
  <img src="../svgicons/facebook.svg" alt="">
</a>
```

Example for share button:

```html
<img class="iaid-icon"
     src="../svgicons/share-white.svg"
     alt=""
     aria-hidden="true">
```

Example for home-screen button:

```html
<img class="iaid-icon"
     src="../svgicons/homescreen.svg"
     alt=""
     aria-hidden="true">
```

---

## 8. SHARE PAGE REQUIREMENTS

The target `IAID-share.html` must preserve all current Inter-ActiveID sharing features.

### 8.1 Contact form

Include:

- Full name.
- Country selection.
- Searchable country list.
- Country code.
- Phone number.
- Message textarea.
- Reset button.
- Message lock.
- WhatsApp send button.
- Native share button.

### 8.2 Country behavior

Preserve:

- Country list.
- Search.
- Country ISO code.
- Dialing prefix.
- Automatic detection.
- Browser-locale fallback.
- Manual country lock.
- Validation.
- Mobile usability.

Country options must have readable contrast.

Never use a text color that becomes invisible on the selected background.

### 8.3 Message behavior

Preserve:

- Default bilingual message generation.
- Name interpolation.
- Public card URL.
- Manual editing.
- Manual lock.
- Reset to default.
- Persistence.
- Correct update behavior when name, country, phone, or language changes.

### 8.4 WhatsApp behavior

Normalize numbers:

```js
function normalizePhone(value) {
  return value.replace(/\D/g, "");
}
```

Use:

```text
https://wa.me/NUMBER?text=ENCODED_MESSAGE
```

Do not include:

- Spaces.
- Parentheses.
- Dashes.
- A leading plus sign.

### 8.5 Public URL behavior

Do not hardcode a local Windows file path.

Preferred logic:

```js
function getCardUrl() {
  return new URL("./index.html", window.location.href).href;
}
```

When testing from `file:///`, the result will be a local URL.

When deployed, it must resolve to the public HTTPS URL.

If a fixed production URL is required, define it in the business configuration and use it explicitly.

### 8.6 Contact storage

Preserve:

- Save contact.
- Contact count.
- Editable list.
- Confirmation modal.
- Local persistence.
- Clear list.
- Send list to the owner's WhatsApp.
- Correct target-specific storage keys.

### 8.7 QR behavior

Preserve the current QR implementation.

The QR must point to the target business landing page.

Do not regenerate a working QR unless the target URL changes.

---

## 9. LANGUAGE REQUIREMENTS

Support Spanish and English unless the user requests otherwise.

Preserve:

- Language buttons.
- Selected-language state.
- `localStorage` persistence.
- Correct `<html lang="">`.
- Dynamic page title.
- Dynamic placeholders.
- Dynamic validation messages.
- Dynamic WhatsApp messages.
- Dynamic contact-list labels.
- Dynamic modal text.

Recommended language keys:

```text
es
en
```

Recommended HTML values:

```text
es-419
en
```

Do not mix languages unintentionally.

---

## 10. PWA REQUIREMENTS

### 10.1 Manifest

Create a target-specific `manifest.json`.

Required fields:

```json
{
  "name": "Business Full Name",
  "short_name": "Business",
  "start_url": "./index.html",
  "scope": "./",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#000000",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "../icons/Business-icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "../icons/Business-icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

Validate all paths against the actual deployed folder structure.

### 10.2 Non-caching service worker

Use a minimal service worker:

```js
self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});
```

Do not add a `fetch` handler unless the user explicitly requests one.

### 10.3 Registration

Use a relative path:

```js
navigator.serviceWorker.register("./service-worker.js");
```

Do not hardcode another business folder.

---

## 11. DESIGN TRANSFER RULES

The visual reference controls appearance, not functionality.

Safe to transfer:

- Colors.
- Font families.
- Font weights.
- Button shapes.
- Card radius.
- Shadows.
- Background.
- Decorative SVGs.
- Spacing.
- Profile image border.
- Accordion appearance.
- Layout proportions.
- CTA hierarchy.

Do not transfer blindly:

- Old JavaScript.
- Old local-storage keys.
- Old hardcoded URLs.
- Old service-worker caching.
- Old manifest paths.
- Old phone numbers.
- Old email addresses.
- Old QR targets.
- Old contact notification numbers.
- Old broken icon paths.
- Old accessibility issues.
- Old validation logic.

---

## 12. ACCESSIBILITY REQUIREMENTS

Meet practical WCAG 2.2 AA expectations.

Check:

- Text contrast.
- Button contrast.
- Focus visibility.
- Keyboard navigation.
- Accordion keyboard behavior.
- Modal Escape behavior.
- Modal focus behavior.
- Labels attached to fields.
- `aria-live` for status messages.
- Decorative icons use empty `alt`.
- Functional images have meaningful `alt`.
- Disabled links are not falsely interactive.
- Touch targets are large enough.
- Inputs are usable at 200% zoom.
- No horizontal scrolling on mobile.

---

## 13. PERFORMANCE REQUIREMENTS

- Avoid unnecessary dependencies.
- Avoid unnecessary frameworks.
- Avoid unnecessary caching.
- Avoid repeated event listeners.
- Use small named functions.
- Minimize global state.
- Use relative paths.
- Keep assets optimized.
- Use SVG for logos when available.
- Use PNG for PWA icons.
- Do not load hidden assets unnecessarily.
- Do not rewrite working code merely to make it look modern.

---

## 14. REQUIRED QA PROCESS

### 14.1 Static validation

Verify:

- Every referenced file exists.
- Every local path resolves.
- No missing icons.
- No old-business names.
- No old-business phones.
- No old-business email addresses.
- No old-business URLs.
- No old storage keys.
- No old manifest names.
- No cached service-worker logic.
- No accidental `file:///` hardcoding.
- No placeholder text unless explicitly marked.

### 14.2 Functional validation

Test:

1. Landing page loads.
2. Logo and profile image load.
3. Spanish/English switch works.
4. Language persists after reload.
5. Accordion opens and closes.
6. Social links behave correctly.
7. WhatsApp opens the right number.
8. Email opens the right address.
9. vCard downloads.
10. QR opens the right public page.
11. Share page opens.
12. Country search works.
13. Country selection updates code.
14. Phone validation works.
15. Default message updates.
16. Manual message editing works.
17. Message lock works.
18. Reset works.
19. Contact saves.
20. Contact list persists.
21. Contact list editing works.
22. Contact list clearing works.
23. Contact-list WhatsApp export works.
24. Native share works where supported.
25. Add-to-home-screen flow works.
26. Service worker registers.
27. Cache Storage stays empty.
28. Mobile layout works.
29. Desktop layout works.
30. No console errors appear.

---

## 15. REQUIRED DELIVERY FORMAT

The AI must return:

### Role Selected

State the primary and secondary roles.

### Plan

Provide 3–6 concise bullets.

### Assumptions/Questions

Only include this section when needed.

Maximum 3 questions.

### Deliverable

Provide:

- A complete ZIP containing only the target project folder.
- No shared `icons` directory.
- No shared `svgicons` directory.
- No placeholders.
- No omitted code.
- No `...`.
- No partial replacement unless explicitly requested.

### Changelog

State:

- Files created.
- Files modified.
- Functions preserved.
- Visual changes.
- Path changes.
- Storage-key changes.
- Manifest changes.
- Service-worker changes.
- Contact-data changes.

### Manual Test Checklist

Provide 5–8 quick tests for the user.

---

## 16. REQUIRED AI RESPONSE TEMPLATE

Use this exact structure:

```text
Role Selected:
Primary role
Secondary roles

Plan:
- ...
- ...
- ...

Assumptions/Questions:
- Only when necessary.
- Maximum 3.

Download:
[Download the complete project](sandbox-link-or-equivalent)

Project folder:
...

Public URL:
...

File structure:
...

Changelog:
- ...
- ...

Manual Test Checklist:
1. ...
2. ...
3. ...
```

---

## 17. BUSINESS CONFIGURATION WORKFLOW

Before coding:

1. Fill out `business-config.template.json`.
2. Validate all required values.
3. Compare the functional source and visual source.
4. Create a target mapping.
5. Build the target folder.
6. Test all paths.
7. Test all functionality.
8. Create the ZIP.
9. Provide the changelog.
10. Provide the manual checklist.

---

## 18. FINAL SAFETY CHECK

Before delivering, answer all of these internally:

- Did I inspect the latest source files?
- Did I preserve all current Inter-ActiveID functions?
- Did I use the visual reference only for style?
- Did I avoid copying old broken functionality?
- Did I use the correct target contact data?
- Did I use the correct public URL?
- Did I use target-specific storage keys?
- Did I keep the service worker non-caching?
- Did I reference shared icons correctly?
- Did I avoid bundling shared icons?
- Did I include the real vCard?
- Did I include the real profile image?
- Did I verify QR destinations?
- Did I verify every local path?
- Did I remove all old-business references?
- Did I test mobile and desktop behavior?
- Did I produce a complete ZIP?

Do not deliver until every applicable item is confirmed.