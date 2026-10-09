# 🌿 Repositorio Formativo ADSO — CADPH Garzón (Huila)

<div align="center">

![SENA](https://img.shields.io/badge/SENA-Regional_Huila-39A900?style=for-the-badge&logo=sena&logoColor=white)
![CADPH](https://img.shields.io/badge/Centro-Agroempresarial_y_Desarrollo_Pecuario-007832?style=for-the-badge)
![ADSO](https://img.shields.io/badge/Programa-ADSO_2026-3366CC?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub_Pages-brightgreen?style=for-the-badge&logo=github)

### **Centro Agroempresarial y Desarrollo Pecuario del Huila — Sede Garzón**
### **Tecnólogo en Análisis y Desarrollo de Software (ADSO)**

[🌐 Ver Portal Web en GitHub Pages](https://hdtoledo.github.io/cadphAdso/) • [📄 Ver Repositorio en GitHub](https://github.com/hdtoledo/cadphAdso)

</div>

---

## 📌 Descripción del Proyecto

Este repositorio contiene el **Portal Institucional y Repositorio de Aprendizaje** para la formación del programa **Tecnólogo en Análisis y Desarrollo de Software (ADSO)** del **SENA**, adscrito al **Centro Agroempresarial y Desarrollo Pecuario del Huila (CADPH)** en el municipio de **Garzón, Huila**.

El portal ha sido diseñado bajo las mejores prácticas de **UI/UX**, rendimiento y accesibilidad web, reflejando la identidad corporativa oficial del **SENA**:
- **Paleta Institucional Oficial:** Verde SENA (`#39A900`), verde oscuro (`#0c384a` / `#007832`), azul petróleo profundo y acentos de alto contraste.
- **Barra Lateral de Altura Completa (Full-Height Sidebar):** Diseño moderno de 100vh con el escudo oficial del SENA como ancla de identidad, botón colapsable a modo compacto (84px) en escritorio y cajón desplegable (*off-canvas*) en móviles.
- **Barra Superior Limpia:** Barra blanca superior independiente para el área de contenido con indicador de ruta (*breadcrumbs*), píldora de avance formativo al 100%, botón de ayuda contextual y botón de salida a la pantalla de bienvenida.
- **Visor PDF Interactivo y Responsivo del Diseño Curricular:** Lector embebido directamente en HTML con soporte para desplazamiento bidireccional (scroll horizontal y vertical libre), ajuste automático al ancho de la pantalla (*Fit Width*), controles de zoom, paginación completa de las 69 páginas, gestos táctiles (*swipe*) en móviles y botón de descarga directa.
- **Estructura Curricular por Fases:** Módulos de las 4 fases del proyecto formativo (*Análisis, Planeación, Ejecución, Evaluación*) con modales interactivos de consulta técnica.
- **Sección «Acerca de ADSO»:** Pestaña dedicada con la ficha técnica detallada del programa, métricas de duración lectiva/productiva y la información del equipo de instructores.
- **Accesibilidad Web Integral (WCAG 2.1 / 2.2 AA):** Menú flotante persistente en todas las vistas con ajuste dinámico de tamaño de texto a nivel de raíz (`html` rem, de 80% a 150%), modo de alto contraste para baja visión, forzado de subrayado de enlaces para daltonismo, modo de lectura clara con espaciado expandido, enlace de salto para teclado (*skip link*) y persistencia automática en `localStorage`.

---

## 🎯 Estructura Curricular del Programa ADSO

El proyecto formativo está alineado con el [Diseño Curricular Oficial de ADSO (Código 228118)](docs/DisenoCurricularADSO.pdf):

| Fase | Enfoque Principal | Tecnologías y Competencias Clave |
| :--- | :--- | :--- |
| **1. Análisis** | Requisitos de software, SRS (IEEE 830) y metodologías ágiles | Casos de uso UML, historias de usuario, entrevistas y levantamiento de requerimientos. |
| **2. Planeación** | Arquitectura de software, UI/UX y modelado de datos | Diagramas Entidad-Relación (MER), Normalización SQL (1FN-3FN), Wireframes en Figma. |
| **3. Ejecución** | Codificación Full Stack y servicios web | HTML5, Tailwind CSS, JavaScript, APIs RESTful, Python, Java, Git & GitHub. |
| **4. Evaluación** | Aseguramiento de calidad, testing y despliegue | Pruebas unitarias e integración, manuales técnicos y despliegue en GitHub Pages / Cloud. |

---

## 📖 Características del Visor de Diseño Curricular Integrado

Para optimizar la experiencia en computadores, tabletas y celulares, el visor de PDF integrado en `explorar.html` ofrece:

1. **Desplazamiento Bidireccional Fluido:** Contenedor optimizado con `overflow-x: auto` y `overflow-y: auto`, eliminando cualquier bloqueo de scroll en pantallas táctiles y ratón.
2. **Ajuste al Ancho de Pantalla (*Fit Width*):** En dispositivos móviles, calcula dinámicamente la escala para que el documento ocupe el 100% del ancho visible sin cortar texto a la derecha.
3. **Controles de Zoom en Vivo:** Botones de `Zoom -`, porcentaje de escala en tiempo real y `Zoom +` para lectura precisa de tablas técnicas.
4. **Paginación Interactiva (1 a 69):** Botones `◀ Anterior` / `Siguiente ▶` y cuadro de salto directo a cualquier página.
5. **Gestos Táctiles Móviles (*Swipe*):** Deslizar horizontalmente sobre la pantalla en teléfonos avanza o retrocede de página de forma intuitiva.
6. **Doble Modo de Visualización:**
   - **📱 Modo Adaptativo (Predeterminado):** Renderizado acelerado en HTML5 Canvas mediante **PDF.js** de Mozilla.
   - **📄 Modo Marco:** Visor alternativo en marco protegido con barras de desplazamiento visibles.
7. **Descarga Directa:** Botón institucional con el atributo nativo `download="DisenoCurricularADSO.pdf"`.
8. **Modo Pantalla Completa:** Botón para maximizar la lectura a toda la pantalla.

---

## 📂 Estructura del Repositorio

```text
cadphAdso/
├── 404.html                     # Página personalizada de error 404 para GitHub Pages
├── index.html                   # Portal principal de bienvenida / acceso institucional
├── explorar.html                # Dashboard y explorador curricular completo de ADSO
├── AGENTS.md                    # Directivas universales para agentes de Inteligencia Artificial
├── GEMINI.md                    # Contexto para Google Gemini / Antigravity IDE
├── CLAUDE.md                    # Instrucciones para Anthropic Claude / Claude Code
├── .cursorrules                 # Reglas de desarrollo para Cursor AI y Windsurf
├── .github/
│   └── copilot-instructions.md  # Instrucciones contextuales para GitHub Copilot
├── .ai/                         # 🧠 Base de conocimiento y contexto pedagógico para IAs
│   ├── CONTEXTO_ADSO.md         # Contexto institucional SENA CADPH, ficha y fases
│   ├── REGLAS_CODIGO.md         # Estándares técnicos y lineamientos de programación
│   ├── INDICE_MATERIALES.md     # Mapeo curricular de competencias y materiales
│   └── PROMPTS_ASISTENCIA.md    # Plantillas de prompts para aprendices e instructores
├── material-formativo/          # 📚 Depósito curricular de guías, talleres e instrumentos
│   ├── guias-aprendizaje/       # Guías organizadas por las 4 fases del proyecto
│   │   ├── Fase1_Analisis/      # Requisitos, especificación, levantamiento de información
│   │   ├── Fase2_Planeacion/    # Arquitectura, diseño de bases de datos, diagramas UML
│   │   ├── Fase3_Ejecucion/     # Desarrollo frontend/backend, codificación, APIs
│   │   └── Fase4_Evaluacion/    # Pruebas de software, despliegue, manuales técnicos
│   ├── instrumentos-evaluacion/ # Listas de chequeo, rúbricas y criterios de evaluación
│   └── talleres-ejercicios/     # Casos de estudio prácticos y ejercicios de codificación
├── assets/                      # Recursos estáticos organizados por buenas prácticas
│   ├── css/
│   │   └── styles.css           # Estilos institucionales, layout fluido, visor PDF y temas WCAG
│   ├── js/
│   │   ├── accessibility.js     # Módulo integral de accesibilidad (zoom, contraste, teclado)
│   │   ├── dashboard.js         # Lógica interactiva del explorador, pestañas y modales
│   │   └── pdf-viewer.js        # Motor interactivo de renderizado PDF con PDF.js
│   └── images/
│       └── sena_logo.svg        # Logotipo vectorial oficial del SENA
├── docs/
│   └── DisenoCurricularADSO.pdf # Documento curricular oficial del SENA (69 páginas)
├── .gitignore                   # Exclusión de temporales y configuraciones locales
└── README.md                    # Documentación técnica y guía de despliegue
```

---

## 🤖 Ecosistema de Asistencia con Inteligencia Artificial

Este repositorio integra una arquitectura agnóstica de contexto para **Inteligencia Artificial** diseñada para que cualquier modelo o agente (Google Gemini, Claude, ChatGPT, GitHub Copilot, Cursor AI, Windsurf, DeepSeek, etc.) comprenda de forma inmediata el contexto curricular del programa **ADSO (228118)** en el **CADPH Garzón**:

1. **Contexto Institucional Centralizado (`.ai/`):**
   - [`CONTEXTO_ADSO.md`](file:///.ai/CONTEXTO_ADSO.md): Explica las 4 fases formativas (Análisis, Planeación, Ejecución, Evaluación), el rol de los instructores y aprendices, y la metodología por proyectos SENA.
   - [`REGLAS_CODIGO.md`](file:///.ai/REGLAS_CODIGO.md): Define las normas de codificación pedagógicas (HTML semántico, Tailwind CSS / Vanilla CSS, JavaScript limpio, diseño accesible y responsivo).
   - [`INDICE_MATERIALES.md`](file:///.ai/INDICE_MATERIALES.md): Mapa de ruta curricular para que la IA sepa qué guía y competencia consultar según la fase solicitada.
   - [`PROMPTS_ASISTENCIA.md`](file:///.ai/PROMPTS_ASISTENCIA.md): Plantillas listas para usar orientadas a generar código limpio, diseñar bases de datos, elaborar guías y resolver dudas de aprendices.

2. **Puntos de Entrada Automáticos para Asistentes:**
   - [`AGENTS.md`](file:///AGENTS.md) — Agentes autónomos multiherramienta.
   - [`GEMINI.md`](file:///GEMINI.md) — Google Gemini y Antigravity.
   - [`CLAUDE.md`](file:///CLAUDE.md) — Anthropic Claude y Claude Code.
   - [`.cursorrules`](file:///.cursorrules) — Cursor AI y Windsurf.
   - [`.github/copilot-instructions.md`](file:///.github/copilot-instructions.md) — GitHub Copilot en Visual Studio Code.

3. **Depósito Institucional de Material Formativo (`material-formativo/`):**
   - Espacio reservado **exclusivamente para que el equipo de instructores** cargue el material oficial de formación, explicaciones técnicas de las sesiones, actividades de aprendizaje (AA) y las especificaciones/rúbricas de las evidencias que deben desarrollar los aprendices.
   - ⚠️ **Nota de Gobernanza y Alcance:** Los aprendices **NO** deben cargar en este repositorio sus evidencias resueltas ni archivos personales. La entrega, retroalimentación y calificación de evidencias se gestiona a través de la plataforma institucional designada (**Zajuna** / **Territorium**) o en los repositorios de código personales del aprendiz. Este repositorio actúa como la fuente oficial de consulta y directrices técnicas.

---

## 📥 Guía de Publicación de Material Formativo (Exclusivo para Instructores)

El repositorio está concebido como una plataforma institucional viva donde confluyen tres componentes:
1. **La Interfaz Web Institucional:** El portal de bienvenida ([`index.html`](file:///index.html)) y el dashboard curricular ([`explorar.html`](file:///explorar.html)) con visor de PDF integrado.
2. **El Depósito Curricular Oficial (`material-formativo/`):** Almacén organizado de guías, talleres y rúbricas administrado por instructores.
3. **El Contexto de IA (`.ai/`):** Instrucciones técnicas para que cualquier asistente inteligente entienda la formación SENA y asista tanto a aprendices como a formadores.

> [!IMPORTANT]
> **Gobernanza del Repositorio:**  
> Este espacio es administrado **únicamente por los instructores** para publicar guías de aprendizaje, explicaciones de sesiones, talleres e instrumentos de evaluación.  
> **Los aprendices son exclusivamente consultores y usuarios de este material**; no deben enviar *Pull Requests*, commits ni almacenar aquí el código o entregables de sus evidencias de formación.

---

### 1. Jerarquía y Orden Pedagógico del SENA

Para preservar la coherencia pedagógica oficial del SENA, todo material formativo que se agregue debe ubicarse respetando el ciclo del proyecto:

$$\text{Fase Formativa} \longrightarrow \text{Actividad de Proyecto (AP)} \longrightarrow \text{Guía de Aprendizaje (GA)} \longrightarrow \text{Actividad de Aprendizaje (AA)} \longrightarrow \text{Evidencia (EV)}$$

| Directorio | Tipo de Recurso | Tipo de Evidencias / Temáticas |
| :--- | :--- | :--- |
| [`material-formativo/guias-aprendizaje/Fase1_Analisis/`](file:///material-formativo/guias-aprendizaje/Fase1_Analisis/) | **Fase 1: Análisis** | Requisitos de software (SRS), historias de usuario, casos de uso, levantamiento y validación de información. |
| [`material-formativo/guias-aprendizaje/Fase2_Planeacion/`](file:///material-formativo/guias-aprendizaje/Fase2_Planeacion/) | **Fase 2: Planeación** | Arquitectura de software, diagramas de clases/secuencia UML, modelos relacionales/NoSQL, diseño UI/UX y prototipos. |
| [`material-formativo/guias-aprendizaje/Fase3_Ejecucion/`](file:///material-formativo/guias-aprendizaje/Fase3_Ejecucion/) | **Fase 3: Ejecución** | Codificación frontend, desarrollo backend, APIs RESTful, persistencia de datos, control de versiones en equipo. |
| [`material-formativo/guias-aprendizaje/Fase4_Evaluacion/`](file:///material-formativo/guias-aprendizaje/Fase4_Evaluacion/) | **Fase 4: Evaluación** | Pruebas unitarias/integración, aseguramiento de calidad (QA), despliegue a producción, manuales técnicos y de usuario. |
| [`material-formativo/instrumentos-evaluacion/`](file:///material-formativo/instrumentos-evaluacion/) | **Instrumentos de Evaluación** | Rúbricas y listas de chequeo que especifican los criterios de evaluación de cada evidencia. |
| [`material-formativo/talleres-ejercicios/`](file:///material-formativo/talleres-ejercicios/) | **Talleres y Laboratorios** | Guías de ejercicios prácticos, retos de código, laboratorios paso a paso y casos de estudio. |

---

### 2. Estándares y Convenciones de Nomenclatura

Para facilitar la indexación automática de los modelos de IA y la búsqueda por parte de los aprendices, nombra los archivos siguiendo estas pautas:

- **Guías de Aprendizaje Oficiales:**  
  `GA[Fase]-[CódigoCompetencia]-[Nombre_Descriptivo].pdf`  
  *Ejemplo:* `GA1-220501092-EspecificacionRequisitos.pdf`
- **Instrumentos de Evaluación (Rúbricas / Listas de Chequeo):**  
  `IE-[Guia]-AA[Actividad]-EV[Evidencia]-[Nombre].pdf`  
  *Ejemplo:* `IE-GA1-AA1-EV01-ListaChequeo.pdf`
- **Talleres y Prácticas:**  
  `Taller-[Tema]-[Tecnologia].md` *(o `.pdf`)*  
  *Ejemplo:* `Taller-Modelado-Datos-MySQL.md`
- **Formatos Recomendados:**  
  - **Markdown (`.md`):** Formato ideal para talleres y documentación de lectura directa por IA y humanos.
  - **PDF (`.pdf`):** Para documentos oficiales institucionales del SENA.
  - **DOCX / ZIP:** Si incluye plantillas editables o paquetes de código inicial.

---

### 3. Procedimiento Paso a Paso para Instructores

Para que un instructor publique nuevo material de formación, notas de sesión, talleres o especificaciones de evidencias en el repositorio:

1. **Identificar la Fase o Categoría:**
   Determina a qué fase formativa pertenece el recurso (Análisis, Planeación, Ejecución o Evaluación) o si corresponde a un instrumento o taller transversal.

2. **Depositar el Archivo:**
   Copia el archivo en la subcarpeta correspondiente dentro de `material-formativo/`.

3. **Registrar el Documento en el `README.md` Local:**
   Cada subcarpeta posee un archivo `README.md` que lista los materiales disponibles. Abre ese archivo y añade una fila o viñeta con el enlace:
   ```markdown
   - [📄 GA1-220501092-EspecificacionRequisitos.pdf](./GA1-220501092-EspecificacionRequisitos.pdf) — *Guía de levantamiento y especificación de requisitos*.
   ```

4. **Sincronizar el Índice para la IA (Recomendado):**
   Edita [`.ai/INDICE_MATERIALES.md`](file:///.ai/INDICE_MATERIALES.md) para registrar la nueva guía junto a su código de competencia. De esta forma, cualquier modelo de IA (Gemini, Copilot, ChatGPT, Claude) sabrá exactamente qué guía consultar cuando un aprendiz o instructor haga una pregunta técnica.

5. **Guardar y Publicar los Cambios con Git:**
   En la terminal del proyecto, ejecuta:
   ```bash
   # 1. Verificar los archivos agregados
   git status

   # 2. Agregar los nuevos archivos al control de versiones
   git add material-formativo/ .ai/

   # 3. Confirmar los cambios con un mensaje descriptivo
   git commit -m "docs: agregar Guía de Aprendizaje GA1-220501092 de Fase 1"

   # 4. Enviar los cambios al repositorio en GitHub
   git push origin main
   ```

---

## 🚀 Tecnologías Empleadas

- **HTML5 Semántico**: Estructura accesible y modular optimizada para SEO y lectores de pantalla.
- **Tailwind CSS (v3)**: Sistema de diseño atómico con paleta corporativa del SENA y transiciones fluidas.
- **JavaScript Vanilla**: Lógica reactiva para conmutación de pestañas, modales, modo colapsable y gestos táctiles.
- **PDF.js (Mozilla)**: Motor de renderizado en HTML5 Canvas para visualización fluida de documentos PDF en cualquier dispositivo.
- **Lucide Icons**: Iconografía moderna, consistente y de alto contraste.
- **Google Fonts (Work Sans)**: Tipografía limpia y profesional de alta legibilidad.
- **GitHub Pages**: Infraestructura de alojamiento estático continuo y seguro.

---

## 💻 Instrucciones de Uso Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/hdtoledo/cadphAdso.git
   cd cadphAdso
   ```

2. **Abrir en el navegador:**
   - Puedes abrir directamente el archivo `index.html` con doble clic o utilizando la extensión **Live Server** en Visual Studio Code.
   - Alternativamente, puedes iniciar un servidor local simple:
     ```bash
     # Con Python 3
     python -m http.server 8000
     ```
     Y abrir en el navegador `http://localhost:8000`.

---

## 🌐 Publicación en GitHub Pages

Para publicar este proyecto en la web con GitHub Pages:

1. Realizar el commit y push de los cambios al repositorio:
   ```bash
   git add .
   git commit -m "feat: interfaz institucional SENA CADPH Garzón y visor curricular interactivo"
   git branch -M main
   git push -u origin main
   ```

2. Configurar la publicación en GitHub:
   - Entra a `https://github.com/hdtoledo/cadphAdso`.
   - Haz clic en **Settings** (Configuración) > **Pages**.
   - En **Build and deployment > Source**, selecciona **Deploy from a branch**.
   - En **Branch**, selecciona la rama `main` y la carpeta `/ (root)`.
   - Haz clic en **Save** (Guardar).

3. El sitio estará disponible públicamente en:
   **`https://hdtoledo.github.io/cadphAdso/`**

---

## 👨‍🏫 Equipo de Instructores y Dirección Formativa

| Instructor | Rol / Área Formativa | Centro / Sede |
| :--- | :--- | :--- |
| **Héctor David Toledo García** | Instructor de Formación ADSO | CADPH — Garzón |
| **Moises Cartagena** | Instructor de Formación ADSO | CADPH — Garzón |
| **Julián Andrés Trujillo** | Instructor de Formación ADSO | CADPH — Garzón |
| **Jimmy Alexander Lombana** | Instructor de Formación ADSO | CADPH — Garzón |
| **Manuel Galíndez** | Instructor de Formación ADSO | CADPH — Garzón |
| **Gonzalo Chacón** | Instructor de Formación ADSO | CADPH — Garzón |
| **Diego Vargas** | Instructor de Formación ADSO | CADPH — Garzón |
| **Paulo Rincón** | Instructor de Formación ADSO | CADPH — Garzón |

---

## 🏛️ Información Institucional

- **Centro de Formación:** Centro Agroempresarial y Desarrollo Pecuario del Huila (CADPH)
- **Sede:** Garzón, Huila — Colombia
- **Entidad:** Servicio Nacional de Aprendizaje — SENA
- **Repositorio Oficial:** [github.com/hdtoledo/cadphAdso](https://github.com/hdtoledo/cadphAdso)

---

<div align="center">
  <sub>SENA Regional Huila • Formación Profesional Integral • Colombia</sub>
</div>
