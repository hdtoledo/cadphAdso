# 🌿 Instrucciones para Google Gemini / Antigravity IDE

Este archivo orienta a los modelos de la familia **Google Gemini** y entornos de desarrollo basados en **Antigravity**.

---

## 📌 Documentos de Contexto Requeridos

Para operar de forma consistente en este repositorio, carga e interioriza los siguientes archivos de configuración:
- [`.ai/CONTEXTO_ADSO.md`](.ai/CONTEXTO_ADSO.md) → Contexto del programa ADSO, sede CADPH Garzón y enfoque formativo por proyectos.
- [`.ai/REGLAS_CODIGO.md`](.ai/REGLAS_CODIGO.md) → Estándares de HTML5 semántico, Tailwind CSS, JavaScript Vanilla, accesibilidad y Git.
- [`.ai/INDICE_MATERIALES.md`](.ai/INDICE_MATERIALES.md) → Mapeo curricular y rutas hacia las Guías de Aprendizaje en `material-formativo/`.
- [`docs/DisenoCurricularADSO.pdf`](docs/DisenoCurricularADSO.pdf) → Diseño curricular oficial del SENA (Código 228118).

---

## 🎯 Instrucciones Específicas
1. Respeta la estructura de carpetas modular (`components/`, `assets/css/`, `assets/js/`, `material-formativo/`).
2. Sigue el patrón de arquitectura modular de componentes: nunca cargues HTML monolítico en `explorar.html`, utiliza los componentes desacoplados en `components/layout/`, `components/views/` y `components/modals/`.
3. Mantén la estética institucional del SENA (Verde `#39A900`, azul profundo `#0c384a`, tipografía `Work Sans`).
4. Al interactuar con aprendices, ofrece explicaciones paso a paso y orientadas al aprendizaje autónomo.
