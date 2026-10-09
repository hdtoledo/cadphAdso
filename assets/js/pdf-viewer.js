/**
 * Visor Interactivo y Responsivo del Diseño Curricular Oficial ADSO SENA
 * Basado en PDF.js con soporte táctil, zoom, ajuste de ancho y doble modo de lectura.
 */

const PDF_CONFIG = {
  url: 'docs/DisenoCurricularADSO.pdf',
  workerSrc: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
  minScale: 0.5,
  maxScale: 3.0,
  scaleStep: 0.2
};

let pdfDoc = null;
let currentPageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let currentScale = 1.0;
let isFitWidth = true;
let isFullscreen = false;

// Inicialización de PDF.js
function initPdfViewer() {
  const canvas = document.getElementById('pdfCanvas');
  if (!canvas) return;

  if (window.pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_CONFIG.workerSrc;
    loadPdfDocument();
  } else {
    // Si PDF.js no está disponible, mostrar el visor alternativo en iframe
    showIframeMode();
  }
}

// Cargar el documento PDF
function loadPdfDocument() {
  const loadingIndicator = document.getElementById('pdfLoadingIndicator');
  if (loadingIndicator) loadingIndicator.classList.remove('hidden');

  pdfjsLib.getDocument(PDF_CONFIG.url).promise
    .then(function(doc) {
      pdfDoc = doc;
      const totalPagesEl = document.getElementById('pdfTotalPages');
      const pageInputEl = document.getElementById('pdfPageInput');
      if (totalPagesEl) totalPagesEl.textContent = doc.numPages;
      if (pageInputEl) {
        pageInputEl.max = doc.numPages;
        pageInputEl.value = currentPageNum;
      }

      if (loadingIndicator) loadingIndicator.classList.add('hidden');
      renderPdfPage(currentPageNum);
      setupSwipeGestures();
    })
    .catch(function(error) {
      console.warn('No se pudo cargar con PDF.js, activando visor alternativo:', error);
      if (loadingIndicator) loadingIndicator.classList.add('hidden');
      showIframeMode();
    });
}

// Renderizar una página específica
function renderPdfPage(num) {
  if (!pdfDoc) return;
  pageRendering = true;

  pdfDoc.getPage(num).then(function(page) {
    const container = document.getElementById('pdfScrollContainer');
    const canvas = document.getElementById('pdfCanvas');
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    const availableWidth = container.clientWidth - (window.innerWidth < 640 ? 16 : 32);

    let viewport;
    if (isFitWidth && availableWidth > 120) {
      const baseViewport = page.getViewport({ scale: 1.0 });
      currentScale = availableWidth / baseViewport.width;
      // Mantener escala mínima legible
      if (currentScale < 0.6) currentScale = 0.6;
      viewport = page.getViewport({ scale: currentScale });
    } else {
      viewport = page.getViewport({ scale: currentScale });
    }

    // Ajustar resolución de renderizado para pantallas Retina / alta densidad
    const outputScale = window.devicePixelRatio || 1;
    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);
    canvas.style.width = Math.floor(viewport.width) + 'px';
    canvas.style.height = Math.floor(viewport.height) + 'px';

    const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

    const renderContext = {
      canvasContext: ctx,
      transform: transform,
      viewport: viewport
    };

    const renderTask = page.render(renderContext);

    renderTask.promise.then(function() {
      pageRendering = false;
      if (pageNumPending !== null) {
        renderPdfPage(pageNumPending);
        pageNumPending = null;
      }
    });

    // Actualizar controles de interfaz
    updatePdfUIControls(num);
  });
}

// Actualizar textos e indicadores de la interfaz
function updatePdfUIControls(num) {
  const currentNumEl = document.getElementById('pdfCurrentPage');
  const pageInputEl = document.getElementById('pdfPageInput');
  const zoomLevelEl = document.getElementById('pdfZoomLevel');
  const prevBtn = document.getElementById('pdfPrevBtn');
  const nextBtn = document.getElementById('pdfNextBtn');
  const fitBtn = document.getElementById('pdfFitWidthBtn');

  if (currentNumEl) currentNumEl.textContent = num;
  if (pageInputEl) pageInputEl.value = num;
  if (zoomLevelEl) zoomLevelEl.textContent = Math.round(currentScale * 100) + '%';

  if (prevBtn) prevBtn.disabled = (num <= 1);
  if (nextBtn && pdfDoc) nextBtn.disabled = (num >= pdfDoc.numPages);

  if (fitBtn) {
    if (isFitWidth) {
      fitBtn.classList.add('bg-sena-green', 'text-white');
      fitBtn.classList.remove('bg-white', 'text-slate-700');
    } else {
      fitBtn.classList.remove('bg-sena-green', 'text-white');
      fitBtn.classList.add('bg-white', 'text-slate-700');
    }
  }

  if (window.lucide) lucide.createIcons();
}

// Paginación anterior
function pdfPrevPage() {
  if (currentPageNum <= 1 || pageRendering) return;
  currentPageNum--;
  queueRenderPage(currentPageNum);
}

