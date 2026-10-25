# Inter-ActiveID: Plantilla y Guía Maestra para Crear Nuevas Tarjetas de Negocios
**Versión:** 3.0 (Regla Estricta: Branding 100% Exclusivo por Cliente y Aislamiento Total)  
**Objetivo:** Guía paso a paso para replicar con precisión quirúrgica nuevas tarjetas interactivas de negocio con IA o manualmente, asegurando branding visual exclusivo por cliente, sin fallas de caché, rutas relativas coherentes y aislamiento total en `localStorage`.

---

## 1. Regla de Oro de Branding Exclusivo (CERO Fallbacks Genéricos)

1. **Identidad Visual 100% Dedicada:**
   * **PROHIBIDO** usar logotipos o íconos genéricos de Inter-ActiveID como sustitutos o fallbacks en las tarjetas de clientes.
   * Toda tarjeta de negocio **DEBE** contar obligatoriamente con sus propios íconos PWA (`192x192` y `512x512`) y su favicon (`50x50`) generados a partir de la identidad visual y logotipo de ese cliente específico.
   * La vista previa en redes sociales (`og:image`) y el acceso directo instalado en el móvil del usuario **deben mostrar inequívocamente la marca del cliente**, nunca la de Inter-ActiveID.

2. **Convención Estricta de Nombres:**
   * Para un cliente cuyo slug sea `[slug]` (ej. `facitours`, `alejandro-lopez`, `jh-aduaneros`):
     * Icono 192x192 PWA: `../icons/[slug]-icon-192x192.png`
     * Icono 512x512 PWA y Social Share: `../icons/[slug]-icon-512x512.png`
     * Favicon local: `./[slug]-icon-50x50.png`
     * Logotipo vectorial raíz: `./[slug]-logo.svg` o `./[slug]-icon-512x512.svg`

---

## 2. Flujo Paso a Paso (Cuestionario Asistido)

Al iniciar un nuevo proyecto para un cliente, completa esta información:

### Paso 1: Identidad del Negocio y Titular
* **Nombre de la Empresa o Marca:** (Ej. *Facitours*, *Alejandro López | Asesoría Financiera*)
* **Nombre del Profesional / Titular:** (Ej. *Nombre y Apellidos*)
* **Título o Cargo Profesional:** (Ej. *Asesor de Viajes / Tour Operador*, *Consultor Financiero*)
* **Número de WhatsApp de Contacto:** (Ej. `+506 8888-8888` -> normalizado: `50688888888`)
* **Correo electrónico oficial:** (Ej. `contacto@dominio.com`)
* **Sitio Web Oficial:** (Ej. `https://www.dominio.com/`)
* **Ubicación física / Dirección:** (Si no aplica, indicar *Omitir*)

### Paso 2: Claves de Sistema y Aislamiento Local (`CLIENT_KEY`)
* **`[CLIENT_KEY]` (Prefijo CamelCase único para JavaScript/localStorage):**
  * Debe ser único e irrepetible para evitar colisiones en el dominio compartido.
  * Ejemplos: `faciTours`, `aleLopez`, `jhAduaneros`, `iaid` (exclusivo de Inter-ActiveID).
* **`[slug]` (Slug en minúsculas con guiones para archivos y rutas):**
  * Ejemplos: `facitours`, `alejandro-lopez`, `jh-aduaneros`.
* **Nombre de la carpeta del proyecto:** `IAID-[NombreCliente]` (Ej. `IAID-Facitours`)
* **URL canónica de producción:** `https://inter-activeid.com/IAID-[NombreCliente]/index.html`

### Paso 3: Recursos Gráficos Exclusivos del Cliente
* **Logotipo Vectorial (Raíz):** `./[slug]-logo.svg`
* **Foto de perfil o GIF animado:** `./[slug]-anim01.gif` o `./[slug]-perfil.jpg`
* **Favicon del cliente:** `./[slug]-icon-50x50.png`
* **Archivo vCard descargable:** `./[NombreCliente].vcf`
* **Código QR Exclusivo:** `./QR_code.svg` (generado apuntando a la URL final de este cliente)
* **Iconos PWA Dedicados (en carpeta compartida `../icons/`):**
  * `../icons/[slug]-icon-192x192.png`
  * `../icons/[slug]-icon-512x512.png`

### Paso 4: Redes Sociales (Catálogo Centralizado de Iconos SVG)
*Utilizar siempre las rutas relativas existentes a `../svgicons/`:*
* **WhatsApp:** `../svgicons/whatsapp.svg`
* **Facebook:** `../svgicons/facebook.svg`
* **Instagram:** `../svgicons/instagram.svg`
* **Google Review / Maps:** `../svgicons/google.svg`
* **LinkedIn:** `../svgicons/linkedin.svg`
* **TikTok:** `../svgicons/tiktok.svg`
* **X (Twitter):** `../svgicons/twitter.svg`
* **Spotify Podcast:** `../svgicons/spotify.svg`
* **Sitio Web:** `../svgicons/www.svg`
* **Descarga de Contacto:** `../svgicons/contact-download.svg`
* **Compartir:** `../svgicons/share-white.svg`
* **Pantalla de Inicio:** `../svgicons/homescreen.svg`

### Paso 5: Mensaje Predefinido de WhatsApp
```text
Hola [Nombre], me interesa conocer más sobre sus servicios.
Mi nombre es:
Por favor contactarme a la mayor brevedad posible.
```

### Paso 6: Paleta de Colores Corporativa (Tokens CSS)
Definir los colores basados en la línea gráfica del cliente:
* `--primary-color:` (Color principal de marca)
* `--secondary-color:` (Color de contraste o soporte)
* `--accent-color:` (Color dorado/resaltador para bordes, botones y foco)
* `--background-color:` (Fondo principal, habitualmente `#000000`)
* `--surface-color:` (Superficie de modales/tarjetas)

### Paso 7: Contenido Bilingüe de los Acordeones (ES / EN)
1. **Acordeón 0 (Abierto por defecto):** *Conecta con nosotros / Connect with us* (Botones de redes sociales del cliente).
2. **Acordeón 1:** Servicios o áreas principales de atención.
3. **Acordeones 2 a 4:** Quiénes somos, metodología de trabajo, tarifas, o catálogo de productos/tours.

---

## 3. Especificación Técnica de Aislamiento de `localStorage`

Para garantizar que un cliente nunca sobreescriba los contactos, el idioma, el país fijado ni los mensajes personalizados de otro en el mismo navegador y dominio, se implementa el objeto `STORAGE_KEYS` con `[CLIENT_KEY]`:

### A. En `js/scriptlanguage.js`
```javascript
(function () {
  "use strict";

  // Clave 100% aislada para este cliente
  const STORAGE_KEY = "[CLIENT_KEY]Language";

  function applyLanguage(language) {
    const isEn = language === "en";
    const englishTexts = document.querySelectorAll(".lang-en");
    const spanishTexts = document.querySelectorAll(".lang-es");

    englishTexts.forEach((el) => { el.style.display = isEn ? "block" : "none"; });
    spanishTexts.forEach((el) => { el.style.display = isEn ? "none" : "block"; });

    try { localStorage.setItem(STORAGE_KEY, language); } catch (e) {}

    // Sincronizar UI del botón o switch
    const langCheckbox = document.getElementById("langCheckbox");
    const langSwitch = document.getElementById("langSwitch");
    const tagEs = document.getElementById("tag-es");
    const tagEn = document.getElementById("tag-en");

    if (langCheckbox && langSwitch) {
      langCheckbox.checked = isEn;
      langSwitch.classList.toggle("is-on", isEn);
    }
    if (tagEs && tagEn) {
      tagEs.classList.toggle("active", !isEn);
      tagEn.classList.toggle("active", isEn);
    }

    document.documentElement.lang = language;

    window.dispatchEvent(
      new CustomEvent("app:language-changed", {
        detail: { language }
      })
    );
  }

  window.setLanguage = function setLanguage(language) {
    if (language !== "en" && language !== "es") {
      language = "es";
    }
    applyLanguage(language);
  };

  document.addEventListener("DOMContentLoaded", function () {
    let savedLanguage = "es";
    try {
      savedLanguage = localStorage.getItem(STORAGE_KEY) || "es";
    } catch (e) {}
    applyLanguage(savedLanguage);
  });
})();
```

