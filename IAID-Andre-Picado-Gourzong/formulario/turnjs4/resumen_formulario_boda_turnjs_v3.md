# 📘 Proyecto: Formulario Tipo Flipbook (MiniShopCR Style)

## 🧠 Estado actual del proyecto

Sistema tipo flipbook con múltiples filminas que:

* Guarda datos automáticamente (`FORM_STATE`)
* Persiste en `localStorage`
* Permite navegación libre entre páginas
* Tiene validación antes de enviar
* Genera un **preview automático dinámico y ordenado**
* Soporta campos condicionales
* Escalable para múltiples filminas

---

# 🧩 Arquitectura del sistema

## 🔹 1. Fuente de verdad

```js
const FORM_STATE = {};
```

👉 Aquí se guarda TODO el formulario.

---

## 🔹 2. Inputs conectados

Todos los campos deben tener:

```html
data-field="nombre_campo"
```

Ejemplo:

```html
<input type="text" data-field="nombre_1">
<input type="radio" name="paquete" value="oro" data-field="paquete">
<input type="checkbox" data-field="notario">
```

---

## 🔹 3. Guardado automático

```js
document.addEventListener("input", e => {
    if(e.target.dataset.field){
        saveField(e.target);
    }
});

document.addEventListener("change", e => {
    if(e.target.dataset.field){
        saveField(e.target);
    }
});
```

---

## 🔹 4. Guardado manual (CRÍTICO)

Antes de enviar:

```js
function submitForm() {
    saveAllFields(); // 🔥 IMPORTANTE

    const errors = validateAllFields();

    if(errors.length > 0){
        showErrorModal(errors);
        return;
    }

    const html = buildSummaryHTML(FORM_STATE);
    showSummaryModal(html);
}
```

---

# 📋 Preview Automático

## 🔹 FIELD_LABELS

Define cómo se muestra cada campo:

```js
const FIELD_LABELS = {
    nombre_1: "Nombre persona 1",
    paquete: "Paquete seleccionado",
    notas: "Notas adicionales"
};
```

---

## 🔹 FIELD_ORDER

Controla el orden del preview:

```js
const FIELD_ORDER = [
    "tipo_boda",
    "nombre_1",
    "telefono_1",
    "nombre_2",
    "telefono_2",

    "estacion",
    "plan",
    "vestimenta",

    "cantidad_personas",
    "fecha",
    "hora",

    "locacion_texto",
    "duracion",

    "horaExtraToggle",
    "horas_extra",
    "notario",

    "notas",
    "paquete",

    "degustacion_alimentacion",
    "degustacion_mesa_dulce"
];
```

---

## 🔹 Generación del preview

```js
function buildSummaryHTML(data){

    let html = `<div><h3>Resumen</h3>`;

    FIELD_ORDER.forEach(key => {
        const label = FIELD_LABELS[key] || key;
        const value = formatValue(key, data[key], data);

        html += `<b>${label}:</b> ${value}<br>`;
    });

    html += `</div>`;
    return html;
}
```

---

## 🔹 Formateo de valores

```js
function formatValue(key, value, data){

    if(key === "paquete"){
        if(value === "oro") return "Paquete Oro";
        if(value === "plata") return "Paquete Plata";
        if(value === "bronce") return "Paquete Bronce";
    }

    if(typeof value === "boolean"){
        return value ? "Sí" : "No";
    }

    if(key === "horas_extra" && !data.horaExtraToggle){
        return "No aplica";
    }

    if(!value){
        return "-";
    }

    return value;
}
```

---

# ➕ Cómo agregar nuevos campos (PROCEDIMIENTO OFICIAL)

## PASO 1 — HTML

```html
<input type="text" data-field="nuevo_campo">
```

---

## PASO 2 — (opcional) FIELD_LABELS

```js
nuevo_campo: "Nuevo campo"
```

---

## PASO 3 — FIELD_ORDER

```js
"nuevo_campo",
```

---

## PASO 4 — (opcional) lógica especial

```js
if(key === "nuevo_campo"){
    return "Texto personalizado";
}
```

---

## 🧠 Resultado

👉 Automáticamente:

* Se guarda
* Se persiste
* Aparece en preview

---

# 🎛️ Campos especiales

## 🔹 Toggle / checkbox

```html
<input type="checkbox" data-field="notario">
```

---

## 🔹 Radio

```html
<input type="radio" name="paquete" value="oro" data-field="paquete">
```

---

## 🔹 Campo condicional

```js
if(key === "horas_extra" && !data.horaExtraToggle){
    return "No aplica";
}
```

---

# 🎨 UI dinámica (ejemplo paquete)

```js
function updatePaqueteBackground(){

    const container = document.getElementById("paqueteContainer");

    container.classList.remove("paquete-bronce","paquete-plata","paquete-oro");

    if(FORM_STATE.paquete === "bronce"){
        container.classList.add("paquete-bronce");
    }

    if(FORM_STATE.paquete === "plata"){
        container.classList.add("paquete-plata");
    }

    if(FORM_STATE.paquete === "oro"){
        container.classList.add("paquete-oro");
    }
}
```

---

# ⚠️ Errores comunes (MUY IMPORTANTE)

## ❌ Falta de coma

```js
notas: "Notas"
paquete: "Paquete"
```

👉 rompe TODO

---

## ❌ FIELD_ORDER incompleto

```js
"paquete",
/* siguiente bloque */
```

👉 rompe el script

---

## ❌ Falta data-field

```html
<input type="radio" value="oro">
```

👉 NO se guarda

---

## ❌ No usar saveAllFields()

👉 último slide no se guarda

---

# 🧪 Checklist de validación

* [ ] Campos guardan correctamente
* [ ] Persisten al recargar
* [ ] Preview muestra TODO
* [ ] Orden correcto
* [ ] Booleanos → Sí / No
* [ ] Condicionales funcionan
* [ ] Navegación no rompe datos

---

# 🚀 Próximos pasos recomendados

## 1. Terminar todas las filminas

## 2. Validación completa

## 3. Preview agrupado por secciones

## 4. Lógica de negocio (precios, paquetes)

## 5. Exportación (PDF / email)

---

# 💡 Regla de oro del sistema

```txt
Nuevo campo → data-field → FIELD_LABELS → FIELD_ORDER
```

👉 Con eso TODO funciona automáticamente

---

# 🧠 Estado final

Sistema:

* Escalable
* Modular
* Sin mantenimiento manual del preview
* Listo para convertirse en producto real

---

**Fin del documento**
