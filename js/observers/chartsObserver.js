// js/observers/chartsObserver.js
import { ContentLoader } from '../utils/ContentLoader.js';

/**
 * Configura el IntersectionObserver para cargar el contenido de "Charts".
 * @param {ContentLoader} chartsLoader Instancia del ContentLoader para la sección.
 */
export function setupChartsLoadObserver(chartsLoader) {
    const chartsSection = document.getElementById('charts-section');
    if (!chartsSection) {
        console.error("NO SE ENCUENTRA charts-section EN EL DOM");
        return;
    }
    
    const chartsLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                chartsLoader.loadContent();
                chartsLoadObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    chartsLoadObserver.observe(chartsSection);
    console.log("Observador de charts activado");
}