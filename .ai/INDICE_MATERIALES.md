# 📚 Índice de Materiales y Mapeo Curricular — ADSO CADPH

Este archivo actúa como el **mapa de enrutamiento** para que cualquier modelo de Inteligencia Artificial localice rápidamente las Guías de Aprendizaje, Instrumentos de Evaluación y Talleres correspondientes a cada fase del programa formativo.

---

## 🗺️ Mapa de Competencias vs. Fases Formativas

| Fase Formativa | Carpeta de Guías | Competencias Clave del Diseño Curricular |
| :--- | :--- | :--- |
| **Fase 1: Análisis** | [`material-formativo/guias-aprendizaje/Fase1_Analisis/`](../material-formativo/guias-aprendizaje/Fase1_Analisis/) | • Establecer los requisitos de la solución de software de acuerdo con estándares y procedimiento técnico.<br>• Diseñar la estructura de datos según los requisitos del cliente. |
| **Fase 2: Planeación** | [`material-formativo/guias-aprendizaje/Fase2_Planeacion/`](../material-formativo/guias-aprendizaje/Fase2_Planeacion/) | • Estructurar el plan de actividades de desarrollo de software.<br>• Modelar las funciones del software de acuerdo con el informe de requisitos.<br>• Diseñar artefactos del software usando herramientas de prototipado. |
| **Fase 3: Ejecución** | [`material-formativo/guias-aprendizaje/Fase3_Ejecucion/`](../material-formativo/guias-aprendizaje/Fase3_Ejecucion/) | • Desarrollar la solución de software de acuerdo con el diseño y metodologías de desarrollo.<br>• Implementar la base de datos de acuerdo con los requerimientos del software.<br>• Integrar componentes de software siguiendo especificaciones técnicas. |
| **Fase 4: Evaluación** | [`material-formativo/guias-aprendizaje/Fase4_Evaluacion/`](../material-formativo/guias-aprendizaje/Fase4_Evaluacion/) | • Verificar los entregables de desarrollo de software contra criterios de calidad y especificaciones.<br>• Desplegar la solución de software en el entorno de producción.<br>• Elaborar manuales técnicos y de usuario. |

---

## 📂 Organización de Carpetas en `material-formativo/`

```text
material-formativo/
│
├── guias-aprendizaje/
│   ├── Fase1_Analisis/         # Guías de levantamiento de requisitos, casos de uso, metodologías ágiles
│   ├── Fase2_Planeacion/       # Guías de modelado de datos (MER), arquitectura y prototipos UI/UX
│   ├── Fase3_Ejecucion/        # Guías de frontend, backend, APIs RESTful y persistencia
│   └── Fase4_Evaluacion/       # Guías de pruebas unitarias, manuales técnicos y despliegue
│
├── instrumentos-evaluacion/    # Listas de chequeo, rúbricas y criterios de evaluación de evidencias
│
└── talleres-ejercicios/        # Laboratorios prácticos, retos algorítmicos y talleres de codificación
```

---

## 🔍 Instrucciones para el Modelo de IA al Consultar Materiales

1. **Cuando el aprendiz o instructor consulte sobre una actividad específica:**
   - Identifica a qué fase pertenece (Análisis, Planeación, Ejecución o Evaluación).
   - Revisa la subcarpeta correspondiente en `material-formativo/guias-aprendizaje/`.
   - Si existen rúbricas o criterios de evaluación, consulta `material-formativo/instrumentos-evaluacion/`.
2. **Formato de Archivos Admitidos:**
   - Los materiales pueden estar en formato Markdown (`.md`), texto (`.txt`), Word (`.docx`) o PDF (`.pdf`).
   - El documento curricular base oficial de todo el programa se ubica en: [`docs/DisenoCurricularADSO.pdf`](../docs/DisenoCurricularADSO.pdf).
