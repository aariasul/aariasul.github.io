# Especificación técnica — Invitación de boda (Paola & Giancarlo)

> **Objetivo**: Documento de referencia para **reproducir** o **continuar desarrollando** la invitación sin perder detalles.  
> **Stack**: HTML5 + CSS3 + JavaScript (vanilla). Fuentes de Google: *Quicksand* (base) y *Pinyon Script* (títulos).

---

## 1) Identidad visual / Tokens de diseño

- **Colores base**  
  - Fondo página: `rgba(243,242,238,255)` ≈ `rgb(243,242,238)` / `#F3F2EE`  
  - Tarjetas/secciones: `rgba(251,250,248,255)` ≈ `rgb(251,250,248)` / `#FBFAF8`  
  - Texto principal (ink): `#2A2A2A`  
  - Texto secundario (muted): `#696969`  
  - Borde sutil (accent): `rgba(0,0,0,0.08)`  

- **Sombras y radios**  
  - Sombra global: `0 8px 24px rgba(0,0,0,.08)`  
  - Radio tarjetas: **15px**  
  - **Hero y fotos principales** (incl. `couple-left.jpg`, `couple-right.jpg`, `couple-hero2.jpg`): **18px** y `overflow: hidden` en el contenedor.

- **Fuentes**  
  - Base: **Quicksand** (300, 400, 600).  
  - Títulos: **Pinyon Script**.  
  - Sombra del título principal (sobre la foto del hero):
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

## 2) Estructura y layout

- **Contenedor principal**: `.wrap` con ancho `80%` y `max-width: 960px`.  
- **Tarjetas**: `.card` con fondo `#FBFAF8`, radio `15px`, sombra global.  
- **Prevención de desbordes**: `overflow-x: hidden` en `html, body`.  
- **Imágenes grandes con animación lateral** (`.fly-left` / `.fly-right`):  
  - Contenedor con `border-radius: 18px`, `overflow: hidden` y sombra global.  
  - Animación de entrada desde ±110% en eje X al entrar en viewport (`IntersectionObserver`).

- **Decorativos**: clase utilitaria `.decor` (centrado, `width: 200px`).  
- **Logo**: `img/couple-logo.svg` (centro, 100×100).

---

## 3) Secciones y comportamiento

### 3.1 Hero (portada)
- **Imagen principal**: `img/couple-hero.jpg` con **fade-in 2s**.  
- **Nombres** (overlay centrado): animaciones **en paralelo** al cargar hero:  
  - `fadeInNames` 2s **con delay de 4s**  
  - `riseNames` 3s `cubic-bezier(.16,1,.3,1)` **con delay de 4s**  
  - Resultado: aparece desde la parte inferior del hero y asciende a su posición final.

### 3.2 Intro + Countdown
- Texto de bienvenida + contador (Días, Horas, Minutos, Segundos).  
- **Responsive móvil**: los 4 bloques en **una sola fila**.  
- Fecha objetivo: `WEDDING_DATE_ISO = "2025-10-25T10:00:00-06:00"` (hora local CR).

### 3.3 Imágenes laterales con “fly-in”
- Izquierda: `img/couple-left.jpg` (entra desde la izquierda).  
- Derecha: `img/couple-right.jpg` (entra desde la derecha).  
- Ambas con radio **18px** y sombra.

### 3.4 Ceremonia
- Título: *Ceremonia Religiosa*.  
- Lugar: **Iglesia católica de Paquera**.  
- Hora: **10:00 a. m.**  
- **Navegación** (ver 5.2): botones **Waze** y **Google Maps** (deep links).  
- Decorativo: `img/decor-100.svg` (clase `.decor`).

### 3.5 Recepción
- Lugar: **Bella Vista House — Paquera**.  
- Hora: posterior a la ceremonia.  
- **Navegación**: Waze / Google Maps (deep links).  
- Decorativo `.decor`.

### 3.6 Programa
- Imagen SVG 100% ancho: `img/programa.svg`.

### 3.7 Foto + nota “solo adultos”
- Foto `img/couple-hero2.jpg` con **18px** de radio (clase `.photo-frame`).  
- Tarjeta con texto: “evento solo para adultos…”.

### 3.8 Vestimenta
- Título y subtítulo “Vestimenta formal”.  
- Nota de paleta: beige y verde olivo.  
- Decorativo `.decor`.

### 3.9 RSVP (Confirmar asistencia)
- **Fecha límite**: 10 de octubre de 2025.  
- **Formulario accesible** (A11Y):  
  - Campos: **Nombre** (texto), **Cantidad** (entero ≥ 1, **sin tope**).  
  - `aria-describedby` para ayudas/errores; `aria-invalid` cuando hay error.  
  - Mensajes con `role="status"` / `aria-live="polite"`.  
