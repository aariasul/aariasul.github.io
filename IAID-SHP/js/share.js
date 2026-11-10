(function () {
  "use strict";

  const STORAGE_KEYS = {
    CONTACTS: "shpSavedContactsText",
    COUNTRY_ISO2: "shpCountryIso2",
    COUNTRY_LOCKED: "shpCountryLocked",
    MSG_MANUAL_TEXT: "shpMessageManualText",
    MSG_MANUALLY_EDITED: "shpMessageManuallyEdited",
    MSG_LOCKED: "shpMessageLocked",
    MSG_BAKED_PHONE: "shpMessageBakedPhone",
    LANGUAGE: "shpLanguage"
  };

  const NOTIFY_PHONE = "50664537258";
  const NAME_MARK = "\u200B";

  const copy = {
    es: {
      documentTitle: "Compartir tarjeta | Silvia Herrera Porras",
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
        return `Hola ${name}. Le comparto la tarjeta interactiva de Silvia Herrera Porras - Servicio de Bartender y Salonera para Eventos: ${url}`;
      },
      notifyMessage: function (listText) {
        return `Lista de contactos de Silvia Herrera Porras:\n\n${listText}`;
      }
    },
    en: {
      documentTitle: "Share card | Silvia Herrera Porras",
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
        return `Hello ${name}. I am sharing Silvia Herrera Porras's interactive business card - Bartender & Event Waitstaff Services: ${url}`;
      },
      notifyMessage: function (listText) {
        return `Silvia Herrera Porras contact list:\n\n${listText}`;
      }
    }
  };

  const COUNTRIES = [
    { iso2:"CR", en:"Costa Rica", es:"Costa Rica", code:"506" },
    { iso2:"NI", en:"Nicaragua", es:"Nicaragua", code:"505" },
    { iso2:"PA", en:"Panama", es:"Panamá", code:"507" },
    { iso2:"US", en:"United States", es:"Estados Unidos", code:"1" },
    { iso2:"MX", en:"Mexico", es:"México", code:"52" },
    { iso2:"CO", en:"Colombia", es:"Colombia", code:"57" },
    { iso2:"ES", en:"Spain", es:"España", code:"34" },
    { iso2:"GT", en:"Guatemala", es:"Guatemala", code:"502" },
    { iso2:"HN", en:"Honduras", es:"Honduras", code:"504" },
    { iso2:"SV", en:"El Salvador", es:"El Salvador", code:"503" },
    { iso2:"AR", en:"Argentina", es:"Argentina", code:"54" },
    { iso2:"CL", en:"Chile", es:"Chile", code:"56" },
    { iso2:"PE", en:"Peru", es:"Perú", code:"51" },
    { iso2:"CA", en:"Canada", es:"Canadá", code:"1" },
    { iso2:"DO", en:"Dominican Republic", es:"República Dominicana", code:"1809" },
    { iso2:"EC", en:"Ecuador", es:"Ecuador", code:"593" },
    { iso2:"VE", en:"Venezuela", es:"Venezuela", code:"58" },
    { iso2:"BR", en:"Brazil", es:"Brasil", code:"55" },
    { iso2:"DE", en:"Germany", es:"Alemania", code:"49" },
    { iso2:"FR", en:"France", es:"Francia", code:"33" },
    { iso2:"IT", en:"Italy", es:"Italia", code:"39" },
    { iso2:"GB", en:"United Kingdom", es:"Reino Unido", code:"44" }
  ];

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

  function getLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEYS.LANGUAGE) === "en" ? "en" : "es";
    } catch (e) {
      return "es";
    }
  }

  function getCopy() {
    return copy[getLanguage()];
  }

  function getElement(id) {
    return document.getElementById(id);
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
      try { localStorage.setItem(STORAGE_KEYS.COUNTRY_ISO2, country.iso2); } catch (e) {}
    }
  }

  const LOCK_ICON_CLOSED =
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 8 0v4"></path></svg>';
  const LOCK_ICON_OPEN =
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 7.75-1.4"></path></svg>';

  function setLockIcon(btn, isLocked) {
    if (!btn) return;
    btn.innerHTML = isLocked ? LOCK_ICON_CLOSED : LOCK_ICON_OPEN;
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
    try { localStorage.setItem(STORAGE_KEYS.COUNTRY_LOCKED, countryLocked ? "1" : "0"); } catch (e) {}
    applyCountryLockUI();
  };

  async function detectCountryViaIP() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
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
    } catch (e) {}
    return null;
  }

  async function initCountryPicker() {
    let savedIso2 = null;
    try {
      countryLocked = localStorage.getItem(STORAGE_KEYS.COUNTRY_LOCKED) === "1";
      savedIso2 = localStorage.getItem(STORAGE_KEYS.COUNTRY_ISO2);
    } catch (e) {}

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
      e.preventDefault();
    });

    list.addEventListener("click", (e) => {
      const li = e.target.closest(".country-option[data-iso2]");
      if (!li) return;
      selectCountryByIso2(li.dataset.iso2);
    });
  }

  function getSavedText() {
    try {
      return localStorage.getItem(STORAGE_KEYS.CONTACTS) || "";
    } catch (e) {
      return "";
    }
  }

  function saveText(text) {
    try {
      localStorage.setItem(STORAGE_KEYS.CONTACTS, text);
    } catch (e) {}
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
    const iaidMessageText = getElement("iaidMessageText");
    const countryInput = getElement("countryInput");

    if (personName) personName.placeholder = activeCopy.namePlaceholder;
    if (phoneNumber) phoneNumber.placeholder = activeCopy.phonePlaceholder;
    if (savedContactsText) savedContactsText.placeholder = activeCopy.savedPlaceholder;
    if (iaidMessageText) iaidMessageText.placeholder = activeCopy.messagePlaceholder;
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
        ? '<span class="lang-es">Modo edición activo. Toque el candado para guardar.</span><span class="lang-en">Editing active. Tap lock to save.</span>'
        : '<span class="lang-es">Bloqueado. Toque el candado para editar la lista.</span><span class="lang-en">Locked. Tap lock to edit list.</span>';
    }
  }

  window.toggleEditLock = function toggleEditLock() {
    if (editUnlocked) {
      disableListEditing();
    } else {
      openEditConfirmModal();
    }
  };

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

  let messageManuallyEdited = false;
  let messageLocked = false;
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

  function currentDefaultMessage() {
    return getCopy().iaidMessage(NAME_MARK + currentPersonName() + NAME_MARK, getIAIDUrl());
  }

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
      localStorage.setItem(STORAGE_KEYS.MSG_LOCKED, messageLocked ? "1" : "0");
      localStorage.setItem(STORAGE_KEYS.MSG_MANUALLY_EDITED, messageManuallyEdited ? "1" : "0");
      localStorage.setItem(STORAGE_KEYS.MSG_BAKED_PHONE, bakedPhone);
      const messageText = getElement("iaidMessageText");
      localStorage.setItem(STORAGE_KEYS.MSG_MANUAL_TEXT, messageText ? messageText.value : "");
    } catch (e) {}
  }

  function refreshMessage() {
    const messageText = getElement("iaidMessageText");
    if (!messageText) return;

    if (!messageManuallyEdited) {
      messageText.value = currentDefaultMessage();
      bakedPhone = currentDisplayPhone();
      return;
    }

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
      localStorage.removeItem(STORAGE_KEYS.MSG_MANUAL_TEXT);
      localStorage.removeItem(STORAGE_KEYS.MSG_MANUALLY_EDITED);
      localStorage.removeItem(STORAGE_KEYS.MSG_LOCKED);
      localStorage.removeItem(STORAGE_KEYS.MSG_BAKED_PHONE);
    } catch (e) {}
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
      restoredLocked = localStorage.getItem(STORAGE_KEYS.MSG_LOCKED) === "1";
      restoredEdited = localStorage.getItem(STORAGE_KEYS.MSG_MANUALLY_EDITED) === "1";
      restoredManualText = localStorage.getItem(STORAGE_KEYS.MSG_MANUAL_TEXT) || "";
      restoredBakedPhone = localStorage.getItem(STORAGE_KEYS.MSG_BAKED_PHONE) || "";
    } catch (e) {}

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

    if (personName) personName.addEventListener("input", refreshMessage);
    if (phoneNumber) phoneNumber.addEventListener("input", refreshMessage);
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
    const whatsappUrl = buildWhatsappUrl(NOTIFY_PHONE, message);

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
