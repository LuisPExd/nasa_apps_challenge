// js/main.js

// ======================================================================
// 1. IMPORTACIÓN DE MÓDULOS
// ======================================================================

// Clases Principales
import { Carousel } from './utils/Carousel.js';
import { UIHandler } from './UIHandler.js';
import { ContentLoader } from './utils/ContentLoader.js';

// Funciones de utilidad
import { animateSDGCards } from './utils/animateSDG.js';
import { setupSmoothScroll } from './utils/smoothScroll.js';

// Observadores
import { setupAboutLoadObserver } from './observers/aboutObserver.js';
import { setupImportanceObserver } from './observers/importanceObserver.js';
import { setupCoreValuesLoadObserver } from './observers/coreValuesObserver.js';
import { setupSDGLoadObserver } from './observers/sdgObserver.js';
import { setupMapLoadObserver } from './observers/mapObserver.js';
import { setupChartsLoadObserver } from './observers/chartsObserver.js';


// ======================================================================
// 2. INICIALIZACIÓN DE LA APLICACIÓN
// ======================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded. Iniciando la aplicación modular.");

    // --- Instancias de Clases ---

    // 1. Carrusel: Inicializa el carrusel de la sección principal
    const carousel = new Carousel('carousel-container', 4000);
    carousel.init();

    // 2. UI Handler: Para el header sticky y el scroll de la flecha
    // UIHandler no necesita init() ya que su lógica se ejecuta en el constructor
    const uiHandler = new UIHandler('main-header', 'about-us-section');

    // 3. Content Loaders: Para la carga asíncrona de las secciones
    const aboutUsLoader = new ContentLoader('about-content-placeholder', 'about.html');
    const coreValuesLoader = new ContentLoader('core-values-placeholder', 'core_values.html');
    // Se pasa la función importada como callback
    const sdgLoader = new ContentLoader('sdg-content-placeholder', 'sdg_alignment.html', animateSDGCards);
    const mapLoader = new ContentLoader('map-content-placeholder', 'map.html');
    const chartsLoader = new ContentLoader('charts-content-placeholder', 'charts.html');

    // --- Lógica de Intersección (Lazy Loading/Animation) ---
    
    // Observadores para la carga de contenido
    setupAboutLoadObserver(aboutUsLoader);
    setupImportanceObserver();
    setupCoreValuesLoadObserver(coreValuesLoader);
    setupSDGLoadObserver(sdgLoader);
    setupMapLoadObserver(mapLoader);
    setupChartsLoadObserver(chartsLoader);

    // [Ajuste de navegación para enlaces internos]
    setupSmoothScroll();
});
