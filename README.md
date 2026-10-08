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

El portal ha sido diseñado replicando con máxima fidelidad la experiencia de usuario (**UI/UX**) y los estándares gráficos oficiales del ecosistema digital del SENA y **GOV.CO** (*SI Contratista / SENA Digital*):
- Barra superior gubernamental **GOV.CO** (`#3366CC`).
- Paleta de color institucional oficial del SENA: Verde institucional (`#39A900`), verde oscuro (`#007832`) y acentos de contraste.
- Barra lateral de navegación dinámica con perfil de instructor, botón colapsable e indicador de estado.
- Banner de bienvenida con resumen formativo del Huila y avance curricular del 100%.
- Tarjetas modulares de las **4 Fases del Proyecto Formativo** (Análisis, Planeación, Ejecución, Evaluación) con badges interactivos y modales de confirmación fieles al sistema.
- Modal de bienvenida / pantalla de login estilo portal estatal con glassmorphism.
- Soporte para accesibilidad web (A+/A-) y diseño 100% responsivo para computadores, tabletas y dispositivos móviles.

---

## 🎯 Estructura Curricular del Programa ADSO

El proyecto formativo está alineado con el [Diseño Curricular Oficial de ADSO](docs/DisenoCurricularADSO.pdf):

| Fase | Enfoque Principal | Tecnologías y Competencias Clave |
| :--- | :--- | :--- |
| **1. Análisis** | Requisitos de software, SRS (IEEE 830) y metodologías ágiles | Casos de uso UML, historias de usuario, entrevistas y levantamiento de requerimientos. |
| **2. Planeación** | Arquitectura de software, UI/UX y modelado de datos | Diagramas Entidad-Relación (MER), Normalización SQL (1FN-3FN), Wireframes en Figma. |
| **3. Ejecución** | Codificación Full Stack y servicios web | HTML5, Tailwind CSS, JavaScript, APIs RESTful, Python, Java, Git & GitHub. |
| **4. Evaluación** | Aseguramiento de calidad, testing y despliegue | Pruebas unitarias e integración, manuales técnicos y despliegue en GitHub Pages / Cloud. |

---

## 📂 Estructura del Repositorio

```text
cadphAdso/
├── 404.html                     # Página personalizada de error 404 para GitHub Pages
├── index.html                   # Portal principal interactivo y responsivo con UI/UX SENA
├── .gitignore                   # Exclusión de archivos temporales y del sistema
├── README.md                    # Documentación técnica y guía de despliegue
└── docs/
    └── DisenoCurricularADSO.pdf # Documento curricular oficial del SENA
```

---

## 🚀 Tecnologías Empleadas

- **HTML5 Semántico**: Estructura accesible y modular optimizada para SEO y lectores de pantalla.
- **Tailwind CSS (v3)**: Sistema de diseño atómico con paleta personalizada SENA y GOV.CO.
- **JavaScript Vanilla**: Lógica reactiva para conmutación de pestañas, acordeones, modales y menú lateral sin dependencias pesadas.
- **Google Fonts (Work Sans)**: Tipografía limpia acorde a los lineamientos del estado colombiano.
- **GitHub Pages**: Infraestructura de alojamiento estático rápido y continuo.

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

Para publicar este proyecto en la web de manera gratuita con GitHub Pages:

1. Realizar el commit y push de los cambios al repositorio:
   ```bash
   git add .
   git commit -m "feat: interfaz institucional SENA CADPH Garzón con Tailwind CSS"
   git branch -M main
   git push -u origin main
   ```

2. Ir al repositorio en GitHub:
   - Entra a `https://github.com/hdtoledo/cadphAdso`.
   - Haz clic en la pestaña **Settings** (Configuración) en la parte superior.
   - En el menú lateral izquierdo, haz clic en **Pages**.
   - En **Build and deployment > Source**, selecciona **Deploy from a branch**.
   - En **Branch**, selecciona la rama `main` y la carpeta `/ (root)`.
   - Haz clic en **Save** (Guardar).

3. En 1-2 minutos el sitio estará disponible públicamente en:
   **`https://hdtoledo.github.io/cadphAdso/`**

---

## 👨‍🏫 Información Institucional

- **Instructor Líder:** Héctor David Toledo García
- **Centro de Formación:** Centro Agroempresarial y Desarrollo Pecuario del Huila (CADPH)
- **Sede:** Garzón, Huila — Colombia
- **Entidad:** Servicio Nacional de Aprendizaje — SENA
- **Repositorio Oficial:** [github.com/hdtoledo/cadphAdso](https://github.com/hdtoledo/cadphAdso)

---

<div align="center">
  <sub>SENA Regional Huila • Formación Profesional Integral • Colombia</sub>
</div>
