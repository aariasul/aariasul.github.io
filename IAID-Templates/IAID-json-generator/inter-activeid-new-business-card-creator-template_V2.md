# Inter-ActiveID: Plantilla y Guía Maestra para Crear Nuevas Tarjetas de Negocios
**Versión:** 2.0 (Consolidada)  
**Objetivo:** Guía paso a paso para duplicar el proceso de creación de tarjetas interactivas de negocio con IA o manualmente, sin errores de rutas, caché o estilos.

---

## 1. Flujo Paso a Paso (Cuestionario Asistido)

Cuando vayas a crear una nueva tarjeta para un cliente, solo responde a este cuestionario paso por paso:

### Paso 1: Identidad del Negocio y Titular
* **Nombre de la Empresa o Marca:** (Ej. *Alejandro López | Asesoría Financiera*)
* **Nombre del Profesional / Contacto:** (Ej. *Alejandro López*)
* **Título o Cargo profesional:** (Ej. *Licenciado en Finanzas / Asesor Financiero*)
* **Número de WhatsApp de Contacto:** (Ej. `+506 8420-0056` -> normalizado: `50684200056`)
* **Correo electrónico:** (Ej. `contacto@dominio.cr`)
* **Sitio Web:** (Ej. `https://www.dominio.cr/`)
* **Ubicación física:** (Si no tiene, indicar *Omitir*)

### Paso 2: Configuración de Rutas y Archivos Locales
* **Nombre de la carpeta del proyecto:** (Ej. `IAID-NombreCliente`)
* **URL pública en producción:** (Ej. `https://inter-activeid.com/IAID-NombreCliente/index.html`)
* **Logotipo SVG (en la raíz de la carpeta):** (Ej. `./nombre-cliente-icon-512x512.svg`)
* **Foto de perfil o GIF animado:** (Ej. `./NombreCliente-anim03.gif`)
* **Favicon:** (Ej. `./nombre-cliente-icon-50x50.png`)
* **Archivo vCard descargable:** (Ej. `./Nombre_Cliente.vcf`)
* **Iconos PWA (en carpeta compartida externa):**
  * 192x192: `../icons/nombre-cliente-icon-192x192.png`
  * 512x512: `../icons/nombre-cliente-icon-512x512.png`

### Paso 3: Redes Sociales (Rutas Externas Oficiales)
*Usar siempre las rutas relativas existentes sin filtros de color en línea (`style="filter:..."`):*
* **Facebook:** `../svgicons/facebook.svg` (URL: `...`)
* **LinkedIn:** `../svgicons/linkedin.svg` (URL: `...`)
* **X (Twitter):** `../svgicons/twitter.svg` (URL: `...`)
* **TikTok:** `../svgicons/tiktok.svg` (URL: `...`)
* **Spotify:** `../svgicons/spotify.svg` (URL: `...`)
* **Instagram:** `../svgicons/instagram.svg` (URL: `...`)

### Paso 4: Mensaje Predefinido de WhatsApp
Redactar el texto que se precarga al hacer clic en *"Solicitar Asesoría por WhatsApp"*:
```text
Hola [Nombre], me interesa conocer más sobre sus servicios.
Mi nombre es:
Por favor contactarme a la mayor brevedad posible.
```

### Paso 5: Paleta de Colores Corporativa (CSS Tokens)
Definir los valores hexadecimales para las variables CSS:
* `--primary-color:` (Color principal, ej. morado `#6a1882`)
* `--secondary-color:` (Color secundario, ej. magenta `#ce258e`)
* `--accent-color:` (Color de contraste/oro, ej. ámbar `#f0b849`)
* `--background-color:` (Fondo general, habitualmente `#000000`)
* `--surface-color:` (`#FFFFFF`)

### Paso 6: Contenido de los Acordeones Bilingües (ES / EN)
1. **Acordeón 0 (Abierto por defecto):** *Conecta con nosotros / Connect with us* (Botones de redes sociales).
2. **Acordeón 1:** Áreas de acción / Servicios principales (Lista de viñetas).
3. **Acordeones 2 a 4:** Propuestas de valor, metodología, gobierno corporativo o testimonios.

---

## 2. Reglas de Oro Técnicas (Para evitar errores comunes)

1. **Evitar texto suelto en archivos:**
   * La primera línea de `index.html` e `IAID-share.html` **debe ser obligatoriamente `<!DOCTYPE html>`**. Nunca debe haber texto explicativo, notas de chat ni espacios en blanco antes de esa línea.
2. **Open Graph / Vista previa en WhatsApp:**
   * La etiqueta `<meta property="og:image">` **nunca debe ser un `.svg` ni una ruta relativa `./`**.
   * Debe ser una **URL absoluta con HTTPS** y archivo **PNG o JPG**:
     ```html
     <meta property="og:image" content="https://inter-activeid.com/icons/nombre-icon-512x512.png" />
     <meta property="og:image:secure_url" content="https://inter-activeid.com/icons/nombre-icon-512x512.png" />
     <meta property="og:image:type" content="image/png" />
     <meta property="og:image:width" content="512" />
     <meta property="og:image:height" content="512" />
     ```
   * Si WhatsApp guarda la caché vieja, romper la caché añadiendo `?v=1` a la URL compartida o purgar en *Facebook Sharing Debugger*.
3. **Aislamiento en `localStorage`:**
   * Cada cliente debe tener su propio prefijo en `js/share.js` y `js/scriptlanguage.js` (ej. `aleLopezSavedContactsText`, `aleLopezLanguage`) para que los contactos guardados de un cliente no se mezclen con los de otro en el mismo navegador.
4. **Service Worker Sin Caché:**
   * Mantener siempre `service-worker.js` en modo *non-caching* (`skipWaiting` y `clients.claim` sin llamadas a `caches.open`), garantizando que cualquier cambio en producción se refleje de inmediato.
5. **Switch de Idioma (ES / EN):**
   * Perilla con animación elástica que muestre la **`ñ`** en Español y la **`n`** en Inglés, utilizando contraste oscuro/dorado.

---

## 3. Estructura Limpia de la Carpeta Final

```text
IAID-NombreCliente/
├── index.html              (Landing principal con estilos integrados y Oswald Light)
├── IAID-share.html         (Página de compartir con QR, libreta local y selector de país)
├── manifest.json           (PWA manifest apuntando a iconos compartidos externos)
├── service-worker.js       (Service Worker non-caching)
├── QR_code.svg             (Código QR vectorial real apuntando a la URL del cliente)
├── [Logotipo].svg          (En la raíz del proyecto)
├── [FotoPerfil].gif/.jpg   (En la raíz del proyecto)
├── [Favicon].png           (En la raíz del proyecto)
├── [Contacto].vcf          (Archivo de descarga vCard)
├── css/                    (Opcional para estilos externos)
└── js/
    ├── script.js           (Disparadores de instalación PWA e iOS)
    ├── scriptlanguage.js   (Lógica del switch ES/EN con persistencia local)
    └── share.js            (Motor de compartir por WhatsApp con marcadores invisibles)