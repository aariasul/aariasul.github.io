# Especificación técnica — Invitación de boda (Paola & Giancarlo)

## Objetivo
Sitio estático 100% reproducible, configurable y portable para invitación de boda. Stack minimalista: **HTML5 + CSS3 + JavaScript (vanilla)**.

## Fuentes y estilo
- **Pinyon Script** para títulos/nombres.
- **Quicksand** para textos.
- Fondo: `rgba(243,242,238,1)`.
- Sombra de texto recomendada para `.hero .names` (según preferencia visual vigente).

## Estructura de proyecto
```
/
├─ index.html
├─ config.json
├─ config-loader.js
├─ img/
└─ audio/
```

## Servir en local
```bash
python -m http.server 5500
# Abrir http://localhost:5500/ (requerido para que fetch() de config.json funcione)
```

## Configuración dinámica (`config.json`)
- `names.primary`: Nombre de la pareja.
- `date.iso`: Fecha y hora en ISO (ej. `"2025-12-20T15:00:00"`).
- `texts.*`: Frases (“¡Nos casamos!”, etc.).
- `links.waze.*` y `links.maps.*`: deep links para ceremonia/recepción.
- `media.hero`, `media.gallery[]`: imágenes.
- `audio.src`: ruta del audio (opcional).

**`config-loader.js`** debe:
1. Hacer `fetch('config.json')`.
2. Poblar DOM (nombres, fecha visible, textos, href de botones, rutas de imágenes/audio).
3. Inicializar el contador con `date.iso`.

## Contador (countdown)
- Formato visual: **DÍAS / HORAS / MINUTOS / SEGUNDOS**.
- **Requisito móvil**: en anchuras **≤768px**, la etiqueta **SEGUNDOS** debe mostrarse como **SEG**.
- El contador re-renderiza su contenido cada segundo.

### Parche universal (robusto ante re-render)
Colocar **justo antes de `</body>`**. No depende de IDs específicos; observa cambios del DOM y ajusta la etiqueta automáticamente.

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

## Audio
- Autoplay está sujeto a políticas del navegador; se reproduce tras interacción.
- Incluir botón de **Play/Pause** visible y accesible.

## Deep links Waze / Google Maps
- Definir enlaces para **ceremonia** y **recepción**.
- Proveer tanto Waze como Google Maps (dos botones por sede).

## Accesibilidad y responsive
- Contraste adecuado para textos sobre imágenes.
- Layout fluidos, tipografías escalables.
- Comprobación en móvil real + DevTools.

## Entrega y portabilidad
- Proyecto auto-contenido (excepto fuentes Google Fonts).
- Posibilidad de empaquetar en ZIP para compartir/subir a hosting estático.
- Cache estática permisiva para imágenes/audio; invalidación por nombre de archivo.

## Checklist de verificación
- [ ] `config.json` presente y válido (ISO date).
- [ ] `config-loader.js` enlazado en `<head>` con `defer`.
- [ ] Contador actualiza cada segundo.
- [ ] En móvil (≤768px) aparece **SEG**; en desktop, **SEGUNDOS**.
- [ ] Botones Waze/Maps apuntan a URLs correctas.
- [ ] Audio reproduce tras interacción y botón funciona.
- [ ] Imágenes optimizadas (peso/formatos) y rutas correctas.
