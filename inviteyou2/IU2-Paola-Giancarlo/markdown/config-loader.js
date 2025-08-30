// config-loader.js
// Carga config.json y lo expone en window.RUNTIME_CONFIG para que index.html la use.
// REQUIERE servir el sitio por HTTP (p. ej. `python -m http.server`), porque fetch no funciona con file:// en muchos navegadores.
(async function(){
  try{
    const res = await fetch('config.json', {cache: 'no-store'});
    if(!res.ok) throw new Error('No se pudo cargar config.json');
    const cfg = await res.json();
    window.RUNTIME_CONFIG = cfg;
    // Si quieres aplicar cambios inmediatos al DOM antes del script principal, hazlo aquí.
    // Ejemplos:
    const dateEl = document.querySelector('.date');
    if (dateEl && cfg.date?.readable){ dateEl.textContent = cfg.date.readable; }
    const nameEl = document.querySelector('.hero .names .script');
    if (nameEl && cfg.couple?.display){ nameEl.textContent = cfg.couple.display; }

    // Actualiza textos de lugares
    const cer = document.querySelector('#ceremonia .center');
    if (cer && cfg.church){
      const pStrong = cer.querySelectorAll('p strong');
      if (pStrong[0]) pStrong[0].textContent = cfg.church.label;
    }
    const rec = document.querySelector('#recepcion .center');
    if (rec && cfg.reception){
      const pStrong = rec.querySelectorAll('p strong');
      if (pStrong[0]) pStrong[0].textContent = cfg.reception.label;
    }

    // Actualiza data-query de los botones de navegación
    const cerWaze = document.querySelector('#ceremonia [data-nav="waze"]');
    const cerGmap = document.querySelector('#ceremonia [data-nav="gmap"]');
    const recWaze = document.querySelector('#recepcion [data-nav="waze"]');
    const recGmap = document.querySelector('#recepcion [data-nav="gmap"]');
    if (cerWaze && cfg.church?.query) cerWaze.setAttribute('data-query', cfg.church.query);
    if (cerGmap && cfg.church?.query) cerGmap.setAttribute('data-query', cfg.church.query);
    if (recWaze && cfg.reception?.query) recWaze.setAttribute('data-query', cfg.reception.query);
    if (recGmap && cfg.reception?.query) recGmap.setAttribute('data-query', cfg.reception.query);

    // Actualiza imágenes si las cambiaste en el JSON
    const imgMap = {
      'img.couple-logo': ['.logo', 'logo'],
      'img.hero':        ['.hero img', 'hero'],
      'img.left':        ['.fly-left img', 'left'],
      'img.right':       ['.fly-right img', 'right'],
      'img.hero2':       ['.photo-frame img', 'hero2'],
      'img.decor':       ['.decor', 'decor'],
      'img.program':     ['section:has(h2.center) .fullw img', 'program']
    };
    for (const key in imgMap){
      const [sel, cfgKey] = imgMap[key];
      const el = document.querySelector(sel);
      if (el && cfg.assets?.[cfgKey]){ el.setAttribute('src', cfg.assets[cfgKey]); }
    }

    // Aplica límite de invitados si se definió
    const qty = document.getElementById('rsvpQty');
    const limit = cfg.flags?.limitGuests ? cfg.flags.maxGuests : null;
    if (qty){
      if (limit && Number.isFinite(limit)){
        qty.setAttribute('max', String(limit));
      } else {
        qty.removeAttribute('max');
      }
    }

    // Expone util para otros scripts
    window.getConfig = () => window.RUNTIME_CONFIG || {};
  }catch(err){
    console.warn('Config loader: sin config.json o error de parseo. Usando valores por defecto.', err);
  }
})();
