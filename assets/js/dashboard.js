/**
 * Lógica interactiva del Dashboard / Explorador ADSO CADPH Garzón
 * Soporta Diseño Curricular Oficial (PDF + Competencias dinámicas, RAPs y Horas)
 */

// Navegación de pestañas en el dashboard
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  const target = document.getElementById(tabId);
  if (target) target.classList.remove('hidden');

  // Actualizar botones de navegación del sidebar
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.remove('bg-sena-green', 'text-white', 'shadow-md');
    btn.classList.add('text-slate-200', 'hover:bg-white/10', 'hover:text-white');
  });

  const navBtnMap = {
    'tab-diseno': 'nav-diseno',
    'tab-fases': 'nav-fases',
    'tab-temarios': 'nav-temarios',
    'tab-checklist': 'nav-checklist',
    'tab-inicio': 'nav-inicio',
    'tab-repo': 'nav-repo',
    'tab-ficha': 'nav-ficha'
  };

  const breadcrumbMap = {
    'tab-diseno': 'Diseño Curricular Oficial ADSO (Documento PDF & Competencias)',
    'tab-fases': 'Fases Metodológicas del Proyecto Formativo',
    'tab-temarios': 'Temarios & Explicaciones de Desarrollo',
    'tab-checklist': 'Checklist de Competencias Curriculares',
    'tab-inicio': 'Dashboard General de Formación ADSO',
    'tab-repo': 'Repositorio GitHub & Despliegue Pages',
    'tab-ficha': 'Acerca de ADSO: Programa, Repositorio & Instructores'
  };

  const activeBtn = document.getElementById(navBtnMap[tabId]);
  if (activeBtn) {
    activeBtn.classList.remove('text-slate-200', 'hover:bg-white/10', 'hover:text-white');
    activeBtn.classList.add('bg-sena-green', 'text-white', 'shadow-md');
  }

  // Actualizar breadcrumb
  const bc = document.getElementById('currentBreadcrumb');
  if (bc && breadcrumbMap[tabId]) bc.innerText = breadcrumbMap[tabId];

  // En móviles, cerrar el sidebar al seleccionar
  if (window.innerWidth < 1024) {
    const sidebar = document.getElementById('mainSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar) sidebar.classList.add('-translate-x-full');
    if (backdrop) backdrop.classList.add('hidden');
  }

  // Si se selecciona la pestaña de diseño curricular, inicializar según la sub-vista
  if (tabId === 'tab-diseno') {
    if (currentCurriculumSubTab === 'pdf' && typeof initPdfViewer === 'function') {
      setTimeout(initPdfViewer, 60);
    } else if (currentCurriculumSubTab === 'competencias') {
      renderCompetenciasCards();
    }
  } else if (tabId === 'tab-fases') {
    if (typeof window.initGuiasViewer === 'function') {
      window.initGuiasViewer();
    }
  }

  if (window.lucide) lucide.createIcons();
}

/* ==========================================================================
   SUB-VISTAS DEL DISEÑO CURRICULAR (PDF OFICIAL vs COMPETENCIAS INTERACTIVAS)
   ========================================================================== */
let currentCurriculumSubTab = 'pdf';

function setCurriculumSubTab(subTab) {
  currentCurriculumSubTab = subTab;
  const pdfView = document.getElementById('curriculumPdfSubView');
  const compView = document.getElementById('curriculumInteractiveSubView');
  const pdfBtn = document.getElementById('subtab-pdf-btn');
  const compBtn = document.getElementById('subtab-comp-btn');

  if (subTab === 'pdf') {
    if (pdfView) pdfView.classList.remove('hidden');
    if (compView) compView.classList.add('hidden');

    if (pdfBtn) {
      pdfBtn.className = 'flex-1 sm:flex-initial px-4 py-2 rounded-lg transition flex items-center justify-center gap-2 bg-sena-green text-white shadow-xs font-semibold';
    }
    if (compBtn) {
      compBtn.className = 'flex-1 sm:flex-initial px-4 py-2 rounded-lg transition flex items-center justify-center gap-2 text-slate-700 hover:text-slate-900 hover:bg-white/80 font-semibold';
    }

    if (typeof initPdfViewer === 'function') {
      setTimeout(initPdfViewer, 60);
    }
  } else {
    if (pdfView) pdfView.classList.add('hidden');
    if (compView) compView.classList.remove('hidden');

    if (compBtn) {
      compBtn.className = 'flex-1 sm:flex-initial px-4 py-2 rounded-lg transition flex items-center justify-center gap-2 bg-sena-green text-white shadow-xs font-semibold';
    }
    if (pdfBtn) {
      pdfBtn.className = 'flex-1 sm:flex-initial px-4 py-2 rounded-lg transition flex items-center justify-center gap-2 text-slate-700 hover:text-slate-900 hover:bg-white/80 font-semibold';
    }

    renderCompetenciasCards();
  }

  if (window.lucide) lucide.createIcons();
}

