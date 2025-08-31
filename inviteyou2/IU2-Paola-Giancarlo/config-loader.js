// config-loader.js (mínimo, no toca el DOM; solo expone window.config)
(function () {
  fetch('config.json', { cache: 'no-store' })
    .then(function (r) {
      if (!r.ok) throw new Error('No se pudo cargar config.json');
      return r.text();
    })
    .then(function (t) {
      try {
        window.config = JSON.parse(t);
        window.RUNTIME_CONFIG = window.config;            // compat si algún código tuyo lo usa
        window.getConfig = function(){ return window.config || {}; };
        console.log('[config-loader] OK. Endpoint:', window.config?.rsvp?.endpoint || '(ninguno)');
      } catch (e) {
        console.error('[config-loader] JSON inválido:', e, t);
      }
    })
    .catch(function (e) { console.error('[config-loader] Error carga:', e); });
})();
