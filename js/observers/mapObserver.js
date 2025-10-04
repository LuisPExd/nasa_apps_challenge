// js/observers/mapObserver.js
import { ContentLoader } from '../utils/ContentLoader.js';

/**
 * Configura el IntersectionObserver para cargar el contenido del "Mapa".
 * @param {ContentLoader} mapLoader Instancia del ContentLoader para la sección.
 */
export function setupMapLoadObserver(mapLoader) {
    const mapSection = document.getElementById('map-section');
    if (!mapSection) {
        console.error("NO SE ENCUENTRA map-section EN EL DOM");
        return;
    }
    const mapLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                mapLoader.loadContent();
                mapLoadObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    mapLoadObserver.observe(mapSection);
    console.log("Observador de map-section activado");
}