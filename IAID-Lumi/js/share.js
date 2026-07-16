/* ======================
       IAID SHARE CONTACT LIST MODULE
    ====================== */

    (function () {
      "use strict";

      const STORAGE_KEY = "lumiSavedContactsText";
      const FIXED_NOTIFY_PHONE = "50683088888";

      const copy = {
        es: {
          documentTitle: "Compartir tarjeta | Carla Chaves Sancho",
          namePlaceholder: "Nombre de la persona",
          phonePlaceholder: "Número local (sin código de país)",
          countryPlaceholder: "Buscar país o código...",
          messagePlaceholder: "El mensaje se generará automáticamente. Puede editarlo antes de enviar.",
          savedPlaceholder: "Aquí aparecerán los nombres y teléfonos guardados.",
          missingFields: "Ingrese nombre y teléfono antes de enviar.",
          missingCountry: "Seleccione un país antes de enviar.",
          invalidPhone: "Ingrese un número de teléfono válido.",
          noCountryMatches: "Sin resultados",
          lockCountryLabel: "Bloquear país",
          unlockCountryLabel: "Desbloquear país",
          lockMessageLabel: "Bloquear mensaje",
          unlockMessageLabel: "Desbloquear mensaje",
          contactSaved: "Contacto guardado. WhatsApp se abrirá para enviar el IAID.",
          contactSavedShared: "Contacto guardado. Elija una app para compartir el IAID.",
          shareCancelled: "Se canceló el envío por otra app.",
          shareFailed: "No se pudo abrir el panel para compartir.",
          listEmpty: "No hay nombres ni teléfonos guardados todavía.",
          listSent: "WhatsApp se abrirá para enviar la lista completa.",
          listCleared: "Lista limpiada correctamente.",
          editCancelled: "Edición cancelada.",
          savedCountSingular: "1 contacto guardado",
          savedCountPlural: function (count) {
            return `${count} contactos guardados`;
          },
          iaidMessage: function (name, url) {
            return `Hola ${name}. Te comparto mi tarjeta interactiva de negocios de Carla Chaves Sancho en Lumi RH: ${url}`;
          },
          notifyMessage: function (listText) {
            return `Lista de contactos de Lumi RH:\n\n${listText}`;
          }
        },

        en: {
          documentTitle: "Share card | Carla Chaves Sancho",
          namePlaceholder: "Person's name",
          phonePlaceholder: "Local number (without country code)",
          countryPlaceholder: "Search country or code...",
          messagePlaceholder: "The message will be generated automatically. You may edit it before sending.",
          savedPlaceholder: "Saved names and phone numbers will appear here.",
          missingFields: "Enter name and phone number before sending.",
          missingCountry: "Select a country before sending.",
          invalidPhone: "Enter a valid phone number.",
          noCountryMatches: "No matches",
          lockCountryLabel: "Lock country",
          unlockCountryLabel: "Unlock country",
          lockMessageLabel: "Lock message",
          unlockMessageLabel: "Unlock message",
          contactSaved: "Contact saved. WhatsApp will open to send the IAID.",
          contactSavedShared: "Contact saved. Choose an app to share the IAID.",
          shareCancelled: "Sharing via other app was cancelled.",
          shareFailed: "Could not open the share panel.",
          listEmpty: "There are no saved names or phone numbers yet.",
          listSent: "WhatsApp will open to send the full list.",
          listCleared: "List cleared successfully.",
          editCancelled: "Editing cancelled.",
          savedCountSingular: "1 saved contact",
          savedCountPlural: function (count) {
            return `${count} saved contacts`;
          },
          iaidMessage: function (name, url) {
            return `Hi ${name}. I am sharing Carla Chaves Sancho’s Lumi RH interactive business card with you: ${url}`;
          },
          notifyMessage: function (listText) {
            return `Lumi RH contact list:\n\n${listText}`;
          }
        }
      };

      /* ======================
         COUNTRY / DIAL CODE DATA
      ====================== */

      const COUNTRIES = [
        { iso2:"AF", en:"Afghanistan", es:"Afganistán", code:"93" },
        { iso2:"AL", en:"Albania", es:"Albania", code:"355" },
        { iso2:"DZ", en:"Algeria", es:"Argelia", code:"213" },
        { iso2:"AS", en:"American Samoa", es:"Samoa Americana", code:"1684" },
        { iso2:"AD", en:"Andorra", es:"Andorra", code:"376" },
        { iso2:"AO", en:"Angola", es:"Angola", code:"244" },
        { iso2:"AI", en:"Anguilla", es:"Anguila", code:"1264" },
        { iso2:"AG", en:"Antigua and Barbuda", es:"Antigua y Barbuda", code:"1268" },
        { iso2:"AR", en:"Argentina", es:"Argentina", code:"54" },
        { iso2:"AM", en:"Armenia", es:"Armenia", code:"374" },
        { iso2:"AW", en:"Aruba", es:"Aruba", code:"297" },
        { iso2:"AU", en:"Australia", es:"Australia", code:"61" },
        { iso2:"AT", en:"Austria", es:"Austria", code:"43" },
        { iso2:"AZ", en:"Azerbaijan", es:"Azerbaiyán", code:"994" },
        { iso2:"BS", en:"Bahamas", es:"Bahamas", code:"1242" },
        { iso2:"BH", en:"Bahrain", es:"Baréin", code:"973" },
        { iso2:"BD", en:"Bangladesh", es:"Bangladés", code:"880" },
        { iso2:"BB", en:"Barbados", es:"Barbados", code:"1246" },
        { iso2:"BY", en:"Belarus", es:"Bielorrusia", code:"375" },
        { iso2:"BE", en:"Belgium", es:"Bélgica", code:"32" },
        { iso2:"BZ", en:"Belize", es:"Belice", code:"501" },
        { iso2:"BJ", en:"Benin", es:"Benín", code:"229" },
        { iso2:"BM", en:"Bermuda", es:"Bermudas", code:"1441" },
        { iso2:"BT", en:"Bhutan", es:"Bután", code:"975" },
        { iso2:"BO", en:"Bolivia", es:"Bolivia", code:"591" },
        { iso2:"BA", en:"Bosnia and Herzegovina", es:"Bosnia y Herzegovina", code:"387" },
        { iso2:"BW", en:"Botswana", es:"Botsuana", code:"267" },
        { iso2:"BR", en:"Brazil", es:"Brasil", code:"55" },
        { iso2:"BN", en:"Brunei", es:"Brunéi", code:"673" },
        { iso2:"BG", en:"Bulgaria", es:"Bulgaria", code:"359" },
        { iso2:"BF", en:"Burkina Faso", es:"Burkina Faso", code:"226" },
        { iso2:"BI", en:"Burundi", es:"Burundi", code:"257" },
        { iso2:"KH", en:"Cambodia", es:"Camboya", code:"855" },
        { iso2:"CM", en:"Cameroon", es:"Camerún", code:"237" },
        { iso2:"CA", en:"Canada", es:"Canadá", code:"1" },
        { iso2:"CV", en:"Cabo Verde", es:"Cabo Verde", code:"238" },
        { iso2:"KY", en:"Cayman Islands", es:"Islas Caimán", code:"1345" },
        { iso2:"CF", en:"Central African Republic", es:"República Centroafricana", code:"236" },
        { iso2:"TD", en:"Chad", es:"Chad", code:"235" },
        { iso2:"CL", en:"Chile", es:"Chile", code:"56" },
        { iso2:"CN", en:"China", es:"China", code:"86" },
        { iso2:"CO", en:"Colombia", es:"Colombia", code:"57" },
        { iso2:"KM", en:"Comoros", es:"Comoras", code:"269" },
        { iso2:"CG", en:"Congo", es:"Congo", code:"242" },
        { iso2:"CD", en:"DR Congo", es:"Rep. Dem. del Congo", code:"243" },
        { iso2:"CK", en:"Cook Islands", es:"Islas Cook", code:"682" },
        { iso2:"CR", en:"Costa Rica", es:"Costa Rica", code:"506" },
        { iso2:"CI", en:"Ivory Coast", es:"Costa de Marfil", code:"225" },
        { iso2:"HR", en:"Croatia", es:"Croacia", code:"385" },
        { iso2:"CU", en:"Cuba", es:"Cuba", code:"53" },
        { iso2:"CW", en:"Curaçao", es:"Curazao", code:"599" },
        { iso2:"CY", en:"Cyprus", es:"Chipre", code:"357" },
        { iso2:"CZ", en:"Czech Republic", es:"República Checa", code:"420" },
        { iso2:"DK", en:"Denmark", es:"Dinamarca", code:"45" },
        { iso2:"DJ", en:"Djibouti", es:"Yibuti", code:"253" },
        { iso2:"DM", en:"Dominica", es:"Dominica", code:"1767" },
        { iso2:"DO", en:"Dominican Republic", es:"República Dominicana", code:"1809" },
        { iso2:"EC", en:"Ecuador", es:"Ecuador", code:"593" },
        { iso2:"EG", en:"Egypt", es:"Egipto", code:"20" },
        { iso2:"SV", en:"El Salvador", es:"El Salvador", code:"503" },
        { iso2:"GQ", en:"Equatorial Guinea", es:"Guinea Ecuatorial", code:"240" },
        { iso2:"ER", en:"Eritrea", es:"Eritrea", code:"291" },
        { iso2:"EE", en:"Estonia", es:"Estonia", code:"372" },
        { iso2:"SZ", en:"Eswatini", es:"Esuatini", code:"268" },
        { iso2:"ET", en:"Ethiopia", es:"Etiopía", code:"251" },
        { iso2:"FK", en:"Falkland Islands", es:"Islas Malvinas", code:"500" },
        { iso2:"FO", en:"Faroe Islands", es:"Islas Feroe", code:"298" },
        { iso2:"FJ", en:"Fiji", es:"Fiyi", code:"679" },
        { iso2:"FI", en:"Finland", es:"Finlandia", code:"358" },
        { iso2:"FR", en:"France", es:"Francia", code:"33" },
        { iso2:"PF", en:"French Polynesia", es:"Polinesia Francesa", code:"689" },
        { iso2:"GA", en:"Gabon", es:"Gabón", code:"241" },
        { iso2:"GM", en:"Gambia", es:"Gambia", code:"220" },
        { iso2:"GE", en:"Georgia", es:"Georgia", code:"995" },
        { iso2:"DE", en:"Germany", es:"Alemania", code:"49" },
        { iso2:"GH", en:"Ghana", es:"Ghana", code:"233" },
        { iso2:"GI", en:"Gibraltar", es:"Gibraltar", code:"350" },
        { iso2:"GR", en:"Greece", es:"Grecia", code:"30" },
        { iso2:"GL", en:"Greenland", es:"Groenlandia", code:"299" },
        { iso2:"GD", en:"Grenada", es:"Granada", code:"1473" },
        { iso2:"GU", en:"Guam", es:"Guam", code:"1671" },
        { iso2:"GT", en:"Guatemala", es:"Guatemala", code:"502" },
        { iso2:"GN", en:"Guinea", es:"Guinea", code:"224" },
        { iso2:"GW", en:"Guinea-Bissau", es:"Guinea-Bisáu", code:"245" },
        { iso2:"GY", en:"Guyana", es:"Guyana", code:"592" },
        { iso2:"HT", en:"Haiti", es:"Haití", code:"509" },
        { iso2:"HN", en:"Honduras", es:"Honduras", code:"504" },
        { iso2:"HK", en:"Hong Kong", es:"Hong Kong", code:"852" },
        { iso2:"HU", en:"Hungary", es:"Hungría", code:"36" },
        { iso2:"IS", en:"Iceland", es:"Islandia", code:"354" },
        { iso2:"IN", en:"India", es:"India", code:"91" },
        { iso2:"ID", en:"Indonesia", es:"Indonesia", code:"62" },
        { iso2:"IR", en:"Iran", es:"Irán", code:"98" },
        { iso2:"IQ", en:"Iraq", es:"Irak", code:"964" },
        { iso2:"IE", en:"Ireland", es:"Irlanda", code:"353" },
        { iso2:"IL", en:"Israel", es:"Israel", code:"972" },
        { iso2:"IT", en:"Italy", es:"Italia", code:"39" },
        { iso2:"JM", en:"Jamaica", es:"Jamaica", code:"1876" },
        { iso2:"JP", en:"Japan", es:"Japón", code:"81" },
        { iso2:"JO", en:"Jordan", es:"Jordania", code:"962" },
        { iso2:"KZ", en:"Kazakhstan", es:"Kazajistán", code:"7" },
        { iso2:"KE", en:"Kenya", es:"Kenia", code:"254" },
        { iso2:"KI", en:"Kiribati", es:"Kiribati", code:"686" },
        { iso2:"KP", en:"North Korea", es:"Corea del Norte", code:"850" },
        { iso2:"KR", en:"South Korea", es:"Corea del Sur", code:"82" },
        { iso2:"KW", en:"Kuwait", es:"Kuwait", code:"965" },
        { iso2:"KG", en:"Kyrgyzstan", es:"Kirguistán", code:"996" },
        { iso2:"LA", en:"Laos", es:"Laos", code:"856" },
        { iso2:"LV", en:"Latvia", es:"Letonia", code:"371" },
        { iso2:"LB", en:"Lebanon", es:"Líbano", code:"961" },
        { iso2:"LS", en:"Lesotho", es:"Lesoto", code:"266" },
        { iso2:"LR", en:"Liberia", es:"Liberia", code:"231" },
        { iso2:"LY", en:"Libya", es:"Libia", code:"218" },
        { iso2:"LI", en:"Liechtenstein", es:"Liechtenstein", code:"423" },
        { iso2:"LT", en:"Lithuania", es:"Lituania", code:"370" },
        { iso2:"LU", en:"Luxembourg", es:"Luxemburgo", code:"352" },
        { iso2:"MO", en:"Macau", es:"Macao", code:"853" },
        { iso2:"MK", en:"North Macedonia", es:"Macedonia del Norte", code:"389" },
        { iso2:"MG", en:"Madagascar", es:"Madagascar", code:"261" },
        { iso2:"MW", en:"Malawi", es:"Malaui", code:"265" },
        { iso2:"MY", en:"Malaysia", es:"Malasia", code:"60" },
        { iso2:"MV", en:"Maldives", es:"Maldivas", code:"960" },
        { iso2:"ML", en:"Mali", es:"Malí", code:"223" },
        { iso2:"MT", en:"Malta", es:"Malta", code:"356" },
        { iso2:"MH", en:"Marshall Islands", es:"Islas Marshall", code:"692" },
        { iso2:"MQ", en:"Martinique", es:"Martinica", code:"596" },
        { iso2:"MR", en:"Mauritania", es:"Mauritania", code:"222" },
        { iso2:"MU", en:"Mauritius", es:"Mauricio", code:"230" },
        { iso2:"MX", en:"Mexico", es:"México", code:"52" },
        { iso2:"FM", en:"Micronesia", es:"Micronesia", code:"691" },
        { iso2:"MD", en:"Moldova", es:"Moldavia", code:"373" },
        { iso2:"MC", en:"Monaco", es:"Mónaco", code:"377" },
        { iso2:"MN", en:"Mongolia", es:"Mongolia", code:"976" },
        { iso2:"ME", en:"Montenegro", es:"Montenegro", code:"382" },
        { iso2:"MS", en:"Montserrat", es:"Montserrat", code:"1664" },
        { iso2:"MA", en:"Morocco", es:"Marruecos", code:"212" },
        { iso2:"MZ", en:"Mozambique", es:"Mozambique", code:"258" },
        { iso2:"MM", en:"Myanmar", es:"Myanmar", code:"95" },
        { iso2:"NA", en:"Namibia", es:"Namibia", code:"264" },
        { iso2:"NR", en:"Nauru", es:"Nauru", code:"674" },
        { iso2:"NP", en:"Nepal", es:"Nepal", code:"977" },
        { iso2:"NL", en:"Netherlands", es:"Países Bajos", code:"31" },
        { iso2:"NC", en:"New Caledonia", es:"Nueva Caledonia", code:"687" },
        { iso2:"NZ", en:"New Zealand", es:"Nueva Zelanda", code:"64" },
        { iso2:"NI", en:"Nicaragua", es:"Nicaragua", code:"505" },
        { iso2:"NE", en:"Niger", es:"Níger", code:"227" },
        { iso2:"NG", en:"Nigeria", es:"Nigeria", code:"234" },
        { iso2:"NU", en:"Niue", es:"Niue", code:"683" },
        { iso2:"NO", en:"Norway", es:"Noruega", code:"47" },
        { iso2:"OM", en:"Oman", es:"Omán", code:"968" },
        { iso2:"PK", en:"Pakistan", es:"Pakistán", code:"92" },
        { iso2:"PW", en:"Palau", es:"Palaos", code:"680" },
        { iso2:"PS", en:"Palestine", es:"Palestina", code:"970" },
        { iso2:"PA", en:"Panama", es:"Panamá", code:"507" },
        { iso2:"PG", en:"Papua New Guinea", es:"Papúa Nueva Guinea", code:"675" },
        { iso2:"PY", en:"Paraguay", es:"Paraguay", code:"595" },
        { iso2:"PE", en:"Peru", es:"Perú", code:"51" },
        { iso2:"PH", en:"Philippines", es:"Filipinas", code:"63" },
        { iso2:"PL", en:"Poland", es:"Polonia", code:"48" },
        { iso2:"PT", en:"Portugal", es:"Portugal", code:"351" },
        { iso2:"PR", en:"Puerto Rico", es:"Puerto Rico", code:"1787" },
        { iso2:"QA", en:"Qatar", es:"Catar", code:"974" },
        { iso2:"RE", en:"Réunion", es:"Reunión", code:"262" },
        { iso2:"RO", en:"Romania", es:"Rumanía", code:"40" },
        { iso2:"RU", en:"Russia", es:"Rusia", code:"7" },
        { iso2:"RW", en:"Rwanda", es:"Ruanda", code:"250" },
        { iso2:"KN", en:"Saint Kitts and Nevis", es:"San Cristóbal y Nieves", code:"1869" },
        { iso2:"LC", en:"Saint Lucia", es:"Santa Lucía", code:"1758" },
        { iso2:"VC", en:"Saint Vincent and the Grenadines", es:"San Vicente y las Granadinas", code:"1784" },
        { iso2:"WS", en:"Samoa", es:"Samoa", code:"685" },
        { iso2:"SM", en:"San Marino", es:"San Marino", code:"378" },
        { iso2:"ST", en:"São Tomé and Príncipe", es:"Santo Tomé y Príncipe", code:"239" },
        { iso2:"SA", en:"Saudi Arabia", es:"Arabia Saudita", code:"966" },
        { iso2:"SN", en:"Senegal", es:"Senegal", code:"221" },
        { iso2:"RS", en:"Serbia", es:"Serbia", code:"381" },
        { iso2:"SC", en:"Seychelles", es:"Seychelles", code:"248" },
        { iso2:"SL", en:"Sierra Leone", es:"Sierra Leona", code:"232" },
        { iso2:"SG", en:"Singapore", es:"Singapur", code:"65" },
        { iso2:"SK", en:"Slovakia", es:"Eslovaquia", code:"421" },
        { iso2:"SI", en:"Slovenia", es:"Eslovenia", code:"386" },
        { iso2:"SB", en:"Solomon Islands", es:"Islas Salomón", code:"677" },
        { iso2:"SO", en:"Somalia", es:"Somalia", code:"252" },
        { iso2:"ZA", en:"South Africa", es:"Sudáfrica", code:"27" },
        { iso2:"SS", en:"South Sudan", es:"Sudán del Sur", code:"211" },
        { iso2:"ES", en:"Spain", es:"España", code:"34" },
        { iso2:"LK", en:"Sri Lanka", es:"Sri Lanka", code:"94" },
        { iso2:"SD", en:"Sudan", es:"Sudán", code:"249" },
        { iso2:"SR", en:"Suriname", es:"Surinam", code:"597" },
        { iso2:"SE", en:"Sweden", es:"Suecia", code:"46" },
        { iso2:"CH", en:"Switzerland", es:"Suiza", code:"41" },
        { iso2:"SY", en:"Syria", es:"Siria", code:"963" },
        { iso2:"TW", en:"Taiwan", es:"Taiwán", code:"886" },
        { iso2:"TJ", en:"Tajikistan", es:"Tayikistán", code:"992" },
        { iso2:"TZ", en:"Tanzania", es:"Tanzania", code:"255" },
        { iso2:"TH", en:"Thailand", es:"Tailandia", code:"66" },
        { iso2:"TL", en:"Timor-Leste", es:"Timor Oriental", code:"670" },
        { iso2:"TG", en:"Togo", es:"Togo", code:"228" },
        { iso2:"TO", en:"Tonga", es:"Tonga", code:"676" },
        { iso2:"TT", en:"Trinidad and Tobago", es:"Trinidad y Tobago", code:"1868" },
        { iso2:"TN", en:"Tunisia", es:"Túnez", code:"216" },
        { iso2:"TR", en:"Turkey", es:"Turquía", code:"90" },
        { iso2:"TM", en:"Turkmenistan", es:"Turkmenistán", code:"993" },
        { iso2:"TC", en:"Turks and Caicos Islands", es:"Islas Turcas y Caicos", code:"1649" },
        { iso2:"TV", en:"Tuvalu", es:"Tuvalu", code:"688" },
        { iso2:"UG", en:"Uganda", es:"Uganda", code:"256" },
        { iso2:"UA", en:"Ukraine", es:"Ucrania", code:"380" },
        { iso2:"AE", en:"United Arab Emirates", es:"Emiratos Árabes Unidos", code:"971" },
        { iso2:"GB", en:"United Kingdom", es:"Reino Unido", code:"44" },
        { iso2:"US", en:"United States", es:"Estados Unidos", code:"1" },
        { iso2:"UY", en:"Uruguay", es:"Uruguay", code:"598" },
        { iso2:"UZ", en:"Uzbekistan", es:"Uzbekistán", code:"998" },
        { iso2:"VU", en:"Vanuatu", es:"Vanuatu", code:"678" },
        { iso2:"VA", en:"Vatican City", es:"Ciudad del Vaticano", code:"379" },
        { iso2:"VE", en:"Venezuela", es:"Venezuela", code:"58" },
        { iso2:"VN", en:"Vietnam", es:"Vietnam", code:"84" },
        { iso2:"VG", en:"British Virgin Islands", es:"Islas Vírgenes Británicas", code:"1284" },
        { iso2:"VI", en:"U.S. Virgin Islands", es:"Islas Vírgenes de EE. UU.", code:"1340" },
        { iso2:"YE", en:"Yemen", es:"Yemen", code:"967" },
        { iso2:"ZM", en:"Zambia", es:"Zambia", code:"260" },
        { iso2:"ZW", en:"Zimbabwe", es:"Zimbabue", code:"263" }
      ];

      const COUNTRY_STORAGE = { ISO2: "lumiCountryIso2", LOCKED: "lumiCountryLocked" };
      let selectedCountry = null;
      let countryLocked = false;

      function flagEmoji(iso2) {
        if (!iso2 || iso2.length !== 2) return "🏳️";
        const codePoints = iso2
          .toUpperCase()
          .split("")
          .map((c) => 127397 + c.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
      }

      function countryDisplayName(country) {
        return getLanguage() === "en" ? country.en : country.es;
      }

      function countryLabel(country) {
        return `${flagEmoji(country.iso2)} ${countryDisplayName(country)}  +${country.code}`;
      }

      function closeCountryOptions() {
        const list = getElement("countryOptions");
        const input = getElement("countryInput");
        if (list) { list.hidden = true; list.innerHTML = ""; }
        if (input) input.setAttribute("aria-expanded", "false");
      }

      function renderCountryOptions(query) {
        const list = getElement("countryOptions");
        const input = getElement("countryInput");
        if (!list || countryLocked) return;

        const q = (query || "").trim().toLowerCase().replace(/^\+/, "");
        const matches = !q
          ? COUNTRIES
          : COUNTRIES.filter((c) =>
              c.en.toLowerCase().includes(q) ||
              c.es.toLowerCase().includes(q) ||
              c.iso2.toLowerCase() === q ||
              c.code.includes(q)
            );

        if (!matches.length) {
          list.innerHTML = `<li class="country-empty">${getCopy().noCountryMatches}</li>`;
        } else {
          list.innerHTML = matches
            .map(
              (c) => `
                <li class="country-option" data-iso2="${c.iso2}" role="option">
                  <span class="flag">${flagEmoji(c.iso2)}</span>
                  <span class="name">${countryDisplayName(c)}</span>
                  <span class="dial">+${c.code}</span>
                </li>
              `
            )
            .join("");
        }
        list.hidden = false;
        if (input) input.setAttribute("aria-expanded", "true");
      }

      function updatePhoneBadge() {
        const flagEl = getElement("phoneFlagEmoji");
        const dialEl = getElement("phoneDialCode");
        if (selectedCountry) {
          if (flagEl) flagEl.textContent = flagEmoji(selectedCountry.iso2);
          if (dialEl) dialEl.textContent = `+${selectedCountry.code}`;
        } else {
          if (flagEl) flagEl.textContent = "🏳️";
          if (dialEl) dialEl.textContent = "+--";
        }
      }

      function selectCountryByIso2(iso2, options) {
        const country = COUNTRIES.find((c) => c.iso2 === iso2);
        if (!country) return;
        selectedCountry = country;

        const input = getElement("countryInput");
        if (input) input.value = countryLabel(country);

        closeCountryOptions();
        updatePhoneBadge();

        if (!options || options.persist !== false) {
          try { localStorage.setItem(COUNTRY_STORAGE.ISO2, country.iso2); } catch (e) { /* ignore */ }
        }
      }

      function applyCountryLockUI() {
        const btn = getElement("countryLockBtn");
        const input = getElement("countryInput");
        const activeCopy = getCopy();

        if (btn) {
          setLockIcon(btn, countryLocked);
          btn.classList.toggle("is-locked", countryLocked);
          btn.setAttribute("aria-pressed", countryLocked ? "true" : "false");
          btn.setAttribute("aria-label", countryLocked ? activeCopy.unlockCountryLabel : activeCopy.lockCountryLabel);
        }
        if (input) input.disabled = countryLocked;
        if (countryLocked) closeCountryOptions();
      }

      window.toggleCountryLock = function toggleCountryLock() {
        countryLocked = !countryLocked;
        try { localStorage.setItem(COUNTRY_STORAGE.LOCKED, countryLocked ? "1" : "0"); } catch (e) { /* ignore */ }
        applyCountryLockUI();
      };

      /* Try IP-based geolocation first (accurate, needs network); if it fails or
         times out, fall back to the browser's language/region setting. */
      async function detectCountryViaIP() {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 4000);
          const response = await fetch("https://ipwho.is/", { signal: controller.signal });
          clearTimeout(timeoutId);
          if (!response.ok) return null;
          const data = await response.json();
          if (data && data.success !== false && data.country_code) {
            return String(data.country_code).toUpperCase();
          }
          return null;
        } catch (e) {
          return null;
        }
      }

      function detectCountryViaLocale() {
        try {
          const langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language];
          for (const l of langs) {
            const parts = (l || "").split("-");
            if (parts.length > 1) {
              const region = parts[1].toUpperCase();
              if (COUNTRIES.some((c) => c.iso2 === region)) return region;
            }
          }
        } catch (e) { /* ignore */ }
        return null;
      }

      async function initCountryPicker() {
        let savedIso2 = null;
        try {
          countryLocked = localStorage.getItem(COUNTRY_STORAGE.LOCKED) === "1";
          savedIso2 = localStorage.getItem(COUNTRY_STORAGE.ISO2);
        } catch (e) { /* ignore */ }

        if (countryLocked && savedIso2) {
          selectCountryByIso2(savedIso2, { persist: false });
          applyCountryLockUI();
          return;
        }

        let iso2 = await detectCountryViaIP();
        if (!iso2) iso2 = detectCountryViaLocale();
        if (!iso2) iso2 = savedIso2;
        if (!iso2) iso2 = "CR";

        selectCountryByIso2(iso2);
        applyCountryLockUI();
      }

      function initCountryComboEvents() {
        const input = getElement("countryInput");
        const list = getElement("countryOptions");
        if (!input || !list) return;

        input.addEventListener("focus", () => {
          if (countryLocked) return;
          input.select();
          renderCountryOptions("");
        });

        input.addEventListener("input", () => {
          if (countryLocked) return;
          renderCountryOptions(input.value);
        });

        input.addEventListener("keydown", (e) => {
          if (countryLocked) return;
          if (e.key === "Escape") {
            closeCountryOptions();
            if (selectedCountry) input.value = countryLabel(selectedCountry);
            input.blur();
          } else if (e.key === "Enter") {
            e.preventDefault();
            const first = list.querySelector(".country-option[data-iso2]");
            if (first) selectCountryByIso2(first.dataset.iso2);
          }
        });

        input.addEventListener("blur", () => {
          setTimeout(() => {
            closeCountryOptions();
            if (selectedCountry) input.value = countryLabel(selectedCountry);
          }, 150);
        });

        list.addEventListener("mousedown", (e) => {
          // prevent input blur from closing the list before the click registers
          e.preventDefault();
        });

        list.addEventListener("click", (e) => {
          const li = e.target.closest(".country-option[data-iso2]");
          if (!li) return;
          selectCountryByIso2(li.dataset.iso2);
        });
      }

      function getLanguage() {
        const savedLanguage = localStorage.getItem("lumiLanguage");
        return savedLanguage === "en" ? "en" : "es";
      }

      function getCopy() {
        return copy[getLanguage()];
      }

      function getElement(id) {
        return document.getElementById(id);
      }

      /* Lock/unlock icons as inline SVG instead of emoji glyphs.
         Some Android emoji fonts render U+1F513 (open lock) almost
         identically to U+1F512 (closed lock) at small sizes, so the
         lock buttons appeared to never change state. Inline SVG renders
         identically on every platform (Android, iOS Safari, desktop). */
      const LOCK_ICON_CLOSED =
        '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 8 0v4"></path></svg>';
      const LOCK_ICON_OPEN =
        '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 7.75-1.4"></path></svg>';

      function setLockIcon(btn, isLocked) {
        if (!btn) return;
        btn.innerHTML = isLocked ? LOCK_ICON_CLOSED : LOCK_ICON_OPEN;
      }

      function getSavedText() {
        return localStorage.getItem(STORAGE_KEY) || "";
      }

      function saveText(text) {
        localStorage.setItem(STORAGE_KEY, text);
      }

      function getContactCount(text) {
        return text
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean).length;
      }

      function normalizePhone(phoneInput) {
        return phoneInput.replace(/\D/g, "");
}

      function getIAIDUrl() {
        return new URL("./index.html", window.location.href).href;
      }

      function buildWhatsappUrl(phone, message) {
        return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      }

      function setStatus(message, type) {
        const statusMessage = getElement("statusMessage");
        if (!statusMessage) return;

        statusMessage.textContent = message;
        statusMessage.classList.remove("success", "error");

        if (type) {
          statusMessage.classList.add(type);
        }
      }

      function updatePlaceholders() {
        const activeCopy = getCopy();

        const personName = getElement("personName");
        const phoneNumber = getElement("phoneNumber");
        const savedContactsText = getElement("savedContactsText");

        if (personName) personName.placeholder = activeCopy.namePlaceholder;
        if (phoneNumber) phoneNumber.placeholder = activeCopy.phonePlaceholder;
        if (savedContactsText) savedContactsText.placeholder = activeCopy.savedPlaceholder;

        const iaidMessageText = getElement("iaidMessageText");
        if (iaidMessageText) iaidMessageText.placeholder = activeCopy.messagePlaceholder;

        const countryInput = getElement("countryInput");
        if (countryInput) countryInput.placeholder = activeCopy.countryPlaceholder;
        if (selectedCountry && countryInput) countryInput.value = countryLabel(selectedCountry);
        applyCountryLockUI();

        document.documentElement.lang = getLanguage();
        document.title = activeCopy.documentTitle;
      }

      function renderSavedList() {
        const activeCopy = getCopy();
        const savedContactsText = getElement("savedContactsText");
        const savedCount = getElement("savedCount");
        const sendSavedListBtn = getElement("sendSavedListBtn");
        const clearSavedListBtn = getElement("clearSavedListBtn");

        const savedText = getSavedText();
        const count = getContactCount(savedText);
        const hasContacts = count > 0;

        if (savedContactsText && savedContactsText.value !== savedText) {
          savedContactsText.value = savedText;
        }

        if (savedCount) {
          savedCount.textContent = count === 1
            ? activeCopy.savedCountSingular
            : activeCopy.savedCountPlural(count);
        }

        [sendSavedListBtn, clearSavedListBtn].forEach((button) => {
          if (!button) return;

          if (hasContacts) {
            button.classList.remove("hidden-btn");
            button.classList.add("visible-btn");
          } else {
            button.classList.add("hidden-btn");
            button.classList.remove("visible-btn");
          }
        });
      }

      function appendContact(name, phoneInput) {
        const currentText = getSavedText().trim();
        const currentCount = getContactCount(currentText);
        const nextNumber = currentCount + 1;
        const newLine = `${nextNumber}. ${name} - ${phoneInput}`;

        const nextText = currentText
          ? `${currentText}\n${newLine}`
          : newLine;

        saveText(nextText);
        renderSavedList();
      }

      let editUnlocked = false;

      function applyEditLockUI() {
        const btn = getElement("editLockBtn");
        const textEl = getElement("editToggleText");
        const lang = getLanguage();

        if (btn) {
          setLockIcon(btn, !editUnlocked);
          btn.classList.toggle("is-locked", !editUnlocked);
          btn.setAttribute("aria-pressed", editUnlocked ? "true" : "false");
          btn.setAttribute(
            "aria-label",
            editUnlocked
              ? (lang === "en" ? "Lock editing" : "Bloquear edición")
              : (lang === "en" ? "Unlock to edit" : "Desbloquear para editar")
          );
        }

        if (textEl) {
          textEl.innerHTML = editUnlocked
            ? '<span class="lang-es">Editando. Toque el candado para bloquear.</span><span class="lang-en">Editing. Tap the lock to lock it again.</span>'
            : '<span class="lang-es">Bloqueado. Toque el candado para editar los nombres y teléfonos.</span><span class="lang-en">Locked. Tap the lock to edit the names and phone numbers.</span>';
        }
      }

      window.toggleEditLock = function toggleEditLock() {
        if (editUnlocked) {
          disableListEditing();
        } else {
          openEditConfirmModal();
        }
      };

      /* ======================
         QR MODAL (fade in/out)
      ====================== */

      const QR_FADE_MS = 240;
      let qrCloseTimer = null;

      window.openQrModal = function openQrModal() {
        const backdrop = getElement("qrModalBackdrop");
        const modal = getElement("qrModal");
        const closeBtn = document.querySelector(".qr-modal-close");
        if (!backdrop || !modal) return;

        if (qrCloseTimer) {
          clearTimeout(qrCloseTimer);
          qrCloseTimer = null;
        }

        backdrop.hidden = false;
        modal.hidden = false;

        // Force reflow so the transition runs from the hidden state.
        void modal.offsetWidth;

        backdrop.classList.add("is-open");
        modal.classList.add("is-open");

        setTimeout(() => {
          if (closeBtn) closeBtn.focus();
        }, QR_FADE_MS);
      };

      window.closeQrModal = function closeQrModal() {
        const backdrop = getElement("qrModalBackdrop");
        const modal = getElement("qrModal");
        const fabBtn = getElement("qrFabBtn");
        if (!backdrop || !modal) return;

        backdrop.classList.remove("is-open");
        modal.classList.remove("is-open");

        qrCloseTimer = setTimeout(() => {
          backdrop.hidden = true;
          modal.hidden = true;
          qrCloseTimer = null;
        }, QR_FADE_MS);

        if (fabBtn) fabBtn.focus();
      };

      function openEditConfirmModal() {
        const backdrop = getElement("editConfirmBackdrop");
        const modal = getElement("editConfirmModal");
        const yesBtn = getElement("confirmEditYesBtn");

        if (!backdrop || !modal) return;

        backdrop.hidden = false;
        modal.hidden = false;

        setTimeout(() => {
          if (yesBtn) yesBtn.focus();
        }, 0);
      }

      function closeEditConfirmModal() {
        const backdrop = getElement("editConfirmBackdrop");
        const modal = getElement("editConfirmModal");

        if (backdrop) backdrop.hidden = true;
        if (modal) modal.hidden = true;
      }

      function enableListEditing() {
        const savedContactsText = getElement("savedContactsText");
        const editWarning = getElement("editWarning");

        editUnlocked = true;
        applyEditLockUI();

        if (savedContactsText) {
          savedContactsText.readOnly = false;
          savedContactsText.classList.add("is-editable");
          savedContactsText.focus();
        }

        if (editWarning) {
          editWarning.hidden = false;
        }
      }

      function disableListEditing(options) {
        const shouldSaveTextarea = !options || options.saveTextarea !== false;
        const savedContactsText = getElement("savedContactsText");
        const editWarning = getElement("editWarning");

        editUnlocked = false;
        applyEditLockUI();

        if (savedContactsText) {
          savedContactsText.readOnly = true;
          savedContactsText.classList.remove("is-editable");

          if (shouldSaveTextarea) {
            saveText(savedContactsText.value.trim());
          }
        }

        if (editWarning) {
          editWarning.hidden = true;
        }

        renderSavedList();
      }

      window.sendIAIDAndSaveContact = function sendIAIDAndSaveContact() {
        const activeCopy = getCopy();
        const personName = getElement("personName");
        const phoneNumber = getElement("phoneNumber");

        const nameValue = personName ? personName.value.trim() : "";
        const localPhoneValue = phoneNumber ? phoneNumber.value.trim() : "";
        const localDigits = normalizePhone(localPhoneValue);

        if (!nameValue || !localPhoneValue) {
          setStatus(activeCopy.missingFields, "error");
          return;
        }

        if (!selectedCountry) {
          setStatus(activeCopy.missingCountry, "error");
          return;
        }

        if (!localDigits || localDigits.length < 4) {
          setStatus(activeCopy.invalidPhone, "error");
          return;
        }

        const fullPhone = `${selectedCountry.code}${localDigits}`;
        const displayPhone = `+${selectedCountry.code} ${localPhoneValue}`;

        appendContact(nameValue, displayPhone);

        const message = getIaidMessageToSend();
        const whatsappUrl = buildWhatsappUrl(fullPhone, message);

        if (personName) personName.value = "";
        if (phoneNumber) phoneNumber.value = "";
        refreshMessage();

        setStatus(activeCopy.contactSaved, "success");
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      };

      window.shareIAIDViaOtherApps = async function shareIAIDViaOtherApps() {
        const activeCopy = getCopy();
        const personName = getElement("personName");
        const phoneNumber = getElement("phoneNumber");

        if (!navigator.share) {
          setStatus(activeCopy.shareFailed, "error");
          return;
        }

        const nameValue = personName ? personName.value.trim() : "";
        const localPhoneValue = phoneNumber ? phoneNumber.value.trim() : "";
        const localDigits = normalizePhone(localPhoneValue);

        if (!nameValue || !localPhoneValue) {
          setStatus(activeCopy.missingFields, "error");
          return;
        }

        if (!selectedCountry) {
          setStatus(activeCopy.missingCountry, "error");
          return;
        }

        if (!localDigits || localDigits.length < 4) {
          setStatus(activeCopy.invalidPhone, "error");
          return;
        }

        const displayPhone = `+${selectedCountry.code} ${localPhoneValue}`;
        const url = getIAIDUrl();
        const message = getIaidMessageToSend();

        try {
          await navigator.share({ text: message, url: url });

          appendContact(nameValue, displayPhone);
          if (personName) personName.value = "";
          if (phoneNumber) phoneNumber.value = "";
          refreshMessage();

          setStatus(activeCopy.contactSavedShared, "success");
        } catch (error) {
          if (error && error.name === "AbortError") {
            setStatus(activeCopy.shareCancelled, "error");
          } else {
            setStatus(activeCopy.shareFailed, "error");
          }
        }
      };

      function initShareButton() {
        const shareBtn = getElement("shareOtherAppsBtn");
        if (shareBtn) shareBtn.hidden = !navigator.share;
      }

      /* ======================
         EDITABLE MESSAGE TEXT
         Design:
         - Unedited: textarea always shows the original coded message with the
           real current name substituted in (auto-updates as Name changes).
         - User edits the wording: the field freezes (stops full auto-regen) so
           their custom wording stays as typed, but the name "slot" keeps
           tracking Name field changes (see NAME_MARK below), and any literal
           occurrence of the current phone number keeps tracking Phone changes.
         - Lock: keeps the current custom wording as the persistent message
           going forward (survives reload) while the field is disabled from
           further manual edits. Name/Phone substitution keeps working while
           locked, so the same custom message can be reused for any contact.
         - Reset: fully reverts to the original coded message and unlocks.

         How name-tracking survives an EMPTY name at edit/lock time:
         Every auto-generated message wraps the name value between a pair of
         invisible zero-width markers (NAME_MARK), even when the name is "".
         Because the markers themselves are always present (adjacent to each
         other when the name is empty), a later name value can always be
         spliced in between them, regardless of what the name was originally.
      ====================== */

      const MESSAGE_STORAGE = {
        MANUAL_TEXT: "lumiMessageManualText",
        EDITED: "lumiMessageManuallyEdited",
        LOCKED: "lumiMessageLocked",
        BAKED_PHONE: "lumiMessageBakedPhone",
      };

      /* Zero-width space: invisible in the textarea/UI, used to mark the
         name's insertion point inside the message text. */
      const NAME_MARK = "\u200B";

      let messageManuallyEdited = false;
      let messageLocked = false;

      /* Last phone value known to be embedded in the custom text, used to
         find-and-replace it with the new phone value on Phone field changes. */
      let bakedPhone = "";

      function currentPersonName() {
        const personName = getElement("personName");
        return personName ? personName.value.trim() : "";
      }

      function currentDisplayPhone() {
        const phoneNumber = getElement("phoneNumber");
        const localPhoneValue = phoneNumber ? phoneNumber.value.trim() : "";
        if (!localPhoneValue) return "";
        return selectedCountry ? `+${selectedCountry.code} ${localPhoneValue}` : localPhoneValue;
      }

      /* The default coded message, with the name wrapped in invisible markers
         so its slot can always be found later, even if the name is empty. */
      function currentDefaultMessage() {
        return getCopy().iaidMessage(NAME_MARK + currentPersonName() + NAME_MARK, getIAIDUrl());
      }

      /* Splice a new name value between the two NAME_MARK occurrences in
         `text`, if found. Returns the text unchanged if no marker pair exists
         (e.g. the user deleted/overwrote that part of the message). */
      function applyNameToText(text, nameValue) {
        const source = String(text || "");
        const start = source.indexOf(NAME_MARK);
        if (start === -1) return source;
        const end = source.indexOf(NAME_MARK, start + NAME_MARK.length);
        if (end === -1) return source;
        return (
          source.slice(0, start + NAME_MARK.length) +
          nameValue +
          source.slice(end)
        );
      }

      /* Best-effort: replace the previously-known phone value with the new
         one, if it literally appears in the text (works once the user has
         actually typed a real phone number into their custom message). */
      function applyPhoneToText(text, previousPhone, nextPhone) {
        const source = String(text || "");
        if (!previousPhone || previousPhone === nextPhone) return source;
        return source.split(previousPhone).join(nextPhone);
      }

      function stripNameMarks(text) {
        return String(text || "").split(NAME_MARK).join("");
      }

      function persistMessageState() {
        try {
          localStorage.setItem(MESSAGE_STORAGE.LOCKED, messageLocked ? "1" : "0");
          localStorage.setItem(MESSAGE_STORAGE.EDITED, messageManuallyEdited ? "1" : "0");
          localStorage.setItem(MESSAGE_STORAGE.BAKED_PHONE, bakedPhone);
          const messageText = getElement("iaidMessageText");
          localStorage.setItem(MESSAGE_STORAGE.MANUAL_TEXT, messageText ? messageText.value : "");
        } catch (e) { /* ignore */ }
      }

      /* Re-applies the current Name/Phone into the message text. Call this
         whenever the Name or Phone fields change. */
      function refreshMessage() {
        const messageText = getElement("iaidMessageText");
        if (!messageText) return;

        if (!messageManuallyEdited) {
          messageText.value = currentDefaultMessage();
          bakedPhone = currentDisplayPhone();
          return;
        }

        /* Manually edited (locked or not): keep the custom wording, but
           update the name slot and any literal phone occurrence in place. */
        const nextPhone = currentDisplayPhone();
        let text = applyNameToText(messageText.value, currentPersonName());
        text = applyPhoneToText(text, bakedPhone, nextPhone);
        messageText.value = text;
        bakedPhone = nextPhone;
        persistMessageState();
      }

      window.resetIaidMessageToDefault = function resetIaidMessageToDefault() {
        messageManuallyEdited = false;
        messageLocked = false;
        bakedPhone = "";
        try {
          localStorage.removeItem(MESSAGE_STORAGE.MANUAL_TEXT);
          localStorage.removeItem(MESSAGE_STORAGE.EDITED);
          localStorage.removeItem(MESSAGE_STORAGE.LOCKED);
          localStorage.removeItem(MESSAGE_STORAGE.BAKED_PHONE);
        } catch (e) { /* ignore */ }
        refreshMessage();
        applyMessageLockUI();
      };

      function applyMessageLockUI() {
        const btn = getElement("messageLockBtn");
        const messageText = getElement("iaidMessageText");
        const activeCopy = getCopy();

        if (btn) {
          setLockIcon(btn, messageLocked);
          btn.classList.toggle("is-locked", messageLocked);
          btn.setAttribute("aria-pressed", messageLocked ? "true" : "false");
          btn.setAttribute("aria-label", messageLocked ? activeCopy.unlockMessageLabel : activeCopy.lockMessageLabel);
        }
        if (messageText) messageText.disabled = messageLocked;
      }

      window.toggleMessageLock = function toggleMessageLock() {
        if (!messageLocked) {
          /* Locking keeps whatever wording is currently shown (default or
             custom) as the persistent message going forward. */
          messageManuallyEdited = true;
          messageLocked = true;
          bakedPhone = currentDisplayPhone();
        } else {
          messageLocked = false;
        }

        persistMessageState();
        applyMessageLockUI();
      };

      function getIaidMessageToSend() {
        const messageText = getElement("iaidMessageText");
        const typed = messageText ? messageText.value.trim() : "";
        return stripNameMarks(typed) || currentDefaultMessage();
      }

      function initMessageField() {
        const personName = getElement("personName");
        const phoneNumber = getElement("phoneNumber");
        const messageText = getElement("iaidMessageText");

        let restoredLocked = false;
        let restoredEdited = false;
        let restoredManualText = "";
        let restoredBakedPhone = "";
        try {
          restoredLocked = localStorage.getItem(MESSAGE_STORAGE.LOCKED) === "1";
          restoredEdited = localStorage.getItem(MESSAGE_STORAGE.EDITED) === "1";
          restoredManualText = localStorage.getItem(MESSAGE_STORAGE.MANUAL_TEXT) || "";
          restoredBakedPhone = localStorage.getItem(MESSAGE_STORAGE.BAKED_PHONE) || "";
        } catch (e) { /* ignore */ }

        if ((restoredLocked || restoredEdited) && restoredManualText && messageText) {
          messageManuallyEdited = true;
          messageLocked = restoredLocked;
          bakedPhone = restoredBakedPhone;
          messageText.value = restoredManualText;
          refreshMessage();
        } else {
          refreshMessage();
        }

        applyMessageLockUI();

        if (personName) {
          personName.addEventListener("input", refreshMessage);
        }

        if (phoneNumber) {
          phoneNumber.addEventListener("input", refreshMessage);
        }

        if (messageText) {
          messageText.addEventListener("input", function () {
            messageManuallyEdited = true;
            persistMessageState();
          });
        }
      }

      window.sendSavedContactsList = function sendSavedContactsList() {
        const activeCopy = getCopy();
        const savedText = getSavedText().trim();

        if (!savedText) {
          setStatus(activeCopy.listEmpty, "error");
          renderSavedList();
          return;
        }

        const message = activeCopy.notifyMessage(savedText);
        const whatsappUrl = buildWhatsappUrl(FIXED_NOTIFY_PHONE, message);

        setStatus(activeCopy.listSent, "success");
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      };

      window.clearSavedContactsList = function clearSavedContactsList() {
        const activeCopy = getCopy();
        const savedContactsText = getElement("savedContactsText");

        saveText("");

        if (savedContactsText) {
          savedContactsText.value = "";
        }

        disableListEditing({ saveTextarea: false });
        renderSavedList();
        setStatus(activeCopy.listCleared, "success");
      };

      document.addEventListener("DOMContentLoaded", function () {
        const savedContactsText = getElement("savedContactsText");
        const confirmEditYesBtn = getElement("confirmEditYesBtn");
        const confirmEditNoBtn = getElement("confirmEditNoBtn");
        const editConfirmBackdrop = getElement("editConfirmBackdrop");

        updatePlaceholders();
        renderSavedList();
        applyEditLockUI();
        initCountryComboEvents();
        initCountryPicker();
        initShareButton();
        initMessageField();

        if (savedContactsText) {
          savedContactsText.addEventListener("input", function () {
            if (!savedContactsText.readOnly) {
              saveText(savedContactsText.value.trim());
              renderSavedList();
            }
          });
        }

        if (confirmEditYesBtn) {
          confirmEditYesBtn.addEventListener("click", function () {
            closeEditConfirmModal();
            enableListEditing();
          });
        }

        if (confirmEditNoBtn) {
          confirmEditNoBtn.addEventListener("click", function () {
            const activeCopy = getCopy();
            closeEditConfirmModal();
            disableListEditing();
            setStatus(activeCopy.editCancelled, "error");
          });
        }

        if (editConfirmBackdrop) {
          editConfirmBackdrop.addEventListener("click", function () {
            const activeCopy = getCopy();
            closeEditConfirmModal();
            disableListEditing();
            setStatus(activeCopy.editCancelled, "error");
          });
        }

        document.addEventListener("keydown", function (event) {
          const modal = getElement("editConfirmModal");
          const qrModal = getElement("qrModal");

          if (event.key === "Escape" && modal && !modal.hidden) {
            const activeCopy = getCopy();
            closeEditConfirmModal();
            disableListEditing();
            setStatus(activeCopy.editCancelled, "error");
          } else if (event.key === "Escape" && qrModal && !qrModal.hidden) {
            closeQrModal();
          }
        });
      });

      window.addEventListener("app:language-changed", function () {
        updatePlaceholders();
        renderSavedList();
        applyEditLockUI();
        refreshMessage();
        applyMessageLockUI();
      });
    })();