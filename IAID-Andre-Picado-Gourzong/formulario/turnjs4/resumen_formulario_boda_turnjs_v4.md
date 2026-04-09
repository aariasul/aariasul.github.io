# 📘 PROYECTO: FORMULARIO INTERACTIVO DE BODA (FLIPBOOK)

---

## 🎯 OBJETIVO

Crear un formulario tipo flipbook donde el usuario completa información paso a paso y genera un resumen visual final.

---

## 🧠 CONTEXTO IMPORTANTE

* Usuario NO es programador
* Las instrucciones deben ser:

  * completas
  * listas para copiar/pegar
  * sin pedir buscar código

---

## ⚙️ METODOLOGÍA DE TRABAJO

### 🔧 PROMPT BASE

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
 - Return A COMPLETE, drop‑in html code chunks or code blocks (no placeholders, no “…”), that I can just cut and paste 1 after the other. 
 - No external CDNs/libraries. Plain HTML/CSS/JS only - Preserve all existing features and accessibility unless I asked to change them. 
 - Tell me if there are improvement opportunities in regards the functionalities I'm implementing. 
 - Include a short **Changelog** (what changed & where) and a **5–8 step Manual Test Checklist** I can run quickly. RESPONSE FORMAT: 
 - “Role Selected:” (state the chosen role(s)) 
 - “Plan:” (3–6 bullets; concise) 
 - “Assumptions/Questions:” (only if needed; max 2) 
 - “Changelog:” bullets 
 - “Manual Test Checklist:” bullets

## 🚫 REGLA DE ORO

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
## 🧱 ARQUITECTURA

### CONFIG MODULE

Define páginas y fondos

### FORM_STATE

Objeto global con todos los datos

### STORAGE MODULE

* loadState()
* saveField()
* applyStateToForm()

### EVENTS MODULE

Controla lógica dinámica

### PREVIEW MODULE

Genera resumen final

---

## 🧩 FUNCIONALIDADES ACTUALES

* Datos personales
* Alimentación
* Mesa dulce condicional
* Entretenimiento
* Sub-opciones músico
* Decoración
* Subida de imagen
* Compresión automática
* Preview
* Eliminación imagen
* Persistencia total

---

## 🖼️ IMAGEN

Flujo:

Usuario sube →
se comprime →
se guarda →
se muestra →
se persiste

---

## ➕ AGREGAR NUEVO CAMPO

1. HTML → data-field
2. FIELD_LABELS
3. FIELD_ORDER
4. lógica opcional

---

## ⚠️ ERRORES A EVITAR

* No cerrar funciones
* Código fuera de lugar
* Duplicar eventos
* Meter lógica global dentro de loops

---

## 🧪 CHECKLIST

* Navegación funciona
* Campos guardan
* Recarga mantiene estado
* Toggles funcionan
* Imagen funciona completa
* Preview correcto

---

## 🚀 FUTURO

* recorte tipo Canva
* animaciones
* PDF
* backend

---

## 📌 REGLA FINAL

Siempre pedir:

👉 "bloque completo para copiar y pegar"
