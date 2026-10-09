/**
 * ============================================================================
 * ACCESIBILIDAD WEB INTEGRAL — SENA CADPH GARZÓN (ADSO)
 * Cumplimiento de Pautas WCAG 2.1 / 2.2 Nivel AA
 * ============================================================================
 * Características:
 * - Ajuste dinámico de tamaño de texto (80% a 150%) afectando unidades rem de raíz.
 * - Modo de Alto Contraste accesible (WCAG AAA).
 * - Subrayado forzado de enlaces para personas con daltonismo / baja visión.
 * - Modo de texto legible con espaciado de línea y letras optimizado.
 * - Persistencia de preferencias en localStorage entre páginas y sesiones.
 * - Soporte total de teclado (Tab, Escape para cerrar, navegación fluida).
 * - Notificaciones para lectores de pantalla mediante aria-live polite.
 */

(function () {
  'use strict';

  // Estado de accesibilidad
  const STATE = {
    zoom: 100,
    highContrast: false,
    underlineLinks: false,
    legibleFont: false,
    menuOpen: false
  };

  // Constantes
  const STORAGE_KEY = 'adso_accessibility_settings';
  const MIN_ZOOM = 80;
  const MAX_ZOOM = 150;
  const ZOOM_STEP = 10;

  /**
   * Cargar configuración guardada
   */
  function loadSettings() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.zoom === 'number') STATE.zoom = parsed.zoom;
        if (typeof parsed.highContrast === 'boolean') STATE.highContrast = parsed.highContrast;
        if (typeof parsed.underlineLinks === 'boolean') STATE.underlineLinks = parsed.underlineLinks;
        if (typeof parsed.legibleFont === 'boolean') STATE.legibleFont = parsed.legibleFont;
      }
    } catch (e) {
      console.warn('No se pudo acceder a localStorage para accesibilidad:', e);
    }
  }

  /**
   * Guardar configuración actual
   */
  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        zoom: STATE.zoom,
        highContrast: STATE.highContrast,
        underlineLinks: STATE.underlineLinks,
        legibleFont: STATE.legibleFont
      }));
    } catch (e) {
      console.warn('Error al guardar preferencias de accesibilidad:', e);
    }
  }

  /**
   * Notificar a lectores de pantalla
   */
  function announce(message) {
    let announcer = document.getElementById('accessibilityAnnouncer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'accessibilityAnnouncer';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      document.body.appendChild(announcer);
    }
    announcer.textContent = '';
    setTimeout(() => {
      announcer.textContent = message;
    }, 50);
  }

  /**
   * Aplicar tamaño de fuente a la raíz del documento
   */
  function applyZoom() {
    document.documentElement.style.fontSize = STATE.zoom + '%';
    const badge = document.getElementById('zoomPercentageBadge');
    if (badge) {
      badge.textContent = STATE.zoom + '%';
    }
  }

  /**
   * Aplicar clases de accesibilidad al elemento HTML
   */
  function applyClasses() {
    const root = document.documentElement;

    // Alto contraste
    if (STATE.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    updateButtonToggle('btnToggleContrast', STATE.highContrast);

    // Subrayado de enlaces
    if (STATE.underlineLinks) {
      root.classList.add('underline-links');
    } else {
      root.classList.remove('underline-links');
    }
    updateButtonToggle('btnToggleUnderline', STATE.underlineLinks);

    // Fuente legible
    if (STATE.legibleFont) {
      root.classList.add('legible-font');
    } else {
      root.classList.remove('legible-font');
    }
    updateButtonToggle('btnToggleLegibleFont', STATE.legibleFont);
  }

  /**
   * Actualizar apariencia de botón activo/inactivo
   */
  function updateButtonToggle(btnId, isActive) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    const badge = btn.querySelector('.toggle-badge');
    if (badge) {
      if (isActive) {
        badge.textContent = 'ACTIVO';
        badge.className = 'toggle-badge text-[10px] font-bold px-1.5 py-0.5 rounded bg-sena-green text-white';
      } else {
        badge.textContent = 'INACTIVO';
        badge.className = 'toggle-badge text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-600';
      }
    }
  }

  /**
   * Alternar visibilidad del menú
   */
  function toggleAccessibilityMenu(forceState) {
    const menu = document.getElementById('accessibilityMenu');
    const btn = document.getElementById('accessibilityToggleBtn');
    if (!menu) return;

    if (typeof forceState === 'boolean') {
      STATE.menuOpen = forceState;
    } else {
      STATE.menuOpen = !STATE.menuOpen;
    }

    if (STATE.menuOpen) {
      menu.classList.remove('hidden');
      if (btn) btn.setAttribute('aria-expanded', 'true');
      const firstAction = menu.querySelector('button');
      if (firstAction) firstAction.focus();
    } else {
      menu.classList.add('hidden');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  /**
   * Ajustar tamaño de letra
   */
  function adjustFontSize(delta) {
    const newZoom = STATE.zoom + (delta * ZOOM_STEP);
    if (newZoom >= MIN_ZOOM && newZoom <= MAX_ZOOM) {
      STATE.zoom = newZoom;
      applyZoom();
      saveSettings();
      announce('Tamaño de fuente ajustado a ' + STATE.zoom + ' por ciento');
    }
  }

  /**
   * Restablecer solo el tamaño de letra
   */
  function resetFontSize() {
    STATE.zoom = 100;
    applyZoom();
    saveSettings();
    announce('Tamaño de fuente restablecido a 100 por ciento');
  }

  /**
   * Alternar Modo Alto Contraste
   */
  function toggleHighContrast() {
    STATE.highContrast = !STATE.highContrast;
    applyClasses();
    saveSettings();
    announce(STATE.highContrast ? 'Modo de alto contraste activado' : 'Modo de alto contraste desactivado');
  }

  /**
   * Alternar Subrayado de Enlaces
   */
  function toggleUnderlineLinks() {
    STATE.underlineLinks = !STATE.underlineLinks;
    applyClasses();
    saveSettings();
    announce(STATE.underlineLinks ? 'Subrayado de enlaces activado' : 'Subrayado de enlaces desactivado');
  }

  /**
   * Alternar Modo Texto Legible
   */
  function toggleReadableFont() {
    STATE.legibleFont = !STATE.legibleFont;
    applyClasses();
    saveSettings();
    announce(STATE.legibleFont ? 'Modo de espaciado y lectura legible activado' : 'Modo de lectura estándar activado');
  }

  /**
   * Restablecer todas las preferencias de accesibilidad
   */
  function resetAllAccessibility() {
    STATE.zoom = 100;
    STATE.highContrast = false;
    STATE.underlineLinks = false;
    STATE.legibleFont = false;
    applyZoom();
    applyClasses();
    saveSettings();
    announce('Todas las opciones de accesibilidad han sido restablecidas a sus valores iniciales');
  }

  /**
   * Inicialización al cargar el DOM
   */
  function init() {
    loadSettings();
    applyZoom();
    applyClasses();

    // Evento de teclado: Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && STATE.menuOpen) {
        toggleAccessibilityMenu(false);
        const btn = document.getElementById('accessibilityToggleBtn');
        if (btn) btn.focus();
      }
    });

    // Evento de clic: Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!STATE.menuOpen) return;
      const menu = document.getElementById('accessibilityMenu');
      const btn = document.getElementById('accessibilityToggleBtn');
      if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
        toggleAccessibilityMenu(false);
      }
    });

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Exponer API globalmente para ser llamada desde atributos HTML
  window.toggleAccessibilityMenu = toggleAccessibilityMenu;
  window.adjustFontSize = adjustFontSize;
  window.resetFontSize = resetFontSize;
  window.toggleHighContrast = toggleHighContrast;
  window.toggleUnderlineLinks = toggleUnderlineLinks;
  window.toggleReadableFont = toggleReadableFont;
  window.resetAllAccessibility = resetAllAccessibility;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
