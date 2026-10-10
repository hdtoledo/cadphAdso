/**
 * ============================================================================
 * CARGADOR DE COMPONENTES MODULARES — SENA CADPH GARZÓN (ADSO)
 * ============================================================================
 * Carga e inyecta dinámicamente componentes HTML modulares desde la carpeta
 * `components/` (layout, views, modals) preservando la semántica DOM, los
 * tokens de diseño del SENA y ejecutando los iconos Lucide.
 */

(function () {
  'use strict';

  /**
   * Carga un componente individual e inyecta su contenido en el DOM.
   * @param {HTMLElement} placeholder - Elemento con atributo data-component
   * @returns {Promise<void>}
   */
  async function loadSingleComponent(placeholder) {
    const componentPath = placeholder.getAttribute('data-component');
    if (!componentPath) return;

    try {
      const response = await fetch(componentPath);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: no se pudo cargar ${componentPath}`);
      }

      const html = await response.text();
      const template = document.createElement('template');
      template.innerHTML = html.trim();

      // Si el componente tiene un único elemento raíz, reemplazar directamente
      if (template.content.children.length === 1) {
        placeholder.replaceWith(template.content.firstElementChild);
      } else {
        // Si tiene múltiples elementos (ej. aside + backdrop), usar fragmento
        placeholder.replaceWith(template.content);
      }
    } catch (error) {
      console.error(`[ComponentLoader] Error al cargar ${componentPath}:`, error);

      // Aviso amistoso en caso de bloqueo por protocolo file://
      if (window.location.protocol === 'file:') {
        placeholder.innerHTML = `
          <div class="p-4 my-2 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs">
            <strong>Nota de Servidor Local:</strong> Estás abriendo el archivo mediante <code>file:///</code>. 
            Para cargar los componentes modulares correctamente, abre el proyecto mediante un servidor local 
            (ej. <em>VS Code Live Server</em> en <code>http://127.0.0.1:5500</code>) o consulta el despliegue en 
            <a href="https://hdtoledo.github.io/cadphAdso/explorar.html" class="underline font-bold text-sena-dark" target="_blank">GitHub Pages</a>.
          </div>
        `;
      } else {
        placeholder.innerHTML = `
          <div class="p-3 my-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
            No se pudo cargar el componente: <code>${componentPath}</code>
          </div>
        `;
      }
    }
  }

  /**
   * Carga todos los componentes declarados en el DOM.
   * @returns {Promise<void>}
   */
  async function loadAllComponents() {
    const placeholders = Array.from(document.querySelectorAll('[data-component]'));
    if (placeholders.length === 0) return;

    // Cargar en paralelo todos los componentes
    await Promise.all(placeholders.map(loadSingleComponent));

    // Inicializar iconos Lucide en todos los componentes inyectados
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }

    // Disparar evento personalizado para avisar que todos los componentes están en el DOM
    document.dispatchEvent(new CustomEvent('adso:componentsLoaded', {
      detail: { count: placeholders.length }
    }));
  }

  // Exponer API global
  window.adsoComponentLoader = {
    loadAll: loadAllComponents,
    loadSingle: loadSingleComponent
  };

  // Iniciar la carga al estar listo el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllComponents);
  } else {
    loadAllComponents();
  }
})();
