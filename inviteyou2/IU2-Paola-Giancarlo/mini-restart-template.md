# Mini-restart template — Invitación de boda (Paola & Giancarlo)

> Usa esta plantilla *tal cual* para retomar el trabajo en un chat nuevo sin perder contexto.

## 1) Estado actual (resumen breve)
- Proyecto: **Invitación de boda (HTML/CSS/JS vanilla)**.
- Servido en local con: `python -m http.server 5500` → abrir http://localhost:5500/.
- Configuración dinámica vía **`config.json`** cargado por **`config-loader.js`**.
- Contador activo con formato **DÍAS / HORAS / MINUTOS / SEGUNDOS**, con **ajuste móvil**: en pantallas ≤768px, la etiqueta **SEGUNDOS** cambia automáticamente a **SEG** (script con `MutationObserver`). 
- Control/Toggle de audio manual (autoplay solo tras interacción del usuario).
- Enlaces rápidos (deep links) a **Waze** y **Google Maps** para ceremonia y recepción.
- Fuentes: **Pinyon Script** (títulos) y **Quicksand** (texto). Fondo: `rgba(243,242,238,1)`.

## 2) Archivos clave
```
/
├─ index.html          # Página principal
├─ config.json         # Datos dinámicos (nombres, fecha, textos, links, media)
├─ config-loader.js    # Carga config.json y aplica al DOM
├─ img/                # Imágenes (portada, decoraciones, etc.)
└─ audio/              # Música opcional
```

## 3) Cambios recientes relevantes
- **NUEVO**: Parche universal para el contador que **reemplaza “SEGUNDOS” por “SEG” en móvil** y mantiene “SEGUNDOS” en desktop. Es robusto ante re-render del contador.
- El parche se colocó **al final de `index.html`**, justo antes de `</body>`.

### Snippet vigente (no modificar sin revisar)
```html
<script>
(function () {
  var MOBILE_QUERY = '(max-width: 768px)';
  var RE_SEG = /\bsegundos?\b/i;

  function labelDeseada() {
    return window.matchMedia(MOBILE_QUERY).matches ? 'SEG' : 'SEGUNDOS';
  }
  function cambiarTextoNodo(node, texto) {
    var t = node.textContent || '';
    if (RE_SEG.test(t)) node.textContent = t.replace(RE_SEG, texto);
  }
  function recorrerYAplicar(root, texto) {
    if (root.nodeType === Node.TEXT_NODE) return cambiarTextoNodo(root, texto);
    if (root.nodeType === Node.ELEMENT_NODE) {
      if (root.childNodes.length === 1 && root.firstChild.nodeType === Node.TEXT_NODE) {
        cambiarTextoNodo(root.firstChild, texto);
      } else {
        for (var i = 0; i < root.childNodes.length; i++) recorrerYAplicar(root.childNodes[i], texto);
      }
    }
  }
  function aplicar() { recorrerYAplicar(document.body, labelDeseada()); }
  aplicar();
  var mq = window.matchMedia(MOBILE_QUERY);
  if (mq.addEventListener) mq.addEventListener('change', aplicar); else mq.addListener(aplicar);
  window.addEventListener('resize', aplicar);
  window.addEventListener('orientationchange', aplicar);
  new MutationObserver(aplicar).observe(document.body, { childList: true, subtree: true });
})();
</script>
```

## 4) Cómo ejecutar en local
```bash
# Desde la carpeta donde está index.html
python -m http.server 5500
# Abrir: http://localhost:5500/
```

## 5) Qué necesito que hagas ahora (rellenar y enviar)
- Objetivo de la sesión:
- Archivos que vas a tocar (si aplica):
- Cambios deseados / bugs a corregir:
- ¿Hay nuevos assets (imágenes/audio)? ¿Rutas?
- ¿Fecha/hora final confirmada (ISO en `config.json`)?
- ¿Necesitas ZIP listo para compartir?

## 6) Reglas de trabajo
- **No** romper lo que funciona. Cambios mínimos, reversibles.
- Siempre entregar **archivos completos** y **comandos copy‑paste**.
- Pedir confirmación antes de alterar estructura o estilos.
- Mantener compatibilidad con `config.json` y el script de ajuste móvil.