### B. En `js/share.js` (o inline en `IAID-share.html`)
```javascript
(function () {
  "use strict";

  // Mapeo exhaustivo de claves aisladas para este cliente
  const STORAGE_KEYS = {
    CONTACTS: "[CLIENT_KEY]SavedContactsText",
    COUNTRY_ISO2: "[CLIENT_KEY]CountryIso2",
    COUNTRY_LOCKED: "[CLIENT_KEY]CountryLocked",
    MSG_MANUAL_TEXT: "[CLIENT_KEY]MessageManualText",
    MSG_MANUALLY_EDITED: "[CLIENT_KEY]MessageManuallyEdited",
    MSG_LOCKED: "[CLIENT_KEY]MessageLocked",
    MSG_BAKED_PHONE: "[CLIENT_KEY]MessageBakedPhone",
    LANGUAGE: "[CLIENT_KEY]Language"
  };

  // Teléfono del cliente para recibir la consolidación de prospectos
  const NOTIFY_PHONE = "[TELEFONO_NOTIFICACION_CLIENTE]";
  const NAME_MARK = "\u200B"; // Separador invisible de inserción de nombre

  function getLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEYS.LANGUAGE) === "en" ? "en" : "es";
    } catch (e) {
      return "es";
    }
  }

  // ... Resto de la lógica de guardado y lectura utilizando STORAGE_KEYS ...
})();
```

---

## 4. Reglas de Oro Técnicas Obligatorias

1. **Estructura HTML Limpia:**
   * La primera línea de `index.html` e `IAID-share.html` **debe ser obligatoriamente `<!DOCTYPE html>`**. Nunca coloques texto, comentarios de chat o espacios en blanco antes de esa línea.
2. **Open Graph / Vista Previa en WhatsApp:**
   * El `<meta property="og:image">` **debe ser una URL absoluta HTTPS y apuntar exclusivamente a la imagen PNG del cliente**:
     ```html
     <meta property="og:image" content="https://inter-activeid.com/icons/[slug]-icon-512x512.png" />
     <meta property="og:image:secure_url" content="https://inter-activeid.com/icons/[slug]-icon-512x512.png" />
     <meta property="og:image:type" content="image/png" />
     <meta property="og:image:width" content="512" />
     <meta property="og:image:height" content="512" />
     <meta property="og:image:alt" content="Logotipo de [Nombre de la Empresa]" />
     ```
   * Nunca utilices `.svg` ni rutas relativas para el `og:image`.
3. **Manifest PWA Dedicado (`manifest.json`):**
   * Debe apuntar a los íconos PNG específicos del cliente en `../icons/`:
     ```json
     {
       "name": "[Nombre de la Empresa]",
       "short_name": "[Nombre Corto]",
       "description": "[Descripción del negocio]",
       "icons": [
         {
           "src": "../icons/[slug]-icon-192x192.png",
           "type": "image/png",
           "sizes": "192x192"
         },
         {
           "src": "../icons/[slug]-icon-512x512.png",
           "type": "image/png",
           "sizes": "512x512"
         }
       ],
       "start_url": "./index.html",
       "display": "standalone",
       "background_color": "#000000",
       "theme_color": "#000000",
       "orientation": "portrait"
     }
     ```
4. **Service Worker Non-Caching:**
   * Mantener siempre `service-worker.js` en modo transparente (listeners `install` y `activate` simples) para asegurar que cualquier actualización en el servidor se refleje de inmediato en los navegadores móviles sin bloqueos de caché.

---

## 5. Estructura Limpia de la Carpeta Final

```text
IAID-[NombreCliente]/
├── index.html              (Landing principal con estilos integrados y acordes a la marca)
├── IAID-share.html         (Herramienta de compartir con QR, libreta local y selector de país)
├── manifest.json           (PWA manifest apuntando a ../icons/[slug]-icon-*.png)
├── service-worker.js       (Service Worker non-caching)
├── QR_code.svg             (Código QR vectorial apuntando a la URL del cliente)
├── [slug]-logo.svg         (Logotipo vectorial en la raíz del proyecto)
├── [slug]-anim01.gif       (Foto de perfil o animación en la raíz)
├── [slug]-icon-50x50.png   (Favicon del cliente en la raíz)
├── [NombreCliente].vcf     (Tarjeta de contacto vCard descargable)
├── css/                    (Opcional para estilos externos)
└── js/
    ├── script.js           (Disparadores de instalación PWA e iOS A2HS)
    ├── scriptlanguage.js   (Lógica del switch ES/EN con STORAGE_KEY aislada)
    └── share.js            (Motor de envío y libreta local con STORAGE_KEYS aisladas)