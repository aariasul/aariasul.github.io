(function () {
  "use strict";

  const STORAGE_KEYS = {
    CONTACTS: "aleLopezSavedContactsText",
    COUNTRY_ISO2: "aleLopezCountryIso2",
    COUNTRY_LOCKED: "aleLopezCountryLocked",
    MSG_MANUAL_TEXT: "aleLopezMessageManualText",
    MSG_MANUALLY_EDITED: "aleLopezMessageManuallyEdited",
    MSG_LOCKED: "aleLopezMessageLocked",
    MSG_BAKED_PHONE: "aleLopezMessageBakedPhone"
  };

  const NOTIFY_PHONE = "50684200056";
  const NAME_MARK = "\u200B";

  const LOCK_ICON_CLOSED =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="11" rx="2.5"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';
  const LOCK_ICON_OPEN =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="11" rx="2.5"></rect><path d="M7 11V7a5 5 0 0 1 9.5-2"></path></svg>';

  const copy = {
    es: {
      documentTitle: "Compartir Tarjeta — Alejandro López",
      namePlaceholder: "Nombre de la persona",
      phonePlaceholder: "Número local (sin código de país)",
      countryPlaceholder: "Buscar país o código...",
      messagePlaceholder: "El mensaje se generará automáticamente. Puede editarlo antes de enviar.",
      savedPlaceholder: "Aquí aparecerán los contactos guardados.",
      missingFields: "Ingrese nombre y teléfono antes de enviar.",
      missingCountry: "Seleccione un país antes de enviar.",
      invalidPhone: "Ingrese un número de teléfono válido.",
      noCountryMatches: "Sin resultados",
      contactSaved: "Contacto guardado. Abriendo WhatsApp...",
      listEmpty: "No hay contactos guardados todavía.",
      listSent: "Abriendo WhatsApp para enviar la lista...",
      listCleared: "Lista limpiada correctamente.",
      editCancelled: "Edición cancelada.",
      savedCountSingular: "1 contacto guardado",
      savedCountPlural: (c) => `${c} contactos guardados`,
      editLockedText: "Bloqueado. Toque para editar la lista.",
      editUnlockedText: "Editando. Toque el candado para guardar.",
      iaidMessage: (name, url) => `Hola ${name}. Te comparto la Tarjeta Interactiva de Negocios de Alejandro López (Asesoría Financiera): ${url}`,
      notifyMessage: (text) => `Lista de contactos - Alejandro López:\n\n${text}`
    },
    en: {
      documentTitle: "Share Card — Alejandro López",
      namePlaceholder: "Person's name",
      phonePlaceholder: "Local number (without country code)",
      countryPlaceholder: "Search country or code...",
      messagePlaceholder: "The message will be generated automatically. You can edit it before sending.",
      savedPlaceholder: "Saved contacts will appear here.",
      missingFields: "Enter name and phone before sending.",
      missingCountry: "Select a country before sending.",
      invalidPhone: "Enter a valid phone number.",
      noCountryMatches: "No matches",
      contactSaved: "Contact saved. Opening WhatsApp...",
      listEmpty: "No saved contacts yet.",
      listSent: "Opening WhatsApp to send the list...",
      listCleared: "List cleared successfully.",
      editCancelled: "Editing cancelled.",
      savedCountSingular: "1 saved contact",
      savedCountPlural: (c) => `${c} saved contacts`,
      editLockedText: "Locked. Tap to edit list.",
      editUnlockedText: "Editing. Tap lock to save.",
      iaidMessage: (name, url) => `Hello ${name}. I am sharing Alejandro López's Interactive Business Card (Financial Advisory) with you: ${url}`,
      notifyMessage: (text) => `Contact list - Alejandro López:\n\n${text}`
    }
  };

  const COUNTRIES = [
    { iso2:"CR", en:"Costa Rica", es:"Costa Rica", code:"506" },
    { iso2:"US", en:"United States", es:"Estados Unidos", code:"1" },
    { iso2:"MX", en:"Mexico", es:"México", code:"52" },
    { iso2:"PA", en:"Panama", es:"Panamá", code:"507" },
    { iso2:"CO", en:"Colombia", es:"Colombia", code:"57" },
    { iso2:"ES", en:"Spain", es:"España", code:"34" },
    { iso2:"NI", en:"Nicaragua", es:"Nicaragua", code:"505" },
    { iso2:"GT", en:"Guatemala", es:"Guatemala", code:"502" },
    { iso2:"SV", en:"El Salvador", es:"El Salvador", code:"503" },
    { iso2:"HN", en:"Honduras", es:"Honduras", code:"504" },
    { iso2:"CA", en:"Canada", es:"Canadá", code:"1" },
    { iso2:"CL", en:"Chile", es:"Chile", code:"56" },
    { iso2:"AR", en:"Argentina", es:"Argentina", code:"54" },
    { iso2:"PE", en:"Peru", es:"Perú", code:"51" }
  ];

  let selectedCountry = null;
  let countryLocked = false;
  let messageManuallyEdited = false;
  let messageLocked = false;
  let bakedPhone = "";
  let editUnlocked = false;

  function getLanguage() {
    try {
      return localStorage.getItem("aleLopezLanguage") === "en" ? "en" : "es";
    } catch (e) {
      return "es";
    }
  }

  function getCopy() { return copy[getLanguage()]; }
  function getEl(id) { return document.getElementById(id); }

  function flagEmoji(iso2) {
    if (!iso2 || iso2.length !== 2) return "🏳️";
    return String.fromCodePoint(...iso2.toUpperCase().split("").map((c) => 127397 + c.charCodeAt(0)));
  }

  function countryLabel(c) {
    const name = getLanguage() === "en" ? c.en : c.es;
    return `${flagEmoji(c.iso2)} ${name} +${c.code}`;
  }

  function closeCountryOptions() {
    const list = getEl("countryOptions");
    if (list) { list.hidden = true; list.innerHTML = ""; }
  }

  function renderCountryOptions(q) {
    const list = getEl("countryOptions");
    if (!list || countryLocked) return;
    const query = (q || "").trim().toLowerCase().replace(/^\+/, "");
    const matches = !query ? COUNTRIES : COUNTRIES.filter(c =>
      c.en.toLowerCase().includes(query) || c.es.toLowerCase().includes(query) || c.code.includes(query)
    );
    if (!matches.length) {
      list.innerHTML = `<li class="country-option">${getCopy().noCountryMatches}</li>`;
    } else {
      list.innerHTML = matches.map(c => `
        <li class="country-option" data-iso2="${c.iso2}">
          <span>${flagEmoji(c.iso2)}</span>
          <span>${getLanguage() === "en" ? c.en : c.es}</span>
          <span class="dial">+${c.code}</span>
        </li>
      `).join("");
    }
    list.hidden = false;
  }

  function selectCountryByIso2(iso2) {
    const country = COUNTRIES.find(c => c.iso2 === iso2) || COUNTRIES[0];
    selectedCountry = country;
    const input = getEl("countryInput");
    if (input) input.value = countryLabel(country);
    const flagEl = getEl("phoneFlagEmoji");
    const dialEl = getEl("phoneDialCode");
    if (flagEl) flagEl.textContent = flagEmoji(country.iso2);
    if (dialEl) dialEl.textContent = `+${country.code}`;
    closeCountryOptions();
    try { localStorage.setItem(STORAGE_KEYS.COUNTRY_ISO2, country.iso2); } catch (e) {}
  }

  window.toggleCountryLock = function () {
    countryLocked = !countryLocked;
    try { localStorage.setItem(STORAGE_KEYS.COUNTRY_LOCKED, countryLocked ? "1" : "0"); } catch (e) {}
    applyCountryLockUI();
  };

  function applyCountryLockUI() {
    const btn = getEl("countryLockBtn");
    const input = getEl("countryInput");
    if (btn) {
      btn.innerHTML = countryLocked ? LOCK_ICON_CLOSED : LOCK_ICON_OPEN;
      btn.classList.toggle("is-locked", countryLocked);
    }
    if (input) input.disabled = countryLocked;
    if (countryLocked) closeCountryOptions();
  }

  function applyEditLockUI() {
    const btn = getEl("editLockBtn");
    const toggleText = getEl("editToggleText");
    const c = getCopy();
    if (btn) {
      btn.innerHTML = editUnlocked ? LOCK_ICON_OPEN : LOCK_ICON_CLOSED;
      btn.classList.toggle("is-locked", !editUnlocked);
    }
    if (toggleText) {
      toggleText.textContent = editUnlocked ? c.editUnlockedText : c.editLockedText;
    }
  }

  function normalizePhone(val) { return val.replace(/\D/g, ""); }
  function getCardUrl() { return new URL("./index.html", window.location.href).href; }

  function getIaidMessageToSend() {
    const input = getEl("iaidMessageText");
    const typed = input ? input.value.trim() : "";
    return typed.replace(new RegExp(NAME_MARK, "g"), "") || defaultMessage();
  }

  function defaultMessage() {
    const name = getEl("personName")?.value.trim() || "";
    return getCopy().iaidMessage(NAME_MARK + name + NAME_MARK, getCardUrl());
  }

  function refreshMessage() {
    const input = getEl("iaidMessageText");
    if (!input) return;
    if (!messageManuallyEdited) {
      input.value = defaultMessage();
      return;
    }
    const name = getEl("personName")?.value.trim() || "";
    let text = input.value;
    const start = text.indexOf(NAME_MARK);
    if (start !== -1) {
      const end = text.indexOf(NAME_MARK, start + NAME_MARK.length);
      if (end !== -1) {
        text = text.slice(0, start + NAME_MARK.length) + name + text.slice(end);
        input.value = text;
      }
    }
  }

  function updatePlaceholders() {
    const c = getCopy();
    const pName = getEl("personName");
    const pPhone = getEl("phoneNumber");
    const pCountry = getEl("countryInput");
    const pMsg = getEl("iaidMessageText");
    const pSaved = getEl("savedContactsText");

    if (pName) pName.placeholder = c.namePlaceholder;
    if (pPhone) pPhone.placeholder = c.phonePlaceholder;
    if (pCountry) pCountry.placeholder = c.countryPlaceholder;
    if (pMsg) pMsg.placeholder = c.messagePlaceholder;
    if (pSaved) pSaved.placeholder = c.savedPlaceholder;

    applyEditLockUI();
    document.title = c.documentTitle;
    if (selectedCountry && pCountry) pCountry.value = countryLabel(selectedCountry);
  }

  window.resetIaidMessageToDefault = function () {
    messageManuallyEdited = false;
    messageLocked = false;
    try {
      localStorage.removeItem(STORAGE_KEYS.MSG_MANUAL_TEXT);
      localStorage.removeItem(STORAGE_KEYS.MSG_MANUALLY_EDITED);
      localStorage.removeItem(STORAGE_KEYS.MSG_LOCKED);
    } catch (e) {}
    refreshMessage();
    applyMessageLockUI();
  };

  window.toggleMessageLock = function () {
    messageLocked = !messageLocked;
    if (messageLocked) messageManuallyEdited = true;
    try {
      localStorage.setItem(STORAGE_KEYS.MSG_LOCKED, messageLocked ? "1" : "0");
      localStorage.setItem(STORAGE_KEYS.MSG_MANUALLY_EDITED, messageManuallyEdited ? "1" : "0");
      localStorage.setItem(STORAGE_KEYS.MSG_MANUAL_TEXT, getEl("iaidMessageText")?.value || "");
    } catch (e) {}
    applyMessageLockUI();
  };

  function applyMessageLockUI() {
    const btn = getEl("messageLockBtn");
    const txt = getEl("iaidMessageText");
    if (btn) {
      btn.innerHTML = messageLocked ? LOCK_ICON_CLOSED : LOCK_ICON_OPEN;
      btn.classList.toggle("is-locked", messageLocked);
    }
    if (txt) txt.disabled = messageLocked;
  }

  function setStatus(msg, type) {
    const status = getEl("statusMessage");
    if (!status) return;
    status.textContent = msg;
    status.className = "status-message " + (type || "");
  }

  function renderSavedList() {
    const listEl = getEl("savedContactsText");
    const countEl = getEl("savedCount");
    const sendBtn = getEl("sendSavedListBtn");
    const clearBtn = getEl("clearSavedListBtn");
    let text = "";
    try { text = localStorage.getItem(STORAGE_KEYS.CONTACTS) || ""; } catch (e) {}
    if (listEl) listEl.value = text;
    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
    if (countEl) countEl.textContent = lines.length === 1 ? getCopy().savedCountSingular : getCopy().savedCountPlural(lines.length);
    [sendBtn, clearBtn].forEach(b => {
      if (!b) return;
      if (lines.length > 0) { b.classList.remove("hidden-btn"); b.classList.add("visible-btn"); }
      else { b.classList.add("hidden-btn"); b.classList.remove("visible-btn"); }
    });
  }

  window.sendIAIDAndSaveContact = function () {
    const nameEl = getEl("personName");
    const phoneEl = getEl("phoneNumber");
    const name = nameEl?.value.trim();
    const phone = phoneEl?.value.trim();
    const digits = normalizePhone(phone || "");

    if (!name || !phone) { setStatus(getCopy().missingFields, "error"); return; }
    if (!selectedCountry) { setStatus(getCopy().missingCountry, "error"); return; }
    if (digits.length < 4) { setStatus(getCopy().invalidPhone, "error"); return; }

    const fullPhone = `${selectedCountry.code}${digits}`;
    let saved = "";
    try { saved = localStorage.getItem(STORAGE_KEYS.CONTACTS) || ""; } catch (e) {}
    const count = saved.split("\n").map(l => l.trim()).filter(Boolean).length;
    const newLine = `${count + 1}. ${name} - +${selectedCountry.code} ${phone}`;
    const nextText = saved.trim() ? `${saved.trim()}\n${newLine}` : newLine;
    try { localStorage.setItem(STORAGE_KEYS.CONTACTS, nextText); } catch (e) {}

    const msg = getIaidMessageToSend();
    const url = `https://wa.me/${fullPhone}?text=${encodeURIComponent(msg)}`;

    if (nameEl) nameEl.value = "";
    if (phoneEl) phoneEl.value = "";
    refreshMessage();
    renderSavedList();

    setStatus(getCopy().contactSaved, "success");
    window.open(url, "_blank", "noopener,noreferrer");
  };

  window.sendSavedContactsList = function () {
    let saved = "";
    try { saved = localStorage.getItem(STORAGE_KEYS.CONTACTS) || ""; } catch (e) {}
    if (!saved.trim()) { setStatus(getCopy().listEmpty, "error"); return; }
    const url = `https://wa.me/${NOTIFY_PHONE}?text=${encodeURIComponent(getCopy().notifyMessage(saved))}`;
    setStatus(getCopy().listSent, "success");
    window.open(url, "_blank", "noopener,noreferrer");
  };

  window.clearSavedContactsList = function () {
    try { localStorage.removeItem(STORAGE_KEYS.CONTACTS); } catch (e) {}
    renderSavedList();
    setStatus(getCopy().listCleared, "success");
  };

  window.toggleEditLock = function () {
    if (editUnlocked) {
      editUnlocked = false;
      const el = getEl("savedContactsText");
      if (el) {
        el.readOnly = true;
        try { localStorage.setItem(STORAGE_KEYS.CONTACTS, el.value.trim()); } catch (e) {}
      }
      applyEditLockUI();
    } else {
      getEl("editConfirmBackdrop").hidden = false;
      getEl("editConfirmModal").hidden = false;
    }
  };

  window.openQrModal = function () {
    getEl("qrModalBackdrop").hidden = false;
    getEl("qrModal").hidden = false;
  };

  window.closeQrModal = function () {
    getEl("qrModalBackdrop").hidden = true;
    getEl("qrModal").hidden = true;
  };

  document.addEventListener("DOMContentLoaded", function () {
    selectCountryByIso2("CR");
    applyCountryLockUI();
    applyMessageLockUI();
    applyEditLockUI();
    updatePlaceholders();
    refreshMessage();
    renderSavedList();

    getEl("confirmEditYesBtn")?.addEventListener("click", () => {
      getEl("editConfirmBackdrop").hidden = true;
      getEl("editConfirmModal").hidden = true;
      editUnlocked = true;
      const el = getEl("savedContactsText");
      if (el) { el.readOnly = false; el.focus(); }
      applyEditLockUI();
    });

    getEl("confirmEditNoBtn")?.addEventListener("click", () => {
      getEl("editConfirmBackdrop").hidden = true;
      getEl("editConfirmModal").hidden = true;
    });

    getEl("countryInput")?.addEventListener("input", (e) => renderCountryOptions(e.target.value));
    getEl("countryInput")?.addEventListener("focus", () => renderCountryOptions(""));
    getEl("countryOptions")?.addEventListener("click", (e) => {
      const li = e.target.closest(".country-option[data-iso2]");
      if (li) selectCountryByIso2(li.dataset.iso2);
    });

    getEl("personName")?.addEventListener("input", refreshMessage);
    getEl("phoneNumber")?.addEventListener("input", refreshMessage);
    getEl("iaidMessageText")?.addEventListener("input", () => {
      messageManuallyEdited = true;
    });
  });

  window.addEventListener("app:language-changed", function () {
    updatePlaceholders();
    refreshMessage();
    renderSavedList();
  });
})();
