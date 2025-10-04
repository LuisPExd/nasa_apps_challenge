// js/observers/coreValuesObserver.js
import { ContentLoader } from '../utils/ContentLoader.js';

/**
 * Configura el IntersectionObserver para cargar el contenido de "Valores Centrales".
 * @param {ContentLoader} coreValuesLoader Instancia del ContentLoader para la sección.
 */
export function setupCoreValuesLoadObserver(coreValuesLoader) {
    const coreValuesSection = document.getElementById('core-values-section');
    if (!coreValuesSection) {
        console.error("NO SE ENCUENTRA core-values-section EN EL DOM");
        return;
    }
    const coreValuesLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                coreValuesLoader.loadContent();
                coreValuesLoadObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    coreValuesLoadObserver.observe(coreValuesSection);
    console.log("Observador de core-values-section activado");
}