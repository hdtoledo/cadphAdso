/**
 * Lógica interactiva del Dashboard / Explorador ADSO CADPH Garzón
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
    'tab-inicio': 'nav-inicio',
    'tab-checklist': 'nav-checklist',
    'tab-temarios': 'nav-temarios',
    'tab-fases': 'nav-fases',
    'tab-repo': 'nav-repo',
    'tab-ficha': 'nav-ficha'
  };

  const breadcrumbMap = {
    'tab-inicio': 'Formación ADSO 2026 - CADPH Garzón',
    'tab-checklist': 'Checklist de Competencias Curriculares',
    'tab-temarios': 'Temarios & Explicaciones de Desarrollo',
    'tab-fases': 'Fases Metodológicas del Proyecto',
    'tab-repo': 'Repositorio GitHub & Despliegue Pages',
    'tab-ficha': 'Información del Programa Formativo'
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

  if (window.lucide) lucide.createIcons();
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
  if (window.lucide) lucide.createIcons();
});
