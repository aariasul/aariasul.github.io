# Blueprint de Migración y Arquitectura: De Web Estática a Plataforma Dinámica en Supabase
**Caso de Estudio y Referencia Técnica: Proyecto Infomed (Perfiles de Emergencia QR)**

Este documento recopila de manera detallada todas las decisiones de ingeniería, soluciones a errores críticos en producción, esquemas de bases de datos y patrones de interfaz de usuario implementados y verificados. Su propósito es servir de guía exacta para replicar la arquitectura en proyectos homólogos basados en lectura rápida de perfiles por QR y administración web.

---

## 1. Arquitectura General y Flujo del Sistema

El sistema divide estrictamente la responsabilidad en dos aplicaciones web desacopladas que interactúan con un único backend en la nube: