# 💡 Guía de Prompts para Aprendices e Instructores — ADSO SENA

Esta guía contiene plantillas de prompts optimizadas para interactuar con la Inteligencia Artificial (**Claude, Gemini, ChatGPT, Cursor, Copilot, etc.**) en este repositorio, asegurando respuestas didácticas, técnicas y alineadas con la formación SENA.

---

## 🧑‍🎓 Prompts para Aprendices

### 1. Para Explicación de Conceptos Teóricos o Algorítmicos
```markdown
Actúa como mi mentor de desarrollo de software del SENA CADPH Garzón.
Revisa las reglas de `.ai/REGLAS_CODIGO.md` y explícame el concepto de [CONCEPTO, ej: Normalización de Bases de Datos en 3FN / Promesas en JavaScript].
Por favor explícalo con una analogía del mundo real, un diagrama conceptual en texto o Mermaid, y un ejemplo de código práctico con comentarios didácticos en español.
```

### 2. Para Resolver una Evidencia o Guía de Aprendizaje
```markdown
Estoy trabajando en la Guía de Aprendizaje de la [FASE: Fase 1 Análisis / Fase 2 Planeación / Fase 3 Ejecución / Fase 4 Evaluación].
Consulta el archivo correspondiente en `material-formativo/guias-aprendizaje/` y guíame paso a paso para desarrollar la evidencia de [NOMBRE DE LA ACTIVIDAD].
No me des la solución completa directamente; hazme preguntas guía y explícame los estándares requeridos según el SENA.
```

### 3. Para Revisión y Refactorización de Código (Code Review)
```markdown
Revisa este fragmento de código que escribí para mi proyecto formativo ADSO:
[PEGA TU CÓDIGO AQUÍ]
Verifícalo contra las directrices de `.ai/REGLAS_CODIGO.md`.
Indícame:
1. Buenas prácticas aplicadas.
2. Posibles errores o fallas de seguridad.
3. Mejoras de rendimiento o accesibilidad.
4. Versión refactorizada y explicada.
```

---

## 👨‍🏫 Prompts para Instructores

### 1. Para Crear un Nuevo Taller o Ejercicio Práctico
```markdown
Como asistente técnico de formación ADSO CADPH Garzón, diseña un taller práctico para los aprendices enfocado en la competencia [NOMBRE DE LA COMPETENCIA, ej: Construcción de APIs RESTful con Node.js].
El taller debe incluir:
- Objetivo de aprendizaje y tiempo estimado.
- Requisitos previos.
- Enunciado del caso de estudio (preferiblemente orientado a necesidades agroempresariales o regionales del Huila).
- Pasos a desarrollar con criterios de verificación.
- Rúbrica de evaluación según lineamientos del SENA.
```

### 2. Para Generar Instrumentos de Evaluación (Listas de Chequeo)
```markdown
Genera una Lista de Chequeo en formato Markdown para evaluar la evidencia de [NOMBRE DE LA EVIDENCIA] perteneciente a la [FASE].
Incluye variables/indicadores de desempeño claros (cumple / no cumple) basados en el diseño curricular oficial `docs/DisenoCurricularADSO.pdf`.
```
