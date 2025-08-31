// config-loader.js (versión estable, sin sintaxis moderna)
(function () {
  function $(s) { return document.querySelector(s); }
  function setText(sel, val) { var el = $(sel); if (el && val != null && val !== '') el.textContent = val; }
  function setAttr(sel, attr, val) { var el = $(sel); if (el && val != null && val !== '') el.setAttribute(attr, val); }

  fetch('config.json', { cache: 'no-store' })
    .then(function (r) { if (!r.ok) throw new Error('No se pudo cargar config.json'); return r.text(); })
    .then(function (t) {
      var cfg = JSON.parse(t);

      // HAZLA GLOBAL
      window.config = cfg;
      window.RUNTIME_CONFIG = cfg;
      window.getConfig = function () { return window.config || window.RUNTIME_CONFIG || {}; };

      // ----- APLICACIONES BÁSICAS -----
      // Fecha legible
      if (cfg.date && cfg.date.readable) setText('.date', cfg.date.readable);

      // Nombres (nuevo y legacy)
      if (cfg.names && cfg.names.primary) {
        setText('#names-primary', cfg.names.primary);
        setText('.hero .names .script', cfg.names.primary);
      } else if (cfg.couple && cfg.couple.display) {
        setText('#names-primary', cfg.couple.display);
        setText('.hero .names .script', cfg.couple.display);
      }

      // Ubicaciones: nuevo => links.{church,reception}; legacy => {church,reception}
      var church    = (cfg.links && cfg.links.church)    ? cfg.links.church    : (cfg.church    || {});
      var reception = (cfg.links && cfg.links.reception) ? cfg.links.reception : (cfg.reception || {});

      // Títulos de tarjetas si existen esos IDs (según el index.html que te pasé)
      if (church.title || church.label) setText('#church-title', church.title || church.label);
      if (reception.title || reception.label) setText('#reception-title', reception.title || reception.label);

      // Enlaces directos
      setAttr('#church-waze', 'href', church.waze);
      setAttr('#church-maps', 'href', church.maps);
      setAttr('#reception-waze', 'href', reception.waze);
      setAttr('#reception-maps', 'href', reception.maps);

      // Si usas la versión vieja basada en data-query, respétala
      if (church.query) { setAttr('#ceremonia [data-nav="waze"]', 'data-query', church.query); setAttr('#ceremonia [data-nav="gmap"]', 'data-query', church.query); }
      if (reception.query) { setAttr('#recepcion  [data-nav="waze"]', 'data-query', reception.query); setAttr('#recepcion  [data-nav="gmap"]', 'data-query', reception.query); }

      // Imágenes: soporta cfg.media y cfg.assets
      var media = cfg.media || cfg.assets || {};
      setAttr('.logo',            'src', media.logo);
      setAttr('.hero img',        'src', media.hero);
      setAttr('.fly-left img',    'src', media.left);
      setAttr('.fly-right img',   'src', media.right);
      setAttr('.photo-frame img', 'src', media.hero2);
      setAttr('.decor',           'src', media.decor);
      // program es opcional; si no existe el selector, no pasa nada
      setAttr('section .fullw img', 'src', media.program);

      // Límite global (si usas #rsvpQty)
      var qty = document.getElementById('rsvpQty');
      var limit = (cfg.flags && cfg.flags.limitGuests && isFinite(cfg.flags.maxGuests)) ? Number(cfg.flags.maxGuests) : null;
      if (qty) { if (limit != null) qty.setAttribute('max', String(limit)); else qty.removeAttribute('max'); }

      console.log('[config-loader] OK. Endpoint:', (cfg.rsvp && (cfg.rsvp.endpoint || cfg.rsvp.embed_url)) || '(no definido)');
    })
    .catch(function (e) {
      console.error('[config-loader] Error:', e);
    });
})();
