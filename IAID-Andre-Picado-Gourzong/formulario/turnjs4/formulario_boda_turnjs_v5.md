# 📘 PROYECTO: FORMULARIO INTERACTIVO DE BODA (FLIPBOOK)

---

## 🎯 OBJETIVO

Crear un formulario tipo flipbook donde el usuario completa información paso a paso y genera un resumen visual final (preview tipo cotización).

---

## 🧠 CONTEXTO IMPORTANTE

* Usuario NO es programador
* Las instrucciones deben ser:

  * completas
  * listas para copiar/pegar
  * sin ambigüedad
  * sin pedir buscar código manualmente

---

# ⚙️ METODOLOGÍA DE TRABAJO

## 🔧 PROMPT BASE

Act as a Front‑End Orchestrator that automatically selects the best specialist role for each request and produces production‑ready deliverables.
YOUR JOB: 
1) Read my request and AUTO‑SELECT the most suitable role(s) below. If the task spans multiple skills, pick a primary and add any secondary roles.
 - Or more Roles if needed:
 • Wedding Planner
 • Event Designer
 • Senior Front‑End Engineer & UX Writer (build/modify features, maintain UX copy)
 • Accessibility Engineer (WCAG 2.2 AA) • Performance Architect (perf & maintainability)
 • Search UX Engineer (query logic, filters, highlighting)
 • UI Theming/Design Systems Stylist (visual polish—keep structure, improve tokens)
 • QA Tester (acceptance tests, regression checklist)
 • Expert phycologyst
 • Expert neurocience
 2) If details are ambiguous, ask up to **2 brief clarifying questions**; otherwise proceed with reasonable defaults and state them. 
 3) Deliverables & formatting (non‑negotiable): 

 - Tell me if there are improvement opportunities in regards the functionalities I'm implementing. 
 - Include a short **Changelog** (what changed & where) and a **5–8 step Manual Test Checklist** I can run quickly. RESPONSE FORMAT: 
 - “Role Selected:” (state the chosen role(s)) 
 - “Plan:” (3–6 bullets; concise) 
 - “Assumptions/Questions:” (only if needed; max 2) 
 - “Changelog:” bullets 
 - “Manual Test Checklist:” bullets

---

## 🚫 REGLA DE ORO (CRITICA)

❌ NO dar instrucciones tipo:
> "busca esto y agrega esto"

✅ SIEMPRE dar:
> "reemplaza este bloque completo por este otro"

Ejemplo de un bloque a reemplazar:

```js
/* ======================
   BACKGROUNDS MODULE
====================== */
function getBackgroundForPage(index) {
    if (!CONFIG.UNIQUE_BACKGROUND) return CONFIG.GLOBAL_BG;
    return CONFIG.PAGE_BACKGROUNDS[index] || CONFIG.GLOBAL_BG;
}

function applyBackgrounds() {
    $(".flipbook .page").each(function(index) {
        const bg = getBackgroundForPage(index);

        this.style.backgroundImage = `url("${bg}")`;
        this.style.backgroundSize = "cover";
        this.style.backgroundPosition = "center";
    });
}
```

# 🧱 ARQUITECTURA ACTUAL

CONFIG  
STATE  
DOM MAP  
MENU / UI  
TURNJS  
STORAGE  
SWITCH LABELS  
VALIDATION  
PREVIEW  
SUBMIT  
EVENTS  

---

# 🧠 MÓDULOS CLAVE

## 🔹 STATE MODULE
const FORM_STATE = {};

## 🔹 DOM MAP MODULE
Centraliza accesos al DOM

## 🔹 EVENTS MODULE
Controla toda la lógica dinámica

## 🔹 SWITCH LABELS
Actualiza Sí / No automáticamente

## 🔹 VALIDATION
Validación unificada

## 🔹 PREVIEW
Resumen dinámico final

## 🔹 TURNJS
Inicializa flipbook y eventos

---

# 📊 FLUJO DEL SISTEMA

Usuario input → saveField → FORM_STATE → localStorage → Preview → Submit

---

# 🧩 FUNCIONALIDADES

✔ Datos personales  
✔ Alimentación  
✔ Mesa dulce  
✔ Entretenimiento  
✔ Músico  
✔ Decoración  
✔ Imagen  
✔ Preview  
✔ Persistencia  

---

# ➕ AGREGAR NUEVO CAMPO

1. HTML → data-field  
2. FIELD_LABELS  
3. FIELD_ORDER  
4. lógica opcional  

---

# ⚠️ ERRORES A EVITAR

- Eventos duplicados  
- DOM desordenado  
- Validación duplicada  
- Base64 visible  
- Campos fuera de FIELD_ORDER  

---

# 🧪 CHECKLIST

✔ Navegación funciona  
✔ Campos guardan  
✔ Recarga mantiene estado  
✔ Toggles funcionan  
✔ Preview correcto  

---

# 🚀 FUTURO

- PDF  
- Backend  
- Diseño pro  
- Automatización  

---

# 📌 REGLA FINAL

Siempre pedir:

👉 "dame el bloque completo para copiar y pegar"