// Paginación siguiente
function pdfNextPage() {
  if (!pdfDoc || currentPageNum >= pdfDoc.numPages || pageRendering) return;
  currentPageNum++;
  queueRenderPage(currentPageNum);
}

// Cola de renderizado para evitar superposición
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPdfPage(num);
  }
}

// Salto directo de página desde el input
function pdfJumpToPage(input) {
  if (!pdfDoc) return;
  let val = parseInt(input.value, 10);
  if (isNaN(val)) return;
  if (val < 1) val = 1;
  if (val > pdfDoc.numPages) val = pdfDoc.numPages;
  currentPageNum = val;
  queueRenderPage(currentPageNum);
}

// Aumentar zoom
function pdfZoomIn() {
  isFitWidth = false;
  if (currentScale < PDF_CONFIG.maxScale) {
    currentScale += PDF_CONFIG.scaleStep;
    queueRenderPage(currentPageNum);
  }
}

// Disminuir zoom
function pdfZoomOut() {
  isFitWidth = false;
  if (currentScale > PDF_CONFIG.minScale) {
    currentScale -= PDF_CONFIG.scaleStep;
    queueRenderPage(currentPageNum);
  }
}

// Alternar ajuste al ancho
function pdfToggleFitWidth() {
  isFitWidth = !isFitWidth;
  if (isFitWidth) {
    queueRenderPage(currentPageNum);
  } else {
    currentScale = 1.0;
    queueRenderPage(currentPageNum);
  }
}

// Restablecer zoom al 100%
function pdfResetZoom() {
  isFitWidth = false;
  currentScale = 1.0;
  queueRenderPage(currentPageNum);
}

// Alternar modo de visualización (Canvas interactivo vs Iframe nativo)
function setPdfViewMode(mode) {
  const canvasView = document.getElementById('pdfCanvasView');
  const iframeView = document.getElementById('pdfIframeView');
  const btnCanvas = document.getElementById('btnModeCanvas');
  const btnIframe = document.getElementById('btnModeIframe');

  if (mode === 'canvas') {
    if (canvasView) canvasView.classList.remove('hidden');
    if (iframeView) iframeView.classList.add('hidden');
    if (btnCanvas) {
      btnCanvas.classList.add('bg-sena-green', 'text-white');
      btnCanvas.classList.remove('bg-white', 'text-slate-700');
    }
    if (btnIframe) {
      btnIframe.classList.remove('bg-sena-green', 'text-white');
      btnIframe.classList.add('bg-white', 'text-slate-700');
    }
    if (!pdfDoc) {
      initPdfViewer();
    } else {
      renderPdfPage(currentPageNum);
    }
  } else {
    if (canvasView) canvasView.classList.add('hidden');
    if (iframeView) iframeView.classList.remove('hidden');
    if (btnIframe) {
      btnIframe.classList.add('bg-sena-green', 'text-white');
      btnIframe.classList.remove('bg-white', 'text-slate-700');
    }
    if (btnCanvas) {
      btnCanvas.classList.remove('bg-sena-green', 'text-white');
      btnCanvas.classList.add('bg-white', 'text-slate-700');
    }
  }
  if (window.lucide) lucide.createIcons();
}

function showIframeMode() {
  setPdfViewMode('iframe');
}

// Modo Pantalla Completa
function togglePdfFullscreen() {
  const container = document.getElementById('pdfViewerMainCard');
  if (!container) return;

  if (!isFullscreen) {
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen();
    }
    isFullscreen = true;
    container.classList.add('p-4', 'bg-slate-900');
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    isFullscreen = false;
    container.classList.remove('p-4', 'bg-slate-900');
  }
}

// Soporte para gestos táctiles (Swipe en celulares para pasar página)
function setupSwipeGestures() {
  const scrollContainer = document.getElementById('pdfScrollContainer');
  if (!scrollContainer) return;

  let touchStartX = 0;
  let touchStartY = 0;

  scrollContainer.addEventListener('touchstart', function(e) {
    if (e.changedTouches.length === 1) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }
  }, { passive: true });

  scrollContainer.addEventListener('touchend', function(e) {
    if (e.changedTouches.length === 1) {
      const diffX = e.changedTouches[0].screenX - touchStartX;
      const diffY = e.changedTouches[0].screenY - touchStartY;

      // Si el desplazamiento horizontal es significativo y mayor al vertical
      if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
        if (diffX < 0) {
          pdfNextPage(); // Deslizar hacia la izquierda -> siguiente
        } else {
          pdfPrevPage(); // Deslizar hacia la derecha -> anterior
        }
      }
    }
  }, { passive: true });
}

// Re-renderizar si la ventana cambia de tamaño
let resizeTimeout;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function() {
    if (pdfDoc && isFitWidth) {
      renderPdfPage(currentPageNum);
    }
  }, 200);
});

// Soporte para teclas flecha izquierda / derecha
window.addEventListener('keydown', function(e) {
  const tabDiseno = document.getElementById('tab-diseno');
  if (tabDiseno && !tabDiseno.classList.contains('hidden')) {
    if (e.key === 'ArrowLeft') {
      pdfPrevPage();
    } else if (e.key === 'ArrowRight') {
      pdfNextPage();
    }
  }
});
