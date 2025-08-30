# Especificación técnica — Invitación de boda (Paola & Giancarlo)

> **Objetivo**: Documento de referencia para **reproducir**, **configurar** y **continuar desarrollando** la invitación.  
> **Stack**: HTML5 + CSS3 + JavaScript (vanilla). Fuentes: *Quicksand* (base) y *Pinyon Script* (títulos).  
> **Modo de configuración dinámica**: `config.json` + `config-loader.js` (esta versión ya lo incorpora).

---

## 0) Estructura de carpetas recomendada

```
/ (raíz del proyecto)
├─ index.html
├─ config.json                ← datos editables (antes: config-template.json)
├─ config-loader.js           ← carga config.json y expone window.RUNTIME_CONFIG
├─ audio/
│  └─ song.mp3  (opcional: song.m4a / song.ogg)
└─ img/
   ├─ couple-logo.svg
   ├─ couple-hero.jpg
   ├─ couple-left.jpg
   ├─ couple-right.jpg
   ├─ couple-hero2.jpg
   ├─ decor-100.svg
   └─ programa.svg
```

> **Servir por HTTP** (no `file://`): p. ej. `python -m http.server 5500` en Windows/PowerShell.

---

## 1) Identidad visual / Tokens de diseño

- **Colores**:  
  - Fondo: `#F3F2EE` (rgba(243,242,238,255))  
  - Tarjetas: `#FBFAF8` (rgba(251,250,248,255))  
  - Texto: `#2A2A2A`; Muted: `#696969`; Borde sutil: `rgba(0,0,0,0.08)`
- **Sombras y radios**:  
  - Sombra global: `0 8px 24px rgba(0,0,0,.08)`  
  - Radio tarjetas: **15px**  
  - **Fotos grandes** (hero, left, right, hero2): **18px** y `overflow: hidden`
- **Fuentes**: Quicksand (300/400/600) y Pinyon Script.
- **Sombra del título (mejora legibilidad)**:
  ```css
  .hero .names .script{
    color: rgb(251,250,248);
    text-shadow:
      0 3px 10px rgba(0,0,0,1),
      1px 0 1px rgba(0,0,0,1),
      -1px 0 1px rgba(0,0,0,1),
      0 1px 1px rgba(0,0,0,1),
      0 -1px 1px rgba(0,0,0,1),
      0 0 18px  rgba(0,0,0,.85);
    font-size: clamp(34px, 6vw, 72px);
    line-height: 1.1;
  }
  ```

---

## 2) Comportamiento y secciones

- **Hero**: imagen principal con **fade-in 2s**; nombres sobre la imagen con 2 animaciones en paralelo (fade + rise) con **delay 4s** tras cargar el hero.  
- **Fecha visible** bajo el hero (texto legible).  
- **Countdown** a la fecha ISO; en **móvil**: 4 columnas en una fila.  
- **Imágenes fly-in** izquierda/derecha al entrar en viewport.  
- **Programa** como SVG 100% ancho.  
- **Mensaje “solo adultos”** con foto y tarjeta.  
- **Vestimenta** con decorativo.  
- **RSVP**: formulario accesible (Nombre + Cantidad ≥ 1, sin tope por defecto), WhatsApp con pluralización.

---

## 3) Control de audio (dual)

- **Desktop**: cápsula fija con botón + switch.  
- **Móvil**: botón único compacto (▶/⏸).  
- `<audio>` con `loop` y fuentes recomendadas: `song.mp3` (y opcional `song.m4a`/`song.ogg`).  
- Manejo de errores `MediaError` y restricciones de autoplay (requiere interacción).

---

## 4) Navegación (Cómo llegar)

- **Deep links** con fallback web:  
  - **Waze**: `waze://?q={{query}}&navigate=yes` → `https://waze.com/ul?q={{query}}&navigate=yes`
  - **Google Maps**: `google.navigation:q={{query}}` → `https://www.google.com/maps/dir/?api=1&destination={{query}}&travelmode=driving`
- Funciona con **Plus Codes** (ej. `R398+W5Q`) o **coordenadas** `lat,long` (recomendado si Waze falla).
- Los botones por sección (`Ceremonia`, `Recepción`) usan `data-nav` y `data-query` que el loader/JS actualizan desde `config.json`.

---

## 5) Configuración dinámica con config.json

### 5.1 Campos soportados (ejemplo base)
```json
{{
  "title": "Invitación de boda — Paola & Giancarlo",
  "couple": {{"bride":"Paola Arias","groom":"Giancarlo Álvarez","display":"Paola & Giancarlo"}},
  "date": {{"iso":"2025-10-25T10:00:00-06:00","readable":"25 de octubre de 2025 • 10:00 a. m."}},
  "rsvp": {{"deadline":"10 de octubre de 2025","phone":"50660032092"}},
  "church": {{"label":"Iglesia católica de Paquera","query":"R398+W5Q, Provincia de Puntarenas, Paquera"}},
  "reception": {{"label":"Bella Vista House — Paquera","query":"V3X7+MF, Provincia de Puntarenas, Gigante"}},
  "assets": {{
    "logo":"img/couple-logo.svg",
    "hero":"img/couple-hero.jpg",
    "left":"img/couple-left.jpg",
    "right":"img/couple-right.jpg",
    "hero2":"img/couple-hero2.jpg",
    "decor":"img/decor-100.svg",
    "program":"img/programa.svg",
    "audio":["audio/song.mp3","audio/song.m4a","audio/song.ogg"]
  }},
  "flags": {{"limitGuests": false, "maxGuests": null, "reducedMotionDefault": false}},
  "theme": {{"bg":"#F3F2EE","card":"#FBFAF8","radius":15,"photoRadius":18}}
}}
```

### 5.2 Qué controla cada campo
- `couple.display` → Título sobre el hero + texto del mensaje de WhatsApp.  
- `date.iso` → Fecha/hora real del evento (**countdown**).  
- `date.readable` → Texto visible bajo el hero.  
- `rsvp.phone` → Teléfono destino para WhatsApp.  
- `church.* / reception.*` → Textos y destino Waze/Maps.  
- `assets.*` → Rutas de imágenes/SVG y fuentes de audio.  
- `flags.limitGuests/maxGuests` → Límite opcional en el input de cantidad.  
- `theme.*` → Tokens visuales (si decides aplicarlos desde JS/CSS más adelante).

### 5.3 Loader (config-loader.js)
- Hace `fetch('config.json')` y guarda el objeto en `window.RUNTIME_CONFIG`.  
- Actualiza **DOM** básico: nombres, fecha legible, labels de lugares y `data-query` en botones Waze/Maps; también `src` de imágenes si cambian.  
- Expone `window.getConfig()` por conveniencia.

> Requiere servir por **HTTP**; en `file://` fetch se bloquea.

### 5.4 Uso en `index.html`
- En `<head>`:
  ```html
  <script src="config-loader.js" defer></script>
  ```
- En el **script principal** (ya aplicado en esta versión), las constantes leen de `window.RUNTIME_CONFIG`:
  ```js
  const CFG = window.RUNTIME_CONFIG || {};
  const WEDDING_TITLE    = CFG.couple?.display ?? "Paola y Giancarlo";
  const WEDDING_DATE_ISO = CFG.date?.iso ?? "2025-10-25T10:00:00-06:00";
  const RSVP_PHONE       = CFG.rsvp?.phone ?? "50660032092";
  // ... CHURCH, RECEPTION, RSVP_MAX ...
  ```

### 5.5 Flujo de trabajo
1. Edita **config.json** (nombres/fecha/lugares/teléfono/medios).  
2. Guarda y recarga fuerte (**Ctrl/Cmd + Shift + R**).  
3. Verifica en consola: `window.RUNTIME_CONFIG` debe reflejar los cambios.  
4. El **countdown**, WhatsApp y los botones de navegación usarán los nuevos valores.

---

## 6) Accesibilidad (A11Y) y UX

- `prefers-reduced-motion`: desactiva animaciones/transiciones.  
- Botones con `:focus-visible`, contraste, y áreas táctiles adecuadas.  
- Formulario RSVP con `aria-describedby`, `aria-invalid`, mensajes con `aria-live`.  
- Imágenes con **alt** genérico **editable**.

---

## 7) Rendimiento

- Imágenes no críticas con `loading="lazy"` y `decoding="async"`.  
- Animaciones solo on-view (`IntersectionObserver`).  
- Sin AVIF/WebP (se prioriza JPG/PNG/SVG por decisión del proyecto).

---

## 8) Troubleshooting

- **`fetch('config.json')` falla** → Asegúrate de servir por HTTP (no `file://`).  
- **Cambios no se ven** → Forzar recarga (**Ctrl/Cmd + Shift + R**), OneDrive puede demorar sincronización.  
- **Deep links Waze no abren** → Cambia `query` por **coordenadas** `lat,long`.  
- **Audio no suena** → Asegúrate de interacción del usuario, formato soportado, y que el archivo exista en `/audio/`.

---

## 9) Historial de mejoras integradas
- Migración de logo a **SVG**.  
- Sombra del título sobre hero (multicapa).  
- Control de audio **dual** (desktop/móvil).  
- Animación de nombres: **fade + rise** con **delay 4s** tras carga del hero.  
- **Countdown** en 1 fila en móvil.  
- Deep links **Waze/Maps** con fallback web.  
- Bordes redondeados unificados (18px) en fotos grandes.  
- `overflow-x` oculto (evita scroll horizontal).  
- RSVP accesible, **sin tope** y pluralización WhatsApp.  
- **NUEVO**: configuración dinámica con `config.json` + `config-loader.js`.


**Última actualización:** 2025-08-30 05:01:12
