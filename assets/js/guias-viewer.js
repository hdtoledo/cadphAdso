/**
 * Módulo Interactivo para Visualización y Gestión de Guías de Aprendizaje
 * y Materiales de Formación — Fase 1: Análisis (ADSO CADPH Garzón)
 * 
 * Basado en window.GUIAS_FASE1_DATA
 */

(function () {
  'use strict';

  let currentActivityId = 'actividad-2';
  let currentSessionFilter = 'all'; // 'all' | 'Tecnica' | 'Matematicas'
  let currentSearchQuery = '';

  /**
   * Inicializa el visor de guías y materiales
   */
  function initGuiasViewer() {
    const container = document.getElementById('guiasFase1ExplorerContainer');
    if (!container) return;

    if (!window.GUIAS_FASE1_DATA) {
      container.innerHTML = `
        <div class="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
          <strong>Aviso:</strong> No se encontraron datos de guías en <code>window.GUIAS_FASE1_DATA</code>.
        </div>`;
      return;
    }

    renderGuiasNav();
    renderActivityContent();
  }

  /**
   * Renderiza los botones de navegación entre Actividades
   */
  function renderGuiasNav() {
    const navContainer = document.getElementById('guiasActivityNav');
    if (!navContainer) return;

    const data = window.GUIAS_FASE1_DATA;
    const activities = data.actividades || [];

    let html = '';
    activities.forEach(act => {
      const isActive = act.id === currentActivityId;
      const activeClasses = isActive
        ? 'bg-sena-green text-white shadow-md'
        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200';
      
      const badgeHours = act.horas_totales ? `${act.horas_totales}h` : '96h est.';
      
      html += `
        <button type="button" 
          onclick="window.selectGuiaActivity('${act.id}')"
          class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition ${activeClasses}"
          title="${act.titulo}">
          <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}">
            ${act.numero}
          </span>
          <span class="truncate">Actividad ${act.numero}: ${act.numero === 2 ? 'Requisitos & Matemáticas' : (act.numero === 3 ? 'Propuesta & Inglés' : 'Requisitos Iniciales')}</span>
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
        <div class="rounded-2xl bg-gradient-to-r from-slate-900 via-[#0c384a] to-[#124d62] text-white p-5 sm:p-6 shadow-md border border-white/10">
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
              <h3 class="text-lg sm:text-xl font-extrabold tracking-tight text-white">
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
          <div class="mt-5 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div class="bg-black/20 p-3 rounded-xl border border-white/5">
              <div class="flex items-center justify-between text-[11px] font-bold text-cyan-300 mb-1">
                <span>COMPETENCIA TÉCNICA · 220501093</span>
                <span class="text-white">288 Horas (9 Sesiones)</span>
              </div>
              <p class="text-slate-300 text-[11px] leading-snug">
                Evaluar requisitos de la solución de software de acuerdo con metodologías de análisis y estándares (4 RAPs).
              </p>
            </div>
            <div class="bg-black/20 p-3 rounded-xl border border-white/5">
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
      // Actualizar estilos de botones
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
        <div class="rounded-2xl bg-gradient-to-r from-slate-900 via-[#0c384a] to-[#124d62] text-white p-5 sm:p-6 shadow-md border border-white/10">
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
              <h3 class="text-lg sm:text-xl font-extrabold tracking-tight text-white">
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
          <div class="mt-5 p-3.5 bg-black/25 rounded-xl border border-white/10 flex items-start gap-3">
            <div class="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
              <i data-lucide="coffee" class="w-4 h-4"></i>
            </div>
            <div class="text-xs">
              <div class="font-bold text-amber-300 uppercase tracking-wider text-[11px]">Contexto Regional de Aplicación</div>
              <div class="text-slate-200 font-semibold">${act.contexto_empresarial}</div>
              <p class="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
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
   * Renderiza la vista de Actividad 1 (En estructuración)
   */
  function renderActividad1(act) {
    return `
      <div class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center flex-shrink-0">
            <i data-lucide="folder-clock" class="w-6 h-6"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                ${act.estado}
              </span>
              <span class="text-xs text-slate-400">96 Horas Estimadas</span>
            </div>
            <h3 class="text-lg font-bold text-slate-800 mt-1">${act.titulo}</h3>
            <p class="text-xs text-slate-500 mt-1 leading-relaxed">${act.descripcion}</p>
          </div>
        </div>

        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
          <div class="font-bold text-slate-800 flex items-center gap-2">
            <i data-lucide="info" class="w-4 h-4 text-blue-600"></i>
            <span>Instrucciones para Instructores: Depósito de Materiales</span>
          </div>
          <p>
            Esta carpeta está reservada para la <strong>Actividad de Aprendizaje 1</strong> vinculada a la competencia <code>220501092</code> (Caracterización de Procesos y Levantamiento Inicial de Requisitos).
          </p>
          <p>
            Los instructores pueden depositar sus archivos en la ruta del repositorio:
            <code class="block bg-white p-2 rounded border border-slate-200 font-mono text-[11px] text-slate-800 mt-1">material-formativo/guias-aprendizaje/Fase1_Analisis/ACTIVIDAD 1/</code>
          </p>
        </div>
      </div>
    `;
  }

  /**
   * Abre el Modal con el detalle completo de la Sesión
   */
  window.openSessionModal = function (sessionId) {
    const data = window.GUIAS_FASE1_DATA;
    let foundSession = null;
    let parentAct = null;

    for (const act of data.actividades || []) {
      if (act.sesiones) {
        const s = act.sesiones.find(item => item.id === sessionId);
        if (s) {
          foundSession = s;
          parentAct = act;
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
