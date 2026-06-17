
    const CONFIG_URL = './config.json';
    const DEFAULT_LANG = 'es';
    const STORAGE_KEY = 'infomed_language';

    let deferredPrompt = null;

    const defaultConfig = {
      title: 'Infomed | Inter-ActiveID, Erick Vega',
      description: 'Página de emergencia con contactos y envío de ubicación.',
      app_url: 'https://inter-activeid.com/infomed/Erick-Vega/index.html',
      og_image: 'https://inter-activeid.com/icons/infomed-icon-512x512.png',
      principal: {
        nombre: 'Erick Vega Zúñiga',
        cedula: 'Ced: 108170227',
        photo_src: './Erick-Vega.png',
        logo_src: '../infomed.svg',
        background_src: '../bg01.jpg'
      },
      contacts: [
        { key: 'jorling', nombre: 'Jorling Oporta', telefono: '86893803' },
        { key: 'damaris', nombre: 'Damaris Zúñiga', telefono: '88694267' },
        { key: 'claire', nombre: 'Claire de Mezerville', telefono: '87022841' }
      ],
      conditions: [
        { title: 'Diagnóstico principal', value: 'Cardiópata con Reemplazo Valvular - SJD' },
        { title: 'Anticoagulado', value: 'Sí' },
        { title: 'Mets', value: '15' },
        { title: 'Alergias', value: 'Ninguna' },
        { title: 'Tipo de sangre', value: 'A+' },
        { title: 'Registrado como donante de órganos', value: 'No' }
      ]
    };

    const i18n = {
      es: {
        documentLang: 'es',
        locale: 'es_CR',
        heroTitle: 'Información vital en el momento preciso.',
        skipToEmergency: 'Saltar a la información de emergencia',
        systemDescription: 'Sistema de ubicación y contacto de emergencia.',
        personNameLabel: 'Nombre de la persona',
        personIdLabel: 'Cédula / Pasaporte',
        emergencyInstructions: 'Informe a los contactos de emergencia por:<br>- Llamada telefónica<br>- WhatsApp<br>y envíe la ubicación desde el botón.',
        emergencyContactsAria: 'Contactos de emergencia',
        contactTitle: 'Contacto {number}',
        contactNameLabel: 'Nombre y apellido',
        contactPhoneLabel: 'Teléfono',
        sendLocationLabel: 'Envíe la ubicación geográfica:',
        sendWhatsAppLabel: 'Toque para enviar WhatsApp:',
        callLabel: 'Toque para llamar:',
        locationButtonTitle: 'Enviar ubicación por WhatsApp',
        whatsAppButtonTitle: 'Enviar WhatsApp',
        callButtonTitle: 'Llamar por teléfono',
        locationIconAlt: 'Ubicación',
        whatsappIconAlt: 'WhatsApp',
        callIconAlt: 'Llamar',
        conditionsTitle: 'Condiciones Especiales',
        noConditions: 'Sin datos de condiciones especiales.',
        anticoagulated: 'Anticoagulado',
        mets: 'Mets',
        allergies: 'Alergias',
        bloodType: 'Tipo de sangre',
        organDonor: 'Registrado como donante de órganos',
        additionalNotes: 'Notas adicionales',
        locationDisclaimer: '⚠️ Esta página de contactos de emergencia puede solicitar acceso a su ubicación geográfica para enviarla a los contactos registrados en caso de emergencia.',
        missingPhoneAlert: 'Por favor defina el teléfono del contacto en la configuración.',
        configFallbackWarning: 'No se pudo cargar config.json. Se usaron los datos de respaldo incluidos en la página.',
        locationMessage: 'Enviaré la ubicación de {name}, ya que es una emergencia: {mapsLink}',
        locationFallbackMessage: 'Enviaré la ubicación de {name}, ya que es una emergencia. Por favor comparta su ubicación aquí.',
        whatsappMessage: 'Usted está reportando una emergencia de {name} portador del brazalete Infomed.\nPor favor adjunte en este mensaje su localización geográfica.\nIngrese su nombre (opcional):',
        photoAlt: 'Fotografía de {name}, persona portadora del brazalete Infomed',
        locationAria: 'Enviar ubicación actual por WhatsApp a {contactName}',
        whatsappAria: 'Enviar mensaje de emergencia por WhatsApp a {contactName}',
        callAria: 'Llamar por teléfono a {contactName}',
        locationVisibleText: 'Enviar ubicación',
        whatsappVisibleText: 'Enviar WhatsApp',
        callVisibleText: 'Llamar ahora',
        homeScreenText: 'Agregar a pantalla de inicio',
        homeScreenAria: 'Agregar Infomed a la pantalla de inicio',
        closeInstructionsAria: 'Cerrar instrucciones',
        iosA2hsTitle: 'Agregar a pantalla de inicio',
        iosA2hsDesc: 'En iPhone o iPad, agregue esta página desde el menú de compartir de Safari.',
        iosA2hsStep1: 'Toque el botón <strong>Compartir</strong> de Safari.',
        iosA2hsStep2: 'Seleccione <strong>Agregar a pantalla de inicio</strong>.',
        iosA2hsStep3: 'Confirme tocando <strong>Agregar</strong>.',
        installUnavailable: 'Si su navegador permite instalación, use el menú del navegador y seleccione Agregar a pantalla de inicio.'
      },
      en: {
        documentLang: 'en',
        locale: 'en_US',
        heroTitle: 'Vital information at the right moment.',
        skipToEmergency: 'Skip to emergency information',
        systemDescription: 'Emergency location and contact system.',
        personNameLabel: 'Person name',
        personIdLabel: 'ID / Passport',
        emergencyInstructions: 'Notify the emergency contacts by:<br>- Phone call<br>- WhatsApp<br>and send the location using the button.',
        emergencyContactsAria: 'Emergency contacts',
        contactTitle: 'Contact {number}',
        contactNameLabel: 'Full name',
        contactPhoneLabel: 'Phone number',
        sendLocationLabel: 'Send geographic location:',
        sendWhatsAppLabel: 'Tap to send WhatsApp:',
        callLabel: 'Tap to call:',
        locationButtonTitle: 'Send location by WhatsApp',
        whatsAppButtonTitle: 'Send WhatsApp',
        callButtonTitle: 'Call by phone',
        locationIconAlt: 'Location',
        whatsappIconAlt: 'WhatsApp',
        callIconAlt: 'Call',
        conditionsTitle: 'Special Conditions',
        noConditions: 'No special condition data available.',
        anticoagulated: 'Anticoagulated',
        mets: 'Mets',
        allergies: 'Allergies',
        bloodType: 'Blood type',
        organDonor: 'Registered organ donor',
        additionalNotes: 'Additional notes',
        locationDisclaimer: '⚠️ This emergency contact page may request access to your geographic location to send it to the registered contacts in case of emergency.',
        missingPhoneAlert: 'Please define the contact phone number in the configuration.',
        configFallbackWarning: 'config.json could not be loaded. Backup data included in the page was used.',
        locationMessage: 'I am sending the location of {name} because this is an emergency: {mapsLink}',
        locationFallbackMessage: 'I am sending the location of {name} because this is an emergency. Please share your location here.',
        whatsappMessage: 'You are reporting an emergency for {name}, bearer of the Infomed bracelet.\nPlease attach your geographic location to this message.\nEnter your name (optional):',
        photoAlt: 'Photo of {name}, bearer of the Infomed bracelet',
        locationAria: 'Send current location by WhatsApp to {contactName}',
        whatsappAria: 'Send emergency WhatsApp message to {contactName}',
        callAria: 'Call {contactName} by phone',
        locationVisibleText: 'Send location',
        whatsappVisibleText: 'Send WhatsApp',
        callVisibleText: 'Call now',
        homeScreenText: 'Add to Home Screen',
        homeScreenAria: 'Add Infomed to the home screen',
        closeInstructionsAria: 'Close instructions',
        iosA2hsTitle: 'Add to Home Screen',
        iosA2hsDesc: 'On iPhone or iPad, add this page from Safari’s share menu.',
        iosA2hsStep1: 'Tap Safari’s <strong>Share</strong> button.',
        iosA2hsStep2: 'Select <strong>Add to Home Screen</strong>.',
        iosA2hsStep3: 'Confirm by tapping <strong>Add</strong>.',
        installUnavailable: 'If your browser supports installation, use the browser menu and select Add to Home Screen.'
      }
    };

    let appConfig = defaultConfig;
    let currentLang = getInitialLanguage();

    function getInitialLanguage(){
      const stored = localStorage.getItem(STORAGE_KEY);
      return i18n[stored] ? stored : DEFAULT_LANG;
    }

    function t(key, replacements = {}){
      const dictionary = i18n[currentLang] || i18n[DEFAULT_LANG];
      let value = dictionary[key] || i18n[DEFAULT_LANG][key] || key;
      Object.entries(replacements).forEach(([name, replacement]) => {
        value = value.replaceAll(`{${name}}`, String(replacement ?? ''));
      });
      return value;
    }

    function encodeTxt(value){
      return encodeURIComponent(value || '');
    }

    function safeText(value, fallback = ''){
      return String(value ?? fallback).trim();
    }

    function getPrincipalName(){
      const inputValue = document.getElementById('nombrePersona')?.value;
      return safeText(inputValue, currentLang === 'en' ? 'the person' : 'la persona');
    }

    function normalizePhoneForWhatsApp(raw){
      const digits = String(raw || '').replace(/\D+/g, '');
      if(digits.length === 8) return `506${digits}`;
      return digits;
    }

    function telHref(raw){
      const digits = String(raw || '').replace(/\D+/g, '');
      if(!digits) return '';
      if(String(raw).trim().startsWith('+')) return `tel:+${digits}`;
      return digits.length === 8 ? `tel:+506${digits}` : `tel:+${digits}`;
    }

    function getContactByIndex(index){
      const contacts = Array.isArray(appConfig.contacts) ? appConfig.contacts : [];
      return contacts[Number(index) - 1] || null;
    }

    function getContactPhone(index){
      const contact = getContactByIndex(index);
      return safeText(contact?.telefono || contact?.tel);
    }

    function openWhatsApp(phoneDigits, text){
      if(!phoneDigits){
        alert(t('missingPhoneAlert'));
        return;
      }

      const url = `https://wa.me/${phoneDigits}?text=${encodeTxt(text)}`;
      window.location.href = url;
    }

    function handleEnviarUbicacion(index){
      const personName = getPrincipalName();
      const phoneDigits = normalizePhoneForWhatsApp(getContactPhone(index));
      if(!phoneDigits){
        alert(t('missingPhoneAlert'));
        return;
      }

      const fallback = () => {
        openWhatsApp(phoneDigits, t('locationFallbackMessage', { name: personName }));
      };

      if(!('geolocation' in navigator)){
        fallback();
        return;
      }

      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
          openWhatsApp(phoneDigits, t('locationMessage', { name: personName, mapsLink }));
        },
        () => fallback(),
        { enableHighAccuracy:true, timeout:10000, maximumAge:0 }
      );
    }

    function handleWhatsapp(index){
      const personName = getPrincipalName();
      const phoneDigits = normalizePhoneForWhatsApp(getContactPhone(index));
      if(!phoneDigits){
        alert(t('missingPhoneAlert'));
        return;
      }
      openWhatsApp(phoneDigits, t('whatsappMessage', { name: personName }));
    }

    function handleCall(index){
      const href = telHref(getContactPhone(index));
      if(!href){
        alert(t('missingPhoneAlert'));
        return;
      }
      window.location.href = href;
    }

    function createInputBlock(id, labelText, value, type = 'text'){
      const wrapper = document.createElement('div');
      wrapper.className = 'stack';

      const label = document.createElement('label');
      label.setAttribute('for', id);
      label.textContent = labelText;

      const input = document.createElement('input');
      input.id = id;
      input.type = type;
      if(type === 'tel') input.inputMode = 'tel';
      input.readOnly = true;
      input.value = value;

      wrapper.append(label, input);
      return wrapper;
    }

    function createActionButton(action, index, imageSrc, imageAlt, title, ariaLabel, visibleText){
      const button = document.createElement('button');
      button.className = 'btn icon-only';
      button.type = 'button';
      button.dataset.action = action;
      button.dataset.card = String(index);
      button.title = title;
      button.setAttribute('aria-label', ariaLabel);

      const img = document.createElement('img');
      img.className = 'ico';
      img.src = imageSrc;
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');

      const text = document.createElement('span');
      text.className = 'action-text';
      text.textContent = visibleText || imageAlt || title;

      button.append(img, text);
      return button;
    }

    function createMiniLabel(text){
      const label = document.createElement('div');
      label.className = 'mini-label';
      label.textContent = text;
      return label;
    }

    function renderContacts(){
      const grid = document.getElementById('contactsGrid');
      if(!grid) return;
      grid.innerHTML = '';

      const contacts = Array.isArray(appConfig.contacts) ? appConfig.contacts : [];
      contacts.forEach((contact, idx) => {
        const index = idx + 1;
        const contactName = safeText(contact.nombre, t('contactTitle', { number:index }));
        const phone = safeText(contact.telefono || contact.tel);

        const article = document.createElement('article');
        article.className = 'contact-card';
        article.dataset.card = String(index);

        const title = document.createElement('div');
        title.className = 'contact-title';
        title.textContent = t('contactTitle', { number:index });

        const fields = document.createElement('div');
        fields.className = 'stack';
        fields.append(
          createInputBlock(`c${index}_nombre`, t('contactNameLabel'), contactName, 'text'),
          createInputBlock(`c${index}_tel`, t('contactPhoneLabel'), phone, 'tel')
        );

        const buttons = document.createElement('div');
        buttons.className = 'btns';
        buttons.append(
          createMiniLabel(t('sendLocationLabel')),
          createActionButton('loc', index, '../../svgicons/emergency-location.svg', t('locationIconAlt'), t('locationButtonTitle'), t('locationAria', { contactName }), t('locationVisibleText')),
          createMiniLabel(t('sendWhatsAppLabel')),
          createActionButton('wa', index, '../../svgicons/whatsapp.svg', t('whatsappIconAlt'), t('whatsAppButtonTitle'), t('whatsappAria', { contactName }), t('whatsappVisibleText')),
          createMiniLabel(t('callLabel')),
          createActionButton('call', index, '../../svgicons/telephone.svg', t('callIconAlt'), t('callButtonTitle'), t('callAria', { contactName }), t('callVisibleText'))
        );

        article.append(title, fields, buttons);
        grid.appendChild(article);
      });
    }

    function addConditionLine(container, label, value, blockStyle = false){
      const cleanValue = safeText(value);
      if(!cleanValue) return;

      const paragraph = document.createElement('p');
      if(label){
        const strong = document.createElement('b');
        strong.textContent = `${label}:`;
        paragraph.appendChild(strong);
        if(blockStyle){
          paragraph.appendChild(document.createElement('br'));
        }else{
          paragraph.appendChild(document.createTextNode(' '));
        }
      }
      paragraph.appendChild(document.createTextNode(cleanValue));
      container.appendChild(paragraph);
    }

    function renderCondiciones(){
      const box = document.getElementById('condiciones');
      if(!box) return;
      box.innerHTML = '';

      const conditions = Array.isArray(appConfig.conditions) ? appConfig.conditions : [];
      const cleanConditions = conditions
        .map(condition => ({
          title: safeText(condition?.title),
          value: safeText(condition?.value)
        }))
        .filter(condition => condition.title || condition.value);

      if(!cleanConditions.length){
        addConditionLine(box, '', t('noConditions'));
        return;
      }

      cleanConditions.forEach(condition => {
        addConditionLine(box, condition.title, condition.value, true);
      });
    }

    function updateLanguageToggle(){
      const toggle = document.getElementById('languageToggle');
      const switchEl = document.getElementById('languageSwitchLabel');
      if(!toggle || !switchEl) return;

      const isSpanish = currentLang === 'es';
      toggle.checked = isSpanish;
      switchEl.classList.toggle('is-on', isSpanish);
      switchEl.setAttribute(
        'aria-label',
        isSpanish ? 'Idioma actual español. Cambiar a inglés.' : 'Current language English. Switch to Spanish.'
      );
      toggle.setAttribute(
        'aria-label',
        isSpanish ? 'Idioma actual español. Cambiar a inglés.' : 'Current language English. Switch to Spanish.'
      );
    }

    function updateStaticTexts(){
      document.documentElement.lang = t('documentLang');
      document.querySelector('.sec2')?.setAttribute('aria-label', t('emergencyContactsAria'));

      document.querySelectorAll('[data-i18n]').forEach(element => {
        element.textContent = t(element.dataset.i18n);
      });

      document.querySelectorAll('[data-i18n-html]').forEach(element => {
        element.innerHTML = t(element.dataset.i18nHtml);
      });

      document.querySelectorAll('[data-i18n-aria]').forEach(element => {
        element.setAttribute('aria-label', t(element.dataset.i18nAria));
      });

      updateLanguageToggle();
    }

    function updateMetadata(){
      const title = safeText(appConfig.title, defaultConfig.title);
      const description = safeText(appConfig.description, defaultConfig.description);
      const image = safeText(appConfig.og_image, defaultConfig.og_image);
      const appUrl = safeText(appConfig.app_url, defaultConfig.app_url);

      document.title = title;
      setMeta('name', 'description', description);
      setMeta('property', 'og:url', appUrl);
      setMeta('property', 'og:title', title);
      setMeta('property', 'og:description', description);
      setMeta('property', 'og:image', image);
      setMeta('property', 'og:image:secure_url', image);
      setMeta('property', 'og:locale', t('locale'));
      setMeta('name', 'twitter:title', title);
      setMeta('name', 'twitter:description', description);
      setMeta('name', 'twitter:image', image);
    }

    function setMeta(attribute, key, value){
      const element = document.querySelector(`meta[${attribute}="${key}"]`);
      if(element) element.setAttribute('content', value);
    }

    function applyConfig(){
      const principal = appConfig.principal || {};
      const personName = safeText(principal.nombre, defaultConfig.principal.nombre);
      const personId = safeText(principal.cedula, defaultConfig.principal.cedula);
      const photoSrc = safeText(principal.photo_src, defaultConfig.principal.photo_src);
      const logoSrc = safeText(principal.logo_src, defaultConfig.principal.logo_src);
      const backgroundSrc = safeText(principal.background_src, defaultConfig.principal.background_src);

      const photo = document.getElementById('fotoPersona');
      const logoPrincipal = document.getElementById('logoPrincipal');
      const logoInline = document.getElementById('logoInline');
      const nombre = document.getElementById('nombrePersona');
      const idPersona = document.getElementById('idPersona');

      if(photo){
        photo.src = photoSrc;
        photo.alt = t('photoAlt', { name: personName });
      }
      if(logoPrincipal) logoPrincipal.src = logoSrc;
      if(logoInline) logoInline.src = logoSrc;
      if(nombre) nombre.value = personName;
      if(idPersona) idPersona.value = personId;

      document.body.style.backgroundImage = `url('${backgroundSrc}')`;
      updateMetadata();
      updateStaticTexts();
      renderContacts();
      renderCondiciones();
    }

    async function loadConfig(){
      try{
        const response = await fetch(CONFIG_URL, { cache:'no-store' });
        if(!response.ok) throw new Error(`HTTP ${response.status}`);
        const remoteConfig = await response.json();
        appConfig = normalizeConfig(remoteConfig);
      }catch(error){
        console.error('No se pudo cargar config.json', error);
        appConfig = defaultConfig;
        showStatusMessage(t('configFallbackWarning'));
      }
      applyConfig();
    }

    function normalizeConfig(config){
      const merged = {
        ...defaultConfig,
        ...config,
        principal: {
          ...defaultConfig.principal,
          ...(config.principal || {})
        }
      };

      merged.contacts = Array.isArray(config.contacts) ? config.contacts : defaultConfig.contacts;
      merged.conditions = Array.isArray(config.conditions) ? config.conditions : defaultConfig.conditions;

      return merged;
    }

    function showStatusMessage(message){
      const box = document.getElementById('statusMessage');
      if(!box) return;
      box.textContent = message;
      box.hidden = false;
    }

    function setLanguage(lang){
      if(!i18n[lang]) return;
      currentLang = lang;
      localStorage.setItem(STORAGE_KEY, lang);
      applyConfig();
    }

    function isIOS() {
      return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    }

    function isStandaloneIOS() {
      return window.navigator.standalone === true;
    }

    function openIosA2HS() {
      const backdrop = document.getElementById('ios-a2hs-backdrop');
      const modal = document.getElementById('ios-a2hs-modal');

      if (!backdrop || !modal) {
        return;
      }

      backdrop.classList.add('is-visible');
      backdrop.setAttribute('aria-hidden', 'false');

      document.addEventListener('keydown', onEscClose);

      const closeButton = modal.querySelector('.ios-a2hs-close');
      if (closeButton) {
        closeButton.focus();
      }
    }

    function onEscClose(event) {
      if (event.key === 'Escape') {
        closeIosA2HS();
      }
    }

    window.closeIosA2HS = function closeIosA2HS() {
      const backdrop = document.getElementById('ios-a2hs-backdrop');

      if (!backdrop) {
        return;
      }

      backdrop.classList.remove('is-visible');
      backdrop.setAttribute('aria-hidden', 'true');

      document.removeEventListener('keydown', onEscClose);
    };

    window.handleAddToHomeScreen = function handleAddToHomeScreen() {
      if (isIOS() && !isStandaloneIOS()) {
        openIosA2HS();
        return;
      }

      if (deferredPrompt) {
        deferredPrompt.prompt();

        deferredPrompt.userChoice.finally(function () {
          deferredPrompt = null;
        });

        return;
      }

      if (isIOS()) {
        openIosA2HS();
        return;
      }

      alert(t('installUnavailable'));
    };

    window.addEventListener('beforeinstallprompt', function (event) {
      event.preventDefault();
      deferredPrompt = event;
    });

    function registerServiceWorker(){
      if(!('serviceWorker' in navigator)) return;
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('./service-worker.js').catch(function (error) {
          console.log('Service Worker registration failed:', error);
        });
      });
    }

    document.addEventListener('click', event => {
      const actionButton = event.target.closest('[data-action]');
      if(!actionButton) return;

      const action = actionButton.dataset.action;
      const card = actionButton.dataset.card;
      if(!card) return;

      if(action === 'loc') handleEnviarUbicacion(card);
      if(action === 'wa') handleWhatsapp(card);
      if(action === 'call') handleCall(card);
    });

    document.addEventListener('DOMContentLoaded', () => {
      const toggle = document.getElementById('languageToggle');
      const switchEl = document.getElementById('languageSwitchLabel');

      if(toggle && switchEl){
        toggle.addEventListener('change', () => {
          switchEl.classList.toggle('is-on', toggle.checked);
          setLanguage(toggle.checked ? 'es' : 'en');
        });
      }

      registerServiceWorker();
      loadConfig();
    });
  