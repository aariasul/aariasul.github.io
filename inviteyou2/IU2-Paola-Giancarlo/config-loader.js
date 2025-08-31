// config-loader.js (compat v2: publica window.config y soporta estructura nueva/legacy)
(async function () {
  try {
    const res = await fetch('config.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('No se pudo cargar config.json');
    const txt = await res.text();
    const cfg = JSON.parse(txt);

    // 👇 HAZLA GLOBAL para otros scripts (RSVP)
    window.config = cfg;
    window.RUNTIME_CONFIG = cfg;
    window.getConfig = () => window.config || window.RUNTIME_CONFIG || {};

    // Helpers
    const $ = s => document.querySelector(s);
    const setText = (sel, val) => { const el = $(sel); if (el && val) el.textContent = val; };
    const setAttr = (sel, attr, val) => { const el = $(sel); if (el && val != null) el.setAttribute(attr, val); };

    // Fecha legible
    setText('.date', cfg?.date?.readable);

    // Nombres (nuevo y legacy)
    setText('.hero .names .script', (cfg?.names?.primary) || (cfg?.couple?.display));

    // Ubicaciones: nuevo => links.{church,reception}; legacy => {church,reception}
    const church    = (cfg?.links?.church)    || (cfg?.church)    || {};
    const reception = (cfg?.links?.reception) || (cfg?.reception) || {};

    // Textos (si existen esos contenedores en tu HTML)
    (function () {
      const cer = $('#ceremonia .center');
      if (cer && (church.title || church.label)) {
        const s = cer.querySelectorAll('p strong');
        if (s[0]) s[0].textContent = church.title || church.label;
      }
      const rec = $('#recepcion .center');
      if (rec && (reception.title || reception.label)) {
        const s = rec.querySelectorAll('p strong');
        if (s[0]) s[0].textContent = reception.title || reception.label;
      }
    })();

    // Navegación: si hay URLs directas (nuevo), las ponemos en href;
    // si hay 'query' (legacy) dejamos data-query para tu manejador actual.
    setAttr('#ceremonia [data-nav="waze"]', 'href', church.waze);
    setAttr('#ceremonia [data-nav="gmap"]', 'href', church.maps);
    setAttr('#recepcion [data-nav="waze"]', 'href', reception.waze);
    setAttr('#recepcion [data-nav="gmap"]', 'href', reception.maps);
    if (church.query) {
      setAttr('#ceremonia [data-nav="waze"]', 'data-query', church.query);
      setAttr('#ceremonia [data-nav="gmap"]', 'data-query', church.query);
    }
    if (reception.query) {
      setAttr('#recepcion [data-nav="waze"]', 'data-query', reception.query);
      setAttr('#recepcion [data-nav="]()
