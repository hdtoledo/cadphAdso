/**
 * Módulo Interactivo para Visualización y Gestión de Guías de Aprendizaje
 * y Materiales de Formación — ADSO CADPH Garzón (Huila)
 * 
 * Permite navegar dinámicamente desde la Guía 1 en adelante y por Fases del Proyecto.
 */

(function () {
  'use strict';

  let currentPhaseId = 'fase-1-analisis';
  let currentActivityId = 'actividad-1';
  let currentSessionFilter = 'all'; // 'all' | 'Tecnica' | 'Matematicas'
  let currentSearchQuery = '';

  const PHASES_INFO = {
    'fase-1-analisis': {
      id: 'fase-1-analisis',
      numero: 1,
      nombre: 'Fase 1: Análisis',
      horas: 448,
      estado: 'Cargada en Repositorio',
      colorBadge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icono: 'file-search',
      descripcion: 'Levantamiento de requisitos de software (IEEE 830), diagramas de casos de uso y actividades en UML, lógica proposicional, algoritmia y razonamiento cuantitativo con datos agroempresariales.'
    },
    'fase-2-planeacion': {
      id: 'fase-2-planeacion',
      numero: 2,
      nombre: 'Fase 2: Planeación',
      horas: 576,
      estado: 'Próximamente',
      colorBadge: 'bg-purple-100 text-purple-800 border-purple-300',
      icono: 'pen-tool',
      descripcion: 'Diseño de arquitectura de software, modelado relacional (MER/MR) y NoSQL de bases de datos, diagramas de clases/secuencia, wireframes y prototipado interactivo en Figma.',
      competencias: [
        { codigo: '220501095', nombre: 'Diseñar artefactos de software', horas: 384 },
        { codigo: '220501096', nombre: 'Modelado de base de datos relacional y NoSQL', horas: 192 }
      ]
    },
    'fase-3-ejecucion': {
      id: 'fase-3-ejecucion',
      numero: 3,
      nombre: 'Fase 3: Ejecución',
      horas: 672,
      estado: 'Próximamente',
      colorBadge: 'bg-amber-100 text-amber-800 border-amber-300',
      icono: 'code-2',
      descripcion: 'Codificación frontend (HTML5 semántico, Tailwind CSS, JavaScript modular), desarrollo backend con APIs RESTful, seguridad, persistencia de datos y control de versiones con Gitflow.',
      competencias: [
        { codigo: '220501097', nombre: 'Codificar componentes de software', horas: 288 },
        { codigo: '220501098', nombre: 'Desarrollar aplicaciones web y móviles', horas: 192 },
        { codigo: '220501099', nombre: 'Integrar módulos y servicios web', horas: 192 }
      ]
    },
    'fase-4-evaluacion': {
      id: 'fase-4-evaluacion',
      numero: 4,
      nombre: 'Fase 4: Evaluación',
      horas: 384,
      estado: 'Próximamente',
      colorBadge: 'bg-blue-100 text-blue-800 border-blue-300',
      icono: 'shield-check',
      descripcion: 'Plan de pruebas unitarias y de integración (QA), manuales de instalación y usuario, despliegue continuo en entornos de producción y entrega formal al sector productivo.',
      competencias: [
        { codigo: '220501100', nombre: 'Pruebas de calidad de software (QA)', horas: 192 },
        { codigo: '220501101', nombre: 'Despliegue e implantación de software', horas: 96 },
        { codigo: '220501102', nombre: 'Manuales y cierre del proyecto', horas: 96 }
      ]
    }
  };

  /**
   * Inicializa el visor de guías y materiales
   */
  function initGuiasViewer() {
    const container = document.getElementById('guiasExplorerContainer');
    if (!container) return;

    renderPhaseNavigation();
    renderPhaseContent();
  }

  /**
   * Renderiza el selector de Fases del Proyecto
   */
  function renderPhaseNavigation() {
    const nav = document.getElementById('guiasPhaseNav');
    if (!nav) return;

    let html = '';
    Object.values(PHASES_INFO).forEach(ph => {
      const isActive = ph.id === currentPhaseId;
      const activeClasses = isActive
        ? 'bg-sena-green text-white shadow-md'
        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200';

      html += `
        <button type="button"
          onclick="window.selectGuiaPhase('${ph.id}')"
          class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition ${activeClasses}"
          title="${ph.nombre} (${ph.horas} Horas)">
          <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}">
            ${ph.numero}
          </span>
          <span class="truncate font-semibold">${ph.nombre}</span>
          <span class="text-[10px] px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}">
            ${ph.horas}h
          </span>
        </button>
      `;
    });

    nav.innerHTML = html;
  }

  /**
   * Selecciona una Fase
   */
  window.selectGuiaPhase = function (phaseId) {
    currentPhaseId = phaseId;
    renderPhaseNavigation();
    renderPhaseContent();
  };

  /**
   * Renderiza el contenido de la Fase activa
   */
  function renderPhaseContent() {
    const phaseWrapper = document.getElementById('guiasPhaseContentWrapper');
    if (!phaseWrapper) return;

    if (currentPhaseId === 'fase-1-analisis') {
      phaseWrapper.innerHTML = `
        <!-- Barra de Selector de Actividades de Fase 1 -->
        <div class="space-y-4">
          <div class="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Actividades de Aprendizaje & Guías de Fase 1 (Análisis)
              </h3>
              <p class="text-xs text-slate-500">Selecciona la actividad para explorar sus sesiones didácticas y materiales.</p>
            </div>
            <span class="text-xs font-bold text-sena-dark bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              3 Actividades Formativas
            </span>
          </div>

          <div id="guiasActivityNav" class="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl">
            <!-- Inyectado por renderGuiasNav -->
          </div>

          <div id="guiasActivityContent" class="space-y-6 pt-2">
            <!-- Inyectado por renderActivityContent -->
          </div>
        </div>
      `;
      renderGuiasNav();
      renderActivityContent();
    } else {
      // Fases 2, 3 o 4
      const ph = PHASES_INFO[currentPhaseId];
      let compsHtml = '';
      if (ph.competencias) {
        compsHtml = ph.competencias.map(c => `
          <div class="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span class="text-[10px] font-mono font-bold text-sena-dark bg-slate-100 px-2 py-0.5 rounded mr-2">${c.codigo}</span>
              <span class="text-xs font-semibold text-slate-800">${c.nombre}</span>
            </div>
            <span class="text-xs font-bold text-slate-600">${c.horas} Horas</span>
          </div>
        `).join('');
      }

      phaseWrapper.innerHTML = `
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div class="flex items-start gap-4">
              <div class="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 flex-shrink-0">
                <i data-lucide="${ph.icono}" class="w-7 h-7"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${ph.colorBadge}">
                    ${ph.estado}
                  </span>
                  <span class="text-xs text-slate-500 font-semibold">${ph.horas} Horas Formativas Planificadas</span>
                </div>
                <h3 class="text-xl font-bold text-slate-900 mt-1">${ph.nombre}</h3>
                <p class="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed max-w-2xl">${ph.descripcion}</p>
              </div>
            </div>

            <button type="button" onclick="window.selectGuiaPhase('fase-1-analisis')"
              class="px-4 py-2 bg-sena-green hover:bg-sena-hover text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 flex-shrink-0">
              <i data-lucide="arrow-left" class="w-4 h-4"></i>
              <span>Volver a Guías Fase 1</span>
            </button>
          </div>

          <!-- Competencias Planificadas -->
          <div>
            <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Competencias Oficiales del Diseño Curricular para esta Fase:
            </h4>
            <div class="space-y-2">
              ${compsHtml}
            </div>
          </div>

          <!-- Nota de depósito de materiales -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
            <div class="flex items-center gap-2 text-slate-800 font-bold">
              <i data-lucide="info" class="w-4 h-4 text-sena-green"></i>
              <span>Depósito de Guías y Materiales Formativos por los Instructores</span>
            </div>
            <p>
              Las guías de aprendizaje, sesiones y rúbricas correspondientes a esta fase serán cargadas oportunamente por el equipo de instructores del CADPH Garzón en la carpeta designada del repositorio:
              <code class="block bg-white p-2.5 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800 mt-1.5">material-formativo/guias-aprendizaje/${ph.nombre.replace(/[: ]+/g, '_')}/</code>
            </p>
          </div>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
    }
  }

  /**
   * Renderiza los botones de navegación entre Actividades de Fase 1
   */
  function renderGuiasNav() {
    const navContainer = document.getElementById('guiasActivityNav');
    if (!navContainer) return;

    const data = window.GUIAS_FASE1_DATA;
    if (!data) return;
    const activities = data.actividades || [];

    let html = '';
    activities.forEach(act => {
      const isActive = act.id === currentActivityId;
      const isCargada = act.cargada === true;
      const activeClasses = isActive
        ? 'bg-sena-green text-white shadow-md'
        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200';
      
      const badgeHours = act.horas_totales ? `${act.horas_totales}h` : '96h';
      const statusPill = isCargada
        ? `<span class="text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'}">Cargada</span>`
        : `<span class="text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${isActive ? 'bg-amber-400 text-slate-900' : 'bg-amber-100 text-amber-800 border border-amber-200'}">Próximamente</span>`;
      
      const shortName = act.numero === 1 
        ? 'Actividad 1: Caracterización & Requisitos' 
        : (act.numero === 2 ? 'Actividad 2: Requisitos & Matemáticas' : 'Actividad 3: Propuesta & Inglés');

      html += `
        <button type="button" 
          onclick="window.selectGuiaActivity('${act.id}')"
          class="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition ${activeClasses}"
          title="${act.titulo} - ${isCargada ? 'Material Disponible' : 'Pendiente Próximamente'}">
          <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}">
            ${act.numero}
          </span>
          <span class="truncate">${shortName}</span>
          ${statusPill}
          <span class="text-[10px] px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}">
            ${badgeHours}
          </span>
        </button>
      `;
    });

    navContainer.innerHTML = html;
  }

  /**
   * Cambia la actividad activa
   */
  window.selectGuiaActivity = function (actId) {
    currentActivityId = actId;
    currentSessionFilter = 'all';
    currentSearchQuery = '';
    renderGuiasNav();
    renderActivityContent();
  };

  /**
   * Renderiza el contenido completo de la actividad seleccionada
   */
  function renderActivityContent() {
    const contentContainer = document.getElementById('guiasActivityContent');
    if (!contentContainer) return;

    const data = window.GUIAS_FASE1_DATA;
    if (!data) return;
    const act = (data.actividades || []).find(a => a.id === currentActivityId);

    if (!act) {
      contentContainer.innerHTML = `<div class="p-6 text-xs text-slate-500">Actividad no encontrada.</div>`;
      return;
    }

    if (act.id === 'actividad-2') {
      contentContainer.innerHTML = renderActividad2(act);
      renderSessionsGrid(act);
    } else if (act.id === 'actividad-3') {
      contentContainer.innerHTML = renderActividad3(act);
    } else if (act.id === 'actividad-1') {
      contentContainer.innerHTML = renderActividad1(act);
    }

    if (window.lucide) lucide.createIcons();
  }

  /**
   * Renderiza la vista de Actividad 2 (Requisitos, UML, Algoritmia y Matemáticas)
   */
  function renderActividad2(act) {
    return `
      <!-- Encabezado de la Actividad 2 y Ficha de Descarga Oficial -->
      <div class="space-y-6">
        
        <!-- Tarjeta Principal de la Guía Oficial -->
        <div class="rounded-3xl bg-gradient-to-r from-slate-900 via-[#0c384a] to-[#124d62] text-white p-5 sm:p-7 shadow-md border border-white/10">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div class="space-y-2 max-w-2xl">
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full bg-sena-green text-white text-[11px] font-bold uppercase tracking-wider">
                  ${act.codigo_actividad}
                </span>
                <span class="px-2.5 py-0.5 rounded-full bg-white/10 text-cyan-200 text-[11px] font-semibold">
                  336 Horas Totales (${act.horas_directas}h Directas + ${act.horas_independientes}h Independientes)
                </span>
                <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold border border-emerald-400/30">
                  14 Sesiones Didácticas
                </span>
              </div>
              <h3 class="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-white leading-tight">
                ${act.titulo}
              </h3>
              <p class="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                ${act.descripcion}
              </p>
            </div>

            <!-- Botones de Descarga de Guía Oficial y Manual -->
            <div class="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0">
              <a href="${encodeURI(act.guia_archivo)}" download="GFPI-F-135-Guia-Actividad-2-ADSO-228118.docx"
                class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-sena-green hover:bg-sena-hover text-white text-xs font-bold rounded-xl transition shadow hover:scale-[1.02]"
                title="Descargar la Guía Oficial de Aprendizaje en formato Word (.docx)">
                <i data-lucide="download" class="w-4 h-4"></i>
                <span>Descargar Guía Oficial (.docx)</span>
              </a>

              <a href="${encodeURI(act.manual_archivo)}" download="Manual-e-Indice-de-sesiones-y-materiales.docx"
                class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition hover:scale-[1.02]"
                title="Descargar el manual pedagógico e índice de sesiones">
                <i data-lucide="book-open" class="w-4 h-4"></i>
                <span>Manual Pedagógico (.docx)</span>
              </a>
            </div>
          </div>

          <!-- Metadatos de Competencias Involucradas -->
          <div class="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div class="bg-black/25 p-3.5 rounded-2xl border border-white/5">
              <div class="flex items-center justify-between text-[11px] font-bold text-cyan-300 mb-1">
                <span>COMPETENCIA TÉCNICA · 220501093</span>
                <span class="text-white">288 Horas (9 Sesiones)</span>
              </div>
              <p class="text-slate-300 text-[11px] leading-snug">
                Evaluar requisitos de la solución de software de acuerdo con metodologías de análisis y estándares (4 RAPs).
              </p>
            </div>
            <div class="bg-black/25 p-3.5 rounded-2xl border border-white/5">
              <div class="flex items-center justify-between text-[11px] font-bold text-emerald-300 mb-1">
                <span>COMPETENCIA TRANSVERSAL · 240201528</span>
                <span class="text-white">48 Horas (5 Sesiones)</span>
              </div>
              <p class="text-slate-300 text-[11px] leading-snug">
                Razonamiento cuantitativo y matemáticas en situaciones del contexto productivo de software (4 RAPs).
              </p>
            </div>
          </div>
        </div>

        <!-- Barra de Filtros y Búsqueda de Sesiones -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
          <!-- Filtros por Área / Instructor -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button type="button" onclick="window.filterSessions('all')" id="filter-btn-all"
              class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${currentSessionFilter === 'all' ? 'bg-sena-green text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'}">
              Todas (14)
            </button>
            <button type="button" onclick="window.filterSessions('Tecnica')" id="filter-btn-Tecnica"
              class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${currentSessionFilter === 'Tecnica' ? 'bg-[#0c384a] text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'}">
              Técnica (9 Sesiones · 288h)
            </button>
            <button type="button" onclick="window.filterSessions('Matematicas')" id="filter-btn-Matematicas"
              class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${currentSessionFilter === 'Matematicas' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'}">
              Matemáticas (5 Sesiones · 48h)
            </button>
          </div>

          <!-- Búsqueda rápida de sesiones -->
          <div class="relative sm:w-64">
            <input type="text" id="sessionSearchInput" oninput="window.searchSessions(this.value)"
              placeholder="Buscar sesión, RAP o tema..."
              class="w-full text-xs pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sena-green">
            <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"></i>
          </div>
        </div>

        <!-- Contenedor Grid de Sesiones -->
        <div id="sessionsCardsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Inyectado por renderSessionsGrid -->
        </div>

      </div>
    `;
  }

  /**
   * Renderiza el Grid de tarjetas de sesiones con los filtros aplicados
   */
  function renderSessionsGrid(act) {
    const grid = document.getElementById('sessionsCardsGrid');
    if (!grid) return;

    const sesiones = act.sesiones || [];
    const filtered = sesiones.filter(s => {
      const matchFilter = currentSessionFilter === 'all' || s.area === currentSessionFilter;
      const matchSearch = !currentSearchQuery || 
        s.titulo.toLowerCase().includes(currentSearchQuery) ||
        s.subtitulo.toLowerCase().includes(currentSearchQuery) ||
        s.numero.toLowerCase().includes(currentSearchQuery) ||
        (s.raps && s.raps.some(r => r.toLowerCase().includes(currentSearchQuery))) ||
        (s.evidencias && s.evidencias.some(e => e.toLowerCase().includes(currentSearchQuery)));
      return matchFilter && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
          No se encontraron sesiones que coincidan con el criterio seleccionado.
        </div>`;
      return;
    }

    let html = '';
    filtered.forEach(s => {
      const isTecnica = s.area === 'Tecnica';
      const badgeColor = isTecnica 
        ? 'bg-blue-50 text-blue-700 border-blue-200' 
        : 'bg-emerald-50 text-emerald-700 border-emerald-200';
      const iconColor = isTecnica ? 'text-blue-600' : 'text-emerald-600';
      const iconName = isTecnica ? 'code' : 'calculator';

      // Botones de archivos
      let downloadButtonsHtml = '';
      if (s.archivos) {
        if (s.archivos.actividad) {
          downloadButtonsHtml += `
            <a href="${encodeURI(s.archivos.actividad)}" download
              class="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 text-[11px] font-semibold border border-blue-200 transition"
              title="Descargar Guía de Actividad de la Sesión (.docx)">
              <i data-lucide="file-text" class="w-3.5 h-3.5 text-blue-600"></i>
              <span>Actividad</span>
            </a>
          `;
        }
        if (s.archivos.instrumento) {
          downloadButtonsHtml += `
            <a href="${encodeURI(s.archivos.instrumento)}" download
              class="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-800 text-[11px] font-semibold border border-purple-200 transition"
              title="Descargar Instrumento de Evaluación / Rúbrica (.docx)">
              <i data-lucide="check-square" class="w-3.5 h-3.5 text-purple-600"></i>
              <span>Rúbrica</span>
            </a>
          `;
        }
        if (s.archivos.presentacion) {
          downloadButtonsHtml += `
            <a href="${encodeURI(s.archivos.presentacion)}" download
              class="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-semibold border border-amber-200 transition"
              title="Descargar Presentación (.pptx)">
              <i data-lucide="presentation" class="w-3.5 h-3.5 text-amber-600"></i>
              <span>Diapositivas</span>
            </a>
          `;
        }
        if (s.archivos.complementario) {
          downloadButtonsHtml += `
            <a href="${encodeURI(s.archivos.complementario)}" download
              class="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-semibold border border-emerald-200 transition"
              title="Descargar Datos y Ejercicio en Excel (.xlsx)">
              <i data-lucide="table" class="w-3.5 h-3.5 text-emerald-600"></i>
              <span>Excel</span>
            </a>
          `;
        }
      }

      html += `
        <div class="session-card bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-sena-green/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
          
          <div>
            <!-- Header de la tarjeta -->
            <div class="flex items-start justify-between gap-2 mb-2.5">
              <span class="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeColor}">
                <i data-lucide="${iconName}" class="w-3 h-3 ${iconColor}"></i>
                <span>${s.instructor}</span>
              </span>
              <span class="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                ${s.horas} Horas
              </span>
            </div>

            <!-- Título y Subtítulo -->
            <h4 class="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sena-green transition leading-snug">
              Sesión ${s.numero}: ${s.titulo}
            </h4>
            <p class="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
              ${s.subtitulo}
            </p>

            <!-- RAPs e Indicadores -->
            <div class="mt-3 pt-2 border-t border-slate-100 space-y-1">
              <div class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Resultados de Aprendizaje:</div>
              <div class="flex flex-wrap gap-1">
                ${(s.raps || []).map(r => `<span class="px-1.5 py-0.5 bg-slate-100 text-slate-700 text-[9px] font-mono rounded font-semibold">${r}</span>`).join('')}
              </div>
            </div>

            <!-- Evidencia Principal -->
            <div class="mt-2.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
              <div class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Evidencia Esperada:</div>
              <p class="text-[10px] text-slate-700 font-medium line-clamp-2 mt-0.5">
                ${(s.evidencias || [])[0] || 'Taller práctico y documento técnico'}
              </p>
            </div>
          </div>

          <!-- Acciones y Descargas -->
          <div class="mt-4 pt-3 border-t border-slate-100 space-y-2">
            <div class="flex items-center gap-1.5 flex-wrap">
              ${downloadButtonsHtml}
            </div>

            <button type="button" onclick="window.openSessionModal('${s.id}')"
              class="w-full text-center py-1.5 px-3 rounded-lg text-slate-600 hover:text-sena-green hover:bg-slate-50 text-[11px] font-semibold transition flex items-center justify-center gap-1">
              <span>Ver ficha detallada</span>
              <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>

        </div>
      `;
    });

    grid.innerHTML = html;
    if (window.lucide) lucide.createIcons();
  }

  /**
   * Filtrar sesiones por área
   */
  window.filterSessions = function (area) {
    currentSessionFilter = area;
    const act = (window.GUIAS_FASE1_DATA.actividades || []).find(a => a.id === currentActivityId);
    if (act) {
      ['all', 'Tecnica', 'Matematicas'].forEach(id => {
        const btn = document.getElementById(`filter-btn-${id}`);
        if (!btn) return;
        if (id === area) {
          btn.className = `px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${id === 'all' ? 'bg-sena-green text-white shadow-xs' : (id === 'Tecnica' ? 'bg-[#0c384a] text-white shadow-xs' : 'bg-emerald-600 text-white shadow-xs')}`;
        } else {
          btn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition bg-white text-slate-700 hover:bg-slate-200 border border-slate-200';
        }
      });
      renderSessionsGrid(act);
    }
  };

  /**
   * Búsqueda en tiempo real
   */
  window.searchSessions = function (query) {
    currentSearchQuery = (query || '').toLowerCase().trim();
    const act = (window.GUIAS_FASE1_DATA.actividades || []).find(a => a.id === currentActivityId);
    if (act) renderSessionsGrid(act);
  };

  /**
   * Renderiza la vista de Actividad 3 (Propuesta Técnica e Inglés con los 6 anexos)
   */
  function renderActividad3(act) {
    const anexos = act.anexos || [];

    let anexosCardsHtml = '';
    anexos.forEach(anexo => {
      const isEnglish = anexo.tipo === 'Ingles';
      const badgeStyle = isEnglish 
        ? 'bg-blue-50 text-blue-700 border-blue-200' 
        : 'bg-amber-50 text-amber-700 border-amber-200';
      const iconName = isEnglish ? 'languages' : 'file-code';

      anexosCardsHtml += `
        <div class="bg-white rounded-2xl p-5 border border-slate-200 hover:border-sena-green/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badgeStyle}">
                <i data-lucide="${iconName}" class="w-3.5 h-3.5"></i>
                <span>${anexo.tipo === 'Ingles' ? 'Inglés Técnico' : 'Propuesta Técnica'}</span>
              </span>
              <span class="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Anexo ${anexo.numero}
              </span>
            </div>

            <h4 class="text-sm font-bold text-slate-900 group-hover:text-sena-green transition leading-snug">
              ${anexo.nombre}
            </h4>
            <p class="text-xs text-slate-500 mt-2 leading-relaxed">
              ${anexo.descripcion}
            </p>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span class="text-[10px] font-mono text-slate-400 truncate max-w-[140px]">
              Word (.docx)
            </span>
            <a href="${encodeURI(anexo.archivo)}" download
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-sena-green hover:bg-sena-hover text-white text-xs font-semibold rounded-lg shadow-xs transition hover:scale-105"
              title="Descargar ${anexo.nombre}">
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
              <span>Descargar Taller</span>
            </a>
          </div>
        </div>
      `;
    });

    return `
      <div class="space-y-6">
        
        <!-- Banner de la Guía 3.0 -->
        <div class="rounded-3xl bg-gradient-to-r from-slate-900 via-[#0c384a] to-[#124d62] text-white p-5 sm:p-7 shadow-md border border-white/10">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div class="space-y-2 max-w-2xl">
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full bg-sena-green text-white text-[11px] font-bold uppercase tracking-wider">
                  ${act.codigo_actividad}
                </span>
                <span class="px-2.5 py-0.5 rounded-full bg-white/10 text-cyan-200 text-[11px] font-semibold">
                  112 Horas Totales (${act.horas_directas}h Directas + ${act.horas_independientes}h Independientes)
                </span>
                <span class="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[11px] font-semibold border border-purple-400/30">
                  6 Anexos Prácticos
                </span>
              </div>
              <h3 class="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-white leading-tight">
                ${act.titulo}
              </h3>
              <p class="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                ${act.descripcion}
              </p>
            </div>

            <!-- Botón Descargar Guía 3.0 -->
            <div class="flex flex-col gap-2 flex-shrink-0">
              <a href="${encodeURI(act.guia_archivo)}" download="Guia-de-Aprendizaje-3.0-ADSO-228118.docx"
                class="inline-flex items-center justify-center gap-2 px-5 py-3 bg-sena-green hover:bg-sena-hover text-white text-xs sm:text-sm font-bold rounded-xl transition shadow hover:scale-[1.02]"
                title="Descargar la Guía Oficial de Aprendizaje 3.0">
                <i data-lucide="download" class="w-4 h-4"></i>
                <span>Descargar Guía 3.0 (.docx)</span>
              </a>
            </div>
          </div>

          <!-- Caso de Estudio Cafetero del Huila -->
          <div class="mt-6 p-4 bg-black/25 rounded-2xl border border-white/10 flex items-start gap-3.5">
            <div class="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
              <i data-lucide="coffee" class="w-5 h-5"></i>
            </div>
            <div class="text-xs">
              <div class="font-bold text-amber-300 uppercase tracking-wider text-[11px]">Contexto Regional de Aplicación</div>
              <div class="text-slate-200 font-semibold mt-0.5">${act.contexto_empresarial}</div>
              <p class="text-slate-300 text-[11px] mt-1 leading-relaxed">
                Diagnóstico de procesos en fincas y cooperativas cafeteras del centro del Huila (Garzón, Gigante, Agrado), estructuración de requerimientos IEEE 830, términos de referencia y comunicación técnica en inglés para software de trazabilidad y subasta de café.
              </p>
            </div>
          </div>
        </div>

        <!-- Encabezado de Anexos -->
        <div class="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div>
            <h4 class="text-base font-bold text-slate-800">Talleres y Anexos Técnicos de la Actividad 3</h4>
            <p class="text-xs text-slate-500">Documentos listos para trabajo práctico de aprendices e instructores.</p>
          </div>
          <span class="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">6 Documentos</span>
        </div>

        <!-- Grid de Anexos -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${anexosCardsHtml}
        </div>

      </div>
    `;
  }

  /**
   * Renderiza la vista de Actividad 1 (Pendiente Próximamente)
   */
  function renderActividad1(act) {
    const comps = act.competencias || [];
    let compsHtml = comps.map(c => `
      <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
          <div class="flex items-center gap-2">
            <span class="font-mono font-bold text-sena-dark bg-white px-2 py-0.5 rounded border border-slate-200">${c.codigo}</span>
            <span class="font-bold text-slate-800">${c.nombre}</span>
          </div>
          <span class="font-bold text-slate-600">${c.horas} Horas (${c.tipo})</span>
        </div>
        <p class="text-[11px] text-slate-600 leading-relaxed font-light">${c.denominacion}</p>
        <div class="mt-2 pt-2 border-t border-slate-200">
          <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Resultados de Aprendizaje Previstos:</span>
          <ul class="space-y-1">
            ${(c.raps || []).map(r => `
              <li class="text-[11px] text-slate-600 flex items-start gap-1.5">
                <i data-lucide="check" class="w-3.5 h-3.5 text-sena-green flex-shrink-0 mt-0.5"></i>
                <span>${r}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `).join('');

    return `
      <div class="space-y-6">
        <!-- Banner de Encabezado de la Actividad 1 -->
        <div class="rounded-3xl bg-gradient-to-r from-slate-900 via-[#0c384a] to-[#1a4a5e] text-white p-6 sm:p-8 shadow-md border border-white/10">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div class="space-y-3 max-w-2xl">
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[11px] font-extrabold uppercase tracking-wider">
                  ${act.codigo_actividad}
                </span>
                <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-200 text-[11px] font-semibold border border-amber-400/30">
                  ⏳ Pendiente Próximamente
                </span>
                <span class="px-2.5 py-0.5 rounded-full bg-white/10 text-cyan-200 text-[11px] font-semibold">
                  ${act.horas_totales} Horas Formativas Planificadas
                </span>
              </div>
              <h3 class="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
                ${act.titulo}
              </h3>
              <p class="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                ${act.descripcion}
              </p>
            </div>

            <!-- Botón de Acción para ir a la Actividad 2 cargada -->
            <div class="flex flex-col gap-2 flex-shrink-0">
              <button type="button" onclick="window.selectGuiaActivity('actividad-2')"
                class="inline-flex items-center justify-center gap-2 px-5 py-3 bg-sena-green hover:bg-sena-hover text-white text-xs sm:text-sm font-bold rounded-xl transition shadow hover:scale-[1.02]">
                <span>Ir a Actividad 2 (Cargada)</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Estado de Carga y Aviso Didáctico -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3">
            <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <i data-lucide="clock" class="w-5 h-5"></i>
            </div>
            <div>
              <h5 class="text-xs font-bold text-amber-900 uppercase tracking-wider">Estado de la Guía</h5>
              <p class="text-[11px] text-amber-800 mt-1 leading-relaxed">
                Guía en fase de estructuración pedagógica y validación institucional por el equipo técnico.
              </p>
            </div>
          </div>

          <div class="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 flex items-start gap-3">
            <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <i data-lucide="building-2" class="w-5 h-5"></i>
            </div>
            <div>
              <h5 class="text-xs font-bold text-blue-900 uppercase tracking-wider">Contexto Productivo</h5>
              <p class="text-[11px] text-blue-800 mt-1 leading-relaxed">
                Selección de empresas agroindustriales y comerciales en Garzón para el levantamiento de requisitos.
              </p>
            </div>
          </div>

          <div class="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex items-start gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <i data-lucide="sparkles" class="w-5 h-5"></i>
            </div>
            <div>
              <h5 class="text-xs font-bold text-emerald-900 uppercase tracking-wider">Actividades Disponibles</h5>
              <p class="text-[11px] text-emerald-800 mt-1 leading-relaxed">
                Puedes consultar la <strong>Actividad 2</strong> (14 sesiones, UML, algoritmia) y la <strong>Actividad 3</strong> (talleres cafeteros).
              </p>
            </div>
          </div>
        </div>

        <!-- Competencias Curriculares de la Actividad 1 -->
        <div class="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div class="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h4 class="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Competencia Técnica Curricular Planificada
            </h4>
            <span class="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">144 Horas</span>
          </div>

          <div class="space-y-3">
            ${compsHtml}
          </div>

          <!-- Nota para instructores -->
          <div class="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div class="flex items-center gap-2 text-slate-800 font-bold">
              <i data-lucide="folder-git-2" class="w-4 h-4 text-sena-green"></i>
              <span>Ruta de depósito de materiales para instructores:</span>
            </div>
            <p>
              Una vez finalizada la guía y las diapositivas de esta actividad, los instructores podrán cargarlas en la carpeta:
              <code class="block bg-white p-2.5 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800 mt-1">material-formativo/guias-aprendizaje/Fase1_Analisis/ACTIVIDAD 1/</code>
            </p>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Abre el Modal con el detalle completo de la Sesión
   */
  window.openSessionModal = function (sessionId) {
    const data = window.GUIAS_FASE1_DATA;
    if (!data) return;
    let foundSession = null;

    for (const act of data.actividades || []) {
      if (act.sesiones) {
        const s = act.sesiones.find(item => item.id === sessionId);
        if (s) {
          foundSession = s;
          break;
        }
      }
    }

    if (!foundSession) return;

    const modal = document.getElementById('sessionDetailModal');
    if (!modal) return;

    document.getElementById('sessionModalNumber').innerText = `Sesión ${foundSession.numero}`;
    document.getElementById('sessionModalAreaBadge').innerText = foundSession.area === 'Tecnica' ? 'Técnica · 220501093' : 'Matemáticas · 240201528';
    document.getElementById('sessionModalHours').innerText = `${foundSession.horas} Horas (${foundSession.horas_directas}h directas + ${foundSession.horas_independientes}h independientes)`;
    document.getElementById('sessionModalTitle').innerText = foundSession.titulo;
    document.getElementById('sessionModalSubtitle').innerText = foundSession.subtitulo;

    // RAPs
    const rapsContainer = document.getElementById('sessionModalRaps');
    if (rapsContainer) {
      rapsContainer.innerHTML = (foundSession.raps || []).map(r => `
        <div class="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <span class="font-bold text-sena-dark">${r}</span>
        </div>
      `).join('');
    }

    // Evidencias
    const evidContainer = document.getElementById('sessionModalEvidencias');
    if (evidContainer) {
      evidContainer.innerHTML = (foundSession.evidencias || []).map(e => `
        <li class="text-xs text-slate-700 leading-relaxed">${e}</li>
      `).join('');
    }

    // Descargas
    const downloadsContainer = document.getElementById('sessionModalDownloads');
    if (downloadsContainer && foundSession.archivos) {
      let btns = '';
      if (foundSession.archivos.actividad) {
        btns += `
          <a href="${encodeURI(foundSession.archivos.actividad)}" download
            class="flex items-center justify-between p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-semibold transition">
            <span class="flex items-center gap-2">
              <i data-lucide="file-text" class="w-4 h-4 text-blue-600"></i>
              <span>Guía de Actividad de la Sesión</span>
            </span>
            <span class="text-[10px] bg-white px-2 py-0.5 rounded font-mono">Word</span>
          </a>
        `;
      }
      if (foundSession.archivos.instrumento) {
        btns += `
          <a href="${encodeURI(foundSession.archivos.instrumento)}" download
            class="flex items-center justify-between p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-semibold transition">
            <span class="flex items-center gap-2">
              <i data-lucide="check-square" class="w-4 h-4 text-purple-600"></i>
              <span>Instrumento de Evaluación / Rúbrica</span>
            </span>
            <span class="text-[10px] bg-white px-2 py-0.5 rounded font-mono">Word</span>
          </a>
        `;
      }
      if (foundSession.archivos.presentacion) {
        btns += `
          <a href="${encodeURI(foundSession.archivos.presentacion)}" download
            class="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold transition">
            <span class="flex items-center gap-2">
              <i data-lucide="presentation" class="w-4 h-4 text-amber-600"></i>
              <span>Presentación de Diapositivas</span>
            </span>
            <span class="text-[10px] bg-white px-2 py-0.5 rounded font-mono">PPTX</span>
          </a>
        `;
      }
      if (foundSession.archivos.complementario) {
        btns += `
          <a href="${encodeURI(foundSession.archivos.complementario)}" download
            class="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-semibold transition">
            <span class="flex items-center gap-2">
              <i data-lucide="table" class="w-4 h-4 text-emerald-600"></i>
              <span>Conjunto de Datos y Estadísticas</span>
            </span>
            <span class="text-[10px] bg-white px-2 py-0.5 rounded font-mono">Excel</span>
          </a>
        `;
      }
      downloadsContainer.innerHTML = btns;
    }

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  };

  window.closeSessionModal = function () {
    const modal = document.getElementById('sessionDetailModal');
    if (modal) modal.classList.add('hidden');
  };

  window.initGuiasViewer = initGuiasViewer;

  // Auto-inicializar cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', initGuiasViewer);

})();