/* ==========================================================================
   VISOR DINÁMICO DE COMPETENCIAS, RAPS Y HORAS DEL DISEÑO CURRICULAR
   ========================================================================== */
let currentCompetenciaFilter = 'todas';
let competenciaSearchQuery = '';

function setCompetenciaFilter(filterType, buttonEl) {
  currentCompetenciaFilter = filterType;
  document.querySelectorAll('.comp-filter-btn').forEach(btn => {
    btn.className = 'comp-filter-btn px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition whitespace-nowrap';
  });
  if (buttonEl) {
    buttonEl.className = 'comp-filter-btn px-3 py-1.5 rounded-xl bg-sena-green text-white font-bold transition whitespace-nowrap shadow-xs';
  }
  renderCompetenciasCards();
}

function filterCompetencias() {
  const input = document.getElementById('competenciaSearchInput');
  competenciaSearchQuery = input ? input.value.trim().toLowerCase() : '';
  renderCompetenciasCards();
}

function renderCompetenciasCards() {
  const container = document.getElementById('competenciasCardsContainer');
  if (!container) return;

  const data = window.COMPETENCIAS_ADSO_DATA || [];
  
  // Filtrar datos según categoría y búsqueda
  const filtered = data.filter(item => {
    const matchCategory = (currentCompetenciaFilter === 'todas') 
      || (item.tipo === currentCompetenciaFilter)
      || (currentCompetenciaFilter === 'Transversal' && (item.tipo === 'Clave y Transversal' || item.tipo === 'Transversal'));

    if (!matchCategory) return false;

    if (!competenciaSearchQuery) return true;
    const q = competenciaSearchQuery;
    const inCodigo = item.codigo && item.codigo.toLowerCase().includes(q);
    const inNombre = item.nombre && item.nombre.toLowerCase().includes(q);
    const inDenom = item.denominacion && item.denominacion.toLowerCase().includes(q);
    const inFase = item.fase && item.fase.toLowerCase().includes(q);
    const inDesc = item.descripcion && item.descripcion.toLowerCase().includes(q);
    const inRaps = item.resultados_aprendizaje && item.resultados_aprendizaje.some(r => 
      (r.codigo_rap && r.codigo_rap.toLowerCase().includes(q)) || 
      (r.texto && r.texto.toLowerCase().includes(q))
    );

    return inCodigo || inNombre || inDenom || inFase || inDesc || inRaps;
  });

  // Actualizar contador superior
  const counterEl = document.getElementById('competenciasCounter');
  if (counterEl) {
    const totalRaps = filtered.reduce((acc, c) => acc + (c.resultados_aprendizaje ? c.resultados_aprendizaje.length : 0), 0);
    const totalHoras = filtered.reduce((acc, c) => acc + (c.horas || 0), 0);
    counterEl.innerHTML = `
      <span>Mostrando <strong>${filtered.length}</strong> de ${data.length} competencias • <strong>${totalRaps}</strong> RAPs • <strong>${totalHoras.toLocaleString('es-CO')}h</strong></span>
      <span class="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">Diseño Curricular Código 228118</span>
    `;
  }

  // Si no hay resultados
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full bg-white rounded-2xl p-8 sm:p-12 text-center border border-slate-200">
        <div class="w-12 h-12 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
          <i data-lucide="search-x" class="w-6 h-6"></i>
        </div>
        <h4 class="text-base font-bold text-slate-800">No se encontraron competencias</h4>
        <p class="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          No hay competencias que coincidan con "${competenciaSearchQuery}". Intenta con otro término o limpia los filtros.
        </p>
        <button onclick="document.getElementById('competenciaSearchInput').value=''; filterCompetencias();" class="mt-4 px-4 py-2 bg-sena-green text-white text-xs font-semibold rounded-xl hover:bg-sena-hover transition shadow-xs">
          Restablecer búsqueda
        </button>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  // Generar tarjetas de competencias
  container.innerHTML = filtered.map(comp => {
    const isTecnica = comp.tipo === 'Tecnica';
    const isTransversal = comp.tipo === 'Clave y Transversal' || comp.tipo === 'Transversal';
    const isInstitucional = comp.tipo === 'Institucional';
    const isProductiva = comp.tipo === 'Etapa Productiva';

    let badgeClass = 'bg-slate-100 text-slate-800 border-slate-200';
    let iconClass = 'bg-slate-50 text-slate-700 border-slate-200';
    let typeDisplay = comp.tipo_label || comp.tipo;

    if (isTecnica) {
      badgeClass = 'bg-blue-100 text-blue-800 border-blue-200';
      iconClass = 'bg-blue-50 text-blue-700 border-blue-200';
    } else if (isTransversal) {
      badgeClass = 'bg-purple-100 text-purple-800 border-purple-200';
      iconClass = 'bg-purple-50 text-purple-700 border-purple-200';
    } else if (isInstitucional) {
      badgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-200';
      iconClass = 'bg-emerald-50 text-sena-dark border-emerald-200';
    } else if (isProductiva) {
      badgeClass = 'bg-teal-100 text-teal-800 border-teal-200';
      iconClass = 'bg-teal-50 text-teal-700 border-teal-200';
    }

    // Porcentaje relativo de horas sobre el total del programa (3.984h)
    const percentProgram = ((comp.horas / 3984) * 100).toFixed(1);

    const rapsCount = comp.resultados_aprendizaje ? comp.resultados_aprendizaje.length : 0;
    const rapsHtml = (comp.resultados_aprendizaje || []).map(rap => `
      <div class="p-3 bg-slate-50 hover:bg-slate-100/90 rounded-xl border border-slate-200/80 transition space-y-1.5">
        <div class="flex items-center justify-between gap-2">
          <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white border border-slate-300 text-sena-dark shadow-2xs">
            RAP ${rap.codigo_rap}
          </span>
          <span class="text-[10px] text-slate-400 font-semibold">Resultado #${rap.numero}</span>
        </div>
        <p class="text-xs text-slate-700 leading-relaxed font-normal">
          ${rap.texto}
        </p>
      </div>
    `).join('');

    return `
      <div class="competencia-card bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between" id="${comp.id}">
        <div>
          <!-- Top de la tarjeta: Icono, Códigos y Badges -->
          <div class="flex items-start justify-between gap-3 mb-3">
            <div class="flex items-center space-x-3 min-w-0">
              <div class="w-11 h-11 rounded-xl ${iconClass} border flex items-center justify-center flex-shrink-0 shadow-2xs">
                <i data-lucide="${comp.icono || 'book'}" class="w-5 h-5"></i>
              </div>
              <div class="truncate">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                    Cód. ${comp.codigo}
                  </span>
                  <span class="text-[10px] font-semibold px-2 py-0.5 rounded-md border ${badgeClass}">
                    ${comp.tipo}
                  </span>
                </div>
                <span class="text-[10px] text-slate-500 block mt-0.5 font-medium truncate">
                  ${comp.fase}
                </span>
              </div>
            </div>

            <!-- Horas de la Competencia -->
            <div class="text-right flex-shrink-0">
              <div class="text-xl sm:text-2xl font-extrabold text-slate-800">
                ${comp.horas} <span class="text-[10px] font-bold text-slate-500 uppercase">Horas</span>
              </div>
              <span class="text-[10px] text-slate-400 font-medium">
                ${percentProgram}% del programa
              </span>
            </div>
          </div>

          <!-- Nombre y Denominación -->
          <h3 class="text-sm sm:text-base font-bold text-slate-900 leading-snug">
            ${comp.nombre}
          </h3>
          <p class="text-xs text-slate-600 mt-1 italic leading-relaxed">
            "${comp.denominacion}"
          </p>

          <!-- Descripción pedagógica -->
          <p class="text-xs text-slate-500 mt-2.5 leading-relaxed bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
            ${comp.descripcion}
          </p>

          <!-- Barra de distribución visual de horas -->
          <div class="mt-3.5 space-y-1">
            <div class="flex justify-between items-center text-[10px] font-semibold text-slate-500">
              <span>Intensidad Horaria</span>
              <span>${comp.horas} Horas • ${rapsCount} ${rapsCount === 1 ? 'RAP' : 'RAPs'}</span>
            </div>
            <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div class="h-full bg-gradient-to-r from-emerald-500 to-sena-green rounded-full" style="width: ${Math.min(100, Math.max(6, (comp.horas / 1008) * 100))}%;"></div>
            </div>
          </div>
        </div>

        <!-- Sección Desplegable de RAPs (Acordeón) -->
        <div class="mt-4 pt-3 border-t border-slate-100">
          <button type="button" onclick="toggleRapList('${comp.id}')" class="w-full py-2.5 px-3 bg-slate-100/80 hover:bg-slate-200/80 rounded-xl flex items-center justify-between text-xs font-semibold text-slate-700 transition" aria-expanded="false" id="btn-toggle-${comp.id}">
            <span class="flex items-center gap-1.5">
              <i data-lucide="list-ordered" class="w-3.5 h-3.5 text-sena-dark"></i>
              <span>${rapsCount} ${rapsCount === 1 ? 'Resultado de Aprendizaje' : 'Resultados de Aprendizaje (RAPs)'}</span>
            </span>
            <i data-lucide="chevron-down" class="w-4 h-4 text-slate-500 transition-transform duration-200" id="chevron-${comp.id}"></i>
          </button>

          <!-- Contenedor desplegable -->
          <div id="raps-${comp.id}" class="raps-list hidden mt-2.5 space-y-2">
            ${rapsHtml}
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

function toggleRapList(compId) {
  const rapsContainer = document.getElementById(`raps-${compId}`);
  const chevron = document.getElementById(`chevron-${compId}`);
  const btn = document.getElementById(`btn-toggle-${compId}`);
  if (!rapsContainer) return;

  const isHidden = rapsContainer.classList.contains('hidden');
  if (isHidden) {
    rapsContainer.classList.remove('hidden');
    if (chevron) chevron.classList.add('rotate-180');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  } else {
    rapsContainer.classList.add('hidden');
    if (chevron) chevron.classList.remove('rotate-180');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
  if (window.lucide) lucide.createIcons();
}

function toggleAllRaps(expand) {
  const allRapLists = document.querySelectorAll('.raps-list');
  allRapLists.forEach(list => {
    const id = list.id.replace('raps-', '');
    const chevron = document.getElementById(`chevron-${id}`);
    const btn = document.getElementById(`btn-toggle-${id}`);
    if (expand) {
      list.classList.remove('hidden');
      if (chevron) chevron.classList.add('rotate-180');
      if (btn) btn.setAttribute('aria-expanded', 'true');
    } else {
      list.classList.add('hidden');
      if (chevron) chevron.classList.remove('rotate-180');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }
  });
  if (window.lucide) lucide.createIcons();
}

/* ==========================================================================
   MODAL RESUMEN EJECUTIVO DEL DISEÑO CURRICULAR
   ========================================================================== */
function openCurriculumSummaryModal() {
  const modal = document.getElementById('curriculumSummaryModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
  if (window.lucide) lucide.createIcons();
}

function closeCurriculumSummaryModal() {
  const modal = document.getElementById('curriculumSummaryModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

/* ==========================================================================
   MODALES GENERALES Y AYUDA
   ========================================================================== */
function openModalDetalle(titulo, descripcion) {
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modal = document.getElementById('genericModal');
  if (modalTitle) modalTitle.innerText = titulo;
  if (modalBody) modalBody.innerText = descripcion;
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeModal() {
  const modal = document.getElementById('genericModal');
  if (modal) modal.classList.add('hidden');
}

function showHelpModal() {
  openModalDetalle(
    'Diseño Curricular y Repositorio ADSO',
    'Este portal interactivo presenta el diseño curricular oficial (Código 228118, 3.984 horas) del Tecnólogo en Análisis y Desarrollo de Software del SENA CADPH Garzón Huila, junto a las guías formativas organizadas por fases.'
  );
}

function returnToWelcome() {
  window.location.href = 'index.html';
}

function showAssistantDialog() {
  const modal = document.getElementById('assistantModal');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeAssistantModal() {
  const modal = document.getElementById('assistantModal');
  if (modal) modal.classList.add('hidden');
}

/* ==========================================================================
   SIDEBAR RESPONSIVO Y COLAPSO
   ========================================================================== */
function toggleMobileSidebar() {
  const sidebar = document.getElementById('mainSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (!sidebar) return;
  const isClosed = sidebar.classList.contains('-translate-x-full');
  if (isClosed) {
    sidebar.classList.remove('-translate-x-full');
    if (backdrop) backdrop.classList.remove('hidden');
  } else {
    sidebar.classList.add('-translate-x-full');
    if (backdrop) backdrop.classList.add('hidden');
  }
  if (window.lucide) lucide.createIcons();
}

let isCollapsed = false;
function toggleSidebarWidth() {
  const sidebar = document.getElementById('mainSidebar');
  const icon = document.getElementById('sidebarToggleIcon');
  if (!sidebar) return;
  if (!isCollapsed) {
    sidebar.classList.add('is-collapsed');
    sidebar.classList.remove('w-72');
    isCollapsed = true;
  } else {
    sidebar.classList.remove('is-collapsed');
    sidebar.classList.add('w-72');
    isCollapsed = false;
  }
  if (icon) {
    icon.setAttribute('data-lucide', isCollapsed ? 'chevron-right' : 'chevron-left');
  }
  if (window.lucide) lucide.createIcons();
}

// Filtrar temas (sección temarios)
function filterTopics() {
  const input = document.getElementById('topicSearchInput');
  if (!input) return;
  const query = input.value.toLowerCase();
  const cards = document.querySelectorAll('.topic-card');
  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    if (text.includes(query)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// Configuración de redimensionamiento de ventana
window.addEventListener('resize', () => {
  const sidebar = document.getElementById('mainSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (!sidebar) return;
  if (window.innerWidth >= 1024) {
    sidebar.classList.remove('-translate-x-full');
    if (backdrop) backdrop.classList.add('hidden');
  } else {
    sidebar.classList.add('-translate-x-full');
    if (backdrop) backdrop.classList.add('hidden');
  }
});

// Soporte para cerrar modales con la tecla Escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCurriculumSummaryModal();
    closeModal();
    closeAssistantModal();
    if (typeof closeSessionModal === 'function') closeSessionModal();
  }
});

/* ==========================================================================
   INICIALIZACIÓN DEL PORTAL
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('mainSidebar');
  if (sidebar && window.innerWidth < 1024) {
    sidebar.classList.add('-translate-x-full');
  }

  // Comprobar si hay hash en la URL (ej. #diseno, #checklist, #fases, etc.)
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const tabTarget = hash.startsWith('tab-') ? hash : 'tab-' + hash;
    if (document.getElementById(tabTarget)) {
      switchTab(tabTarget);
    } else {
      switchTab('tab-diseno');
    }
  } else {
    // Pestaña inicial por defecto: Diseño Curricular
    switchTab('tab-diseno');
  }

  // Pre-cargar datos y renderizar tarjetas de competencias
  renderCompetenciasCards();

  if (window.lucide) lucide.createIcons();
});