- **Validación** (JS):  
  - Nombre: mínimo 2 caracteres.  
  - Cantidad: entero, `>= 1`.  
  - Sin tope (`RSVP_MAX = null`).  
- **Envío**: botón abre **WhatsApp** con mensaje preformateado:  
  - Teléfono: `50660032092`  
  - Mensaje (pluralización automática): “Hola, soy {name}. Confirmo mi asistencia a la boda de Paola y Giancarlo el 25 de octubre de 2025 con {quantity} persona(s)…”.

---

## 4) Control de audio

- Elemento `<audio>` con `loop` y **tres fuentes**: `song.mp3` / `song.m4a` / `song.ogg`.  
- **Esquema dual**:
  - **Desktop**: píldora fija (arriba-derecha) con botón y switch.
  - **Móvil**: **botón único** (▶/⏸) compacto (44–48 px), cambia a rojo al pausar.  
- Mismo manejador de estado para ambos; autoplay requiere interacción del usuario.  
- Errores: alert + consola (códigos `MediaError`).

---

## 5) Enlaces de navegación (Cómo llegar)

### 5.1 Datos actuales
- **Iglesia**: `R398+W5Q, Provincia de Puntarenas, Paquera`.  
- **Recepción**: `V3X7+MF, Provincia de Puntarenas, Gigante`.  

> *Nota*: si Waze no resolviera el Plus Code, usar **coordenadas** `lat,long`.

### 5.2 Deep links implementados
- **Waze**  
  - App: `waze://?q={query}&navigate=yes`  
  - Web: `https://waze.com/ul?q={query}&navigate=yes`  
- **Google Maps**  
  - App: `google.navigation:q={query}`  
  - Web: `https://www.google.com/maps/dir/?api=1&destination={query}&travelmode=driving`  
- Fallback por `blur`/timeout (≈900 ms).

---

## 6) Accesibilidad (A11Y) y UX

- `prefers-reduced-motion`: desactiva transiciones/animaciones.  
- Botones con `:focus-visible`, contraste y área táctil en móvil.  
- Imágenes con **alt** genérico editable.

---

## 7) Rendimiento

- `loading="lazy"` y `decoding="async"` en imágenes no críticas.  
- Sin AVIF/WebP (se prioriza JPG/PNG/SVG).  
- Animaciones on-view (`IntersectionObserver`).

---

## 8) Variables clave (JS)

```js
const WEDDING_TITLE   = "Paola y Giancarlo";
const WEDDING_DATE_ISO= "2025-10-25T10:00:00-06:00";
const RSVP_PHONE      = "50660032092";

// Si cambian lugares, usar:
const CHURCH   = { label: "Iglesia católica de Paquera",  query: "R398+W5Q, Provincia de Puntarenas, Paquera" };
const RECEPTION= { label: "Bella Vista House — Paquera",  query: "V3X7+MF, Provincia de Puntarenas, Gigante" };

// RSVP (validación)
const RSVP_MAX = null; // sin tope (usa un número si quieres limitar)
```

---

## 9) Estructura de archivos sugerida

```
/ (raíz del proyecto)
├─ index.html
├─ audio/
│  └─ song.mp3  (opcional: song.m4a / song.ogg)
├─ img/
│  ├─ couple-logo.svg
│  ├─ couple-hero.jpg
│  ├─ couple-left.jpg
│  ├─ couple-right.jpg
│  ├─ couple-hero2.jpg
│  ├─ decor-100.svg
│  └─ programa.svg
```

---

## 10) Cómo reproducir el proyecto
1. Copiar `index.html` y la estructura **audio/** e **img/**.  
2. Colocar la canción en `audio/` (al menos `song.mp3`).  
3. Reemplazar imágenes por las reales (mantener nombres o actualizar rutas).  
4. Ajustar variables del bloque **Variables clave (JS)** si cambian fecha/teléfono/lugares.  
5. Probar en Android/iOS los **deep links** de Waze/Maps.  
6. Testear con **prefers-reduced-motion**.

---

## 11) Cambios relevantes ya aplicados
- Logo en **SVG**.  
- Sombra de título personalizada.  
- Control de audio **dual** (desktop/móvil).  
- Animación del bloque de nombres con **fade + rise** y **delay 4s** tras carga del hero.  
- **Countdown** en una sola fila en móvil.  
- Deep links de **Waze/GMaps** con fallback web.  
- Bordes redondeados unificados (**18px**) en fotos principales.  
- `overflow-x` oculto (evita scroll horizontal).  
- RSVP accesible, **sin tope** y pluralización WhatsApp.

---

## 12) Extensiones futuras
- Botón “Agregar al calendario” (Google/ICS).  
- Persistir estado de audio (localStorage).  
- Usar coordenadas `lat,long` para Waze.  
- Métricas básicas sin terceros.  
- Internacionalización.

---

**Última actualización:** 2025-08-30 03:18:47.
