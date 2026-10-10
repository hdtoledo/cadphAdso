# 💡 Guía de Prompts para Aprendices e Instructores — ADSO SENA

Esta guía contiene plantillas de prompts optimizadas para interactuar con la Inteligencia Artificial (**Claude, Gemini, ChatGPT, Cursor, Copilot, Antigravity, etc.**) en este repositorio, asegurando respuestas didácticas, técnicas y alineadas con la formación SENA CADPH Garzón.

---

## 🧑‍🎓 Prompts para Aprendices

### 1. Para Explicación de Conceptos Teóricos o Algorítmicos
```markdown
Actúa como mi mentor de desarrollo de software del SENA CADPH Garzón.
Revisa las reglas de `.ai/REGLAS_CODIGO.md` y explícame el concepto de [CONCEPTO, ej: Normalización de Bases de Datos en 3FN / Promesas en JavaScript].
Por favor explícalo con una analogía del mundo real, un diagrama conceptual en texto o Mermaid, y un ejemplo de código práctico con comentarios didácticos en español.
```

### 2. Para Resolver una Sesión de la Actividad 2 (Fase 1: Análisis)
```markdown
Estoy cursando la Actividad 2 de la Fase 1: Análisis (336 Horas) del programa ADSO CADPH Garzón.
Por favor consulta `material-formativo/guias-aprendizaje/Fase1_Analisis/ACTIVIDAD 2/` y en especial la [Sesión 01 a 09 Técnica / Sesión 01 a 05 Matemáticas].
Quiero comprender los requisitos y criterios de evaluación de la evidencia: [NOMBRE DE LA SESIÓN, ej: Sesión 05 - Casos de Uso UML o Sesión 04 Matemáticas - Estadística Agrosur].
Guíame con preguntas socráticas, explícame las buenas prácticas de modelado/análisis y ayúdame a revisar mi avance sin entregarme la solución terminada directamente.
```

### 3. Para Resolver Talleres de la Actividad 3 (Propuesta e Inglés)
```markdown
Estoy desarrollando la Actividad 3 de la Fase 1: Análisis (112 Horas) sobre el caso de estudio de la empresa cafetera del Huila.
Revisa la carpeta `material-formativo/guias-aprendizaje/Fase1_Analisis/ACTIVIDAD 3/` y sus anexos correspondientes.
Explícame cómo estructurar el [Anexo 1: Requisitos IEEE 830 / Anexo 2: Términos de Referencia / Anexo 5: Comunicación Técnica en Inglés], qué vocabulario técnico en inglés debo aplicar y cuáles son los criterios clave de evaluación.
```

### 4. Para Revisión y Refactorización de Código (Code Review)
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

### 1. Para Automatizar el Montaje de una Nueva Sesión o Actividad Formativa
```markdown
Como asistente pedagógico y técnico ADSO CADPH Garzón:
Ayúdame a estructurar los materiales formativos para la [Actividad 1 / Nueva Sesión de Fase 2].
Competencia objetivo: [CÓDIGO Y NOMBRE, ej: 220501092 - Caracterización de procesos].
RAP asociado: [RAP, ej: 220501092-01].
Genera los siguientes 3 archivos respetando las plantillas oficiales del SENA:
1. Guía de Actividad de Aprendizaje de la Sesión (formato Markdown o Word con objetivos, contexto laboral del Huila, paso a paso y entregables).
2. Instrumento de Evaluación (Rúbrica con indicadores de desempeño y escala valorativa).
3. Resumen temático para presentación técnica en diapositivas.
```

### 2. Para Crear un Nuevo Taller o Ejercicio Práctico
```markdown
Como asistente técnico de formación ADSO CADPH Garzón, diseña un taller práctico para los aprendices enfocado en la competencia [NOMBRE DE LA COMPETENCIA, ej: Construcción de APIs RESTful con Node.js].
El taller debe incluir:
- Objetivo de aprendizaje y tiempo estimado.
- Requisitos previos.
- Enunciado del caso de estudio (preferiblemente orientado a necesidades agroempresariales o regionales del Huila: café, piscicultura, turismo).
- Pasos a desarrollar con criterios de verificación.
- Rúbrica de evaluación según lineamientos del SENA.
```

### 3. Para Generar Instrumentos de Evaluación (Listas de Chequeo)
```markdown
Genera una Lista de Chequeo en formato Markdown para evaluar la evidencia de [NOMBRE DE LA EVIDENCIA] perteneciente a la [FASE].
Incluye variables/indicadores de desempeño claros (cumple / no cumple) basados en el diseño curricular oficial `docs/DisenoCurricularADSO.pdf`.
```
