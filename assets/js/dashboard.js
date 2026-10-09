/**
 * Lógica interactiva del Dashboard / Explorador ADSO CADPH Garzón
 */

// Navegación de pestañas en el dashboard
// opts.keepSidebar = true evita cerrar el sidebar en móviles (p. ej. al abrir un submenú)
function switchTab(tabId, opts = {}) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  const target = document.getElementById(tabId);
  if (target) target.classList.remove('hidden');

  // Actualizar botones de navegación del sidebar
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.remove('bg-sena-green', 'text-white', 'shadow-md');
    btn.classList.add('text-slate-200', 'hover:bg-white/10', 'hover:text-white');
  });

  const navBtnMap = {
    'tab-inicio': 'nav-inicio',
    'tab-checklist': 'nav-checklist',
    'tab-temarios': 'nav-temarios',
    'tab-fases': 'nav-fases',
    'tab-repo': 'nav-repo',
    'tab-ficha': 'nav-ficha',
    'tab-diseno': 'nav-diseno'
  };

  const breadcrumbMap = {
    'tab-inicio': 'Formación ADSO 2026 - CADPH Garzón',
    'tab-checklist': 'Checklist de Competencias Curriculares',
    'tab-temarios': 'Temarios & Explicaciones de Desarrollo',
    'tab-fases': 'Fases Metodológicas del Proyecto',
    'tab-repo': 'Repositorio GitHub & Despliegue Pages',
    'tab-ficha': 'Acerca de ADSO: Programa, Repositorio & Instructores',
    'tab-diseno': 'Diseño Curricular Oficial ADSO (Documento PDF)'
  };

  const activeBtn = document.getElementById(navBtnMap[tabId]);
  if (activeBtn) {
    activeBtn.classList.remove('text-slate-200', 'hover:bg-white/10', 'hover:text-white');
    activeBtn.classList.add('bg-sena-green', 'text-white', 'shadow-md');
  }

  // Actualizar breadcrumb
  const bc = document.getElementById('currentBreadcrumb');
  if (bc && breadcrumbMap[tabId]) bc.innerText = breadcrumbMap[tabId];

  // Limpiar la fase activa del submenú al cambiar de pestaña
  setActiveFase(null);

  // En móviles, cerrar el sidebar al seleccionar
  if (window.innerWidth < 1024 && !opts.keepSidebar) {
    const sidebar = document.getElementById('mainSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar) sidebar.classList.add('-translate-x-full');
    if (backdrop) backdrop.classList.add('hidden');
  }

  if (window.lucide) lucide.createIcons();
}

// ================= SUBMENÚ DESPLEGABLE: FASES DEL PROYECTO =================
const FASES = {
  1: 'Fase 1: Análisis',
  2: 'Fase 2: Planeación',
  3: 'Fase 3: Ejecución',
  4: 'Fase 4: Evaluación'
};

function setFasesMenuOpen(open) {
  const submenu = document.getElementById('fasesSubmenu');
  const chevron = document.getElementById('fasesChevron');
  const btn = document.getElementById('nav-fases');
  if (!submenu) return;
  submenu.classList.toggle('max-h-0', !open);
  submenu.classList.toggle('max-h-64', open);
  if (chevron) chevron.classList.toggle('rotate-180', open);
  if (btn) btn.setAttribute('aria-expanded', String(open));
}

// Clic en "Fases del Proyecto": muestra la pestaña y abre/cierra el desplegable
function toggleFasesMenu() {
  const submenu = document.getElementById('fasesSubmenu');
  const sidebar = document.getElementById('mainSidebar');
  const isOpen = submenu && !submenu.classList.contains('max-h-0');
  const collapsed = sidebar && sidebar.classList.contains('is-collapsed');

  // Con el sidebar colapsado solo navega a la pestaña
  if (collapsed) {
    switchTab('tab-fases');
    return;
  }
  switchTab('tab-fases', { keepSidebar: true });
  setFasesMenuOpen(!isOpen);
}

// Resalta la fase seleccionada en el submenú y en las tarjetas
function setActiveFase(num) {
  document.querySelectorAll('.nav-subitem').forEach(item => {
    const active = Number(item.dataset.fase) === num;
    item.classList.toggle('bg-white/10', active);
    item.classList.toggle('text-white', active);
    item.classList.toggle('font-semibold', active);
    item.classList.toggle('text-slate-300', !active);
  });
  document.querySelectorAll('.fase-card').forEach(card => {
    const active = card.id === 'fase-' + num;
    card.classList.toggle('ring-2', active);
    card.classList.toggle('ring-sena-green', active);
    card.classList.toggle('bg-white', active);
  });
}

// Navega a una fase concreta desde el submenú
function goToFase(num) {
  switchTab('tab-fases');
  setFasesMenuOpen(true);
  setActiveFase(num);

  const bc = document.getElementById('currentBreadcrumb');
  if (bc && FASES[num]) bc.innerText = 'Fases del Proyecto › ' + FASES[num];

  const card = document.getElementById('fase-' + num);
  // Desplazar solo el contenedor principal (no todo el layout)
  const main = card && card.closest('main');
  if (main) {
    const top = card.getBoundingClientRect().top - main.getBoundingClientRect().top + main.scrollTop - 24;
    main.scrollTo({ top, behavior: 'smooth' });
  }
  history.replaceState(null, '', '#fase-' + num);
}

// Modal de confirmación genérico
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
  openModalDetalle('Repositorio Formativo ADSO CADPH', 'Este portal contiene la organización curricular, guías y recursos de formación para el programa Análisis y Desarrollo de Software del SENA Garzón Huila.');
}

function returnToWelcome() {
  window.location.href = 'index.html';
}

// Modal del asistente
function showAssistantDialog() {
  const modal = document.getElementById('assistantModal');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeAssistantModal() {
  const modal = document.getElementById('assistantModal');
  if (modal) modal.classList.add('hidden');
}

// Alternar menú móvil
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

// Alternar ancho del sidebar en escritorio (Colapsar / Expandir)
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

// Menú de accesibilidad
function toggleAccessibilityMenu() {
  const menu = document.getElementById('accessibilityMenu');
  if (menu) menu.classList.toggle('hidden');
  if (window.lucide) lucide.createIcons();
}

let currentZoom = 100;
function adjustFontSize(delta) {
  currentZoom += delta * 10;
  if (currentZoom < 80) currentZoom = 80;
  if (currentZoom > 140) currentZoom = 140;
  document.body.style.fontSize = currentZoom + '%';
}

function resetFontSize() {
  currentZoom = 100;
  document.body.style.fontSize = '100%';
}

// Filtrar temas
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

// Configuración responsiva
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

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('mainSidebar');
  if (sidebar && window.innerWidth < 1024) {
    sidebar.classList.add('-translate-x-full');
  }

  // Soporte para enlaces directos con hash (ej. #diseno, #checklist, etc.)
  const hash = window.location.hash.replace('#', '');
  const faseMatch = hash.match(/^fase-([1-4])$/);
  if (faseMatch) {
    goToFase(Number(faseMatch[1]));
  } else if (hash) {
    const tabTarget = hash.startsWith('tab-') ? hash : 'tab-' + hash;
    if (document.getElementById(tabTarget)) {
      switchTab(tabTarget);
    }
  }

  if (window.lucide) lucide.createIcons();
});
