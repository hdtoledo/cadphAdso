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
- **Accesibilidad Web Integral:** Menú flotante de accesibilidad para ajuste dinámico de tamaño de texto (A+ / A- / Restablecer) y contraste legible.

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
├── assets/                      # Recursos estáticos organizados por buenas prácticas
│   ├── css/
│   │   └── styles.css           # Estilos institucionales, layout fluido y visor PDF
│   ├── js/
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
