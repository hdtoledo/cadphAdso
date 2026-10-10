# 💻 Estándares de Codificación y Reglas Técnicas — ADSO SENA

Este documento define las directrices que cualquier modelo de IA debe seguir al generar, refactorizar o revisar código para el programa **Tecnólogo en Análisis y Desarrollo de Software (ADSO)** del **SENA CADPH Garzón**.

---

## 🛠️ Pila Tecnológica del Ecosistema Web

### 1. Frontend Web
- **HTML5 Semántico:** Uso estricto de elementos semánticos (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`). Prohibido el uso indiscriminado de `<div>` sin valor semántico.
- **Estilos (CSS):**
  - **Tailwind CSS (v3+):** Clases de utilidad ordenadas lógicamente (diseño responsive con prefijos `sm:`, `md:`, `lg:`).
  - **CSS Vanilla Complementario:** Para animaciones personalizadas, texturas institucionales (`.bg-sena-mesh`), personalización de barras de scroll (`.custom-scroll`) y reglas específicas de accesibilidad.
- **JavaScript (Vanilla ECMAScript 6+):**
  - Código modular, limpio y legible sin frameworks pesados en etapas iniciales.
  - Manejo asíncrono moderno (`async/await`, `fetch`, Promises).
  - Manejo seguro de eventos con `addEventListener` y funciones nombradas claras.
  - No usar librerías externas superfluas si una solución nativa es limpia y eficiente.

### 2. Arquitectura Modular de Componentes (`components/`)
- **Desacoplamiento Estricto:** Evitar archivos HTML monolíticos. Las páginas principales (como `explorar.html`) deben actuar como *shells declarativos ligeros* (< 120 líneas).
- **Estructura de Carpetas de Componentes:**
  - `components/layout/` → Componentes de navegación y estructura (`sidebar.html`, `header.html`, `footer.html`, `accessibility.html`).
  - `components/views/` → Vistas de pestañas y módulos (`tab-diseno.html`, `tab-guias.html`, `tab-fases.html`, `tab-ficha.html`).
  - `components/modals/` → Diálogos modulares y ventanas emergentes (`modal-curriculum.html`, `modal-session.html`, `modal-confirm.html`, `modal-assistant.html`).
- **Cargador Reactivo (`assets/js/component-loader.js`):**
  - Los componentes se referencian mediante placeholders: `<div data-component="components/layout/sidebar.html"></div>`.
  - El cargador inyecta los fragmentos asíncronamente y emite el evento global `adso:componentsLoaded`.
  - Los scripts de inicialización (`dashboard.js`, `guias-viewer.js`, `accessibility.js`) deben escuchar `adso:componentsLoaded` para enlazar interactividad y ejecutar `lucide.createIcons()`.

### 3. Backend & Persistencia (Fase 3: Ejecución)
- **Lenguajes Oficiales:** JavaScript / TypeScript (Node.js/Express), Python (FastAPI/Flask/Django) o Java (Spring Boot).
- **APIs:** Principios RESTful, códigos de estado HTTP semánticos (200, 201, 400, 401, 403, 404, 500), respuestas en JSON con formato estructurado `{ success, data, error }`.
- **Bases de Datos:**
  - SQL: MySQL, PostgreSQL, MariaDB (modelos normalizados en 3FN, claves foráneas e integridad referencial).
  - NoSQL: MongoDB para documentos JSON semiestructurados.

---

## 🎨 Identidad Visual y UI/UX SENA
- **Color Institucional Principal:** Verde SENA `#39A900` (`rgb(57, 169, 0)`).
- **Color Institucional Oscuro:** Azul petróleo / verde profundo `#0c384a` o `#082a38`.
- **Fondos de Contenido:** `#f0f3f6` o blanco `#ffffff`.
- **Tipografía Oficial:** `Work Sans` o tipografías sans-serif modernas de alta legibilidad (`Inter`, `system-ui`).
- **Iconografía:** Lucide Icons (`data-lucide="..."`) para consistencia y ligereza.
- **Micro-interacciones:** Transiciones suaves (`transition duration-200 hover:scale-[1.02]`), estados de foco visibles y sombras consistentes (`shadow-sm`, `shadow-md`).

---

## ♿ Accesibilidad Web (WCAG 2.1 Nivel AA)
- Contraste de color mínimo de 4.5:1 para texto normal.
- Todos los elementos interactivos (`<button>`, `<a>`, `<input>`) deben contar con atributos `title`, `aria-label` o texto visible descriptivo.
- Imágenes e íconos con atributos `alt` descriptivos o `aria-hidden="true"` si son puramente decorativos.
- Navegabilidad completa mediante teclado (`Tab`, `Enter`, `Escape`).

---

## 🌿 Convenciones de Git y Control de Versiones

### 1. Formato de Commits Semánticos
Usa siempre la convención Conventional Commits en español:
- `feat: [descripción]` → Nueva funcionalidad o módulo formativo.
- `fix: [descripción]` → Corrección de errores o bugs.
- `docs: [descripción]` → Cambios en documentación o guías.
- `style: [descripción]` → Ajustes visuales, diseño o maquetación sin alterar lógica.
- `refactor: [descripción]` → Reestructuración de código sin alterar su comportamiento.
- `test: [descripción]` → Pruebas unitarias o de integración.

### 2. Estructura de Ramas
- `main` → Rama de producción estable desplegada en GitHub Pages.
- `desarrollo` / `feature/[nombre]` → Ramas de trabajo para aprendices y actividades.

---

## 📝 Documentación en el Código
- Todo script o función relevante debe incluir comentarios concisos tipo JSDoc o docstrings en español explicando:
  1. ¿Qué hace la función?
  2. Parámetros que recibe (`@param`).
  3. Valor de retorno (`@returns`).
- Incluir comentarios didácticos en secciones complejas para facilitar el aprendizaje de los aprendices.
