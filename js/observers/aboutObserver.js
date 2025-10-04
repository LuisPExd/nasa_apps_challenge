// js/observers/aboutObserver.js
import { ContentLoader } from '../utils/ContentLoader.js';

/**
 * Configura el IntersectionObserver para cargar el contenido de "Acerca de Nosotros".
 * @param {ContentLoader} aboutUsLoader Instancia del ContentLoader para la sección.
 */
export function setupAboutLoadObserver(aboutUsLoader) {
    const aboutSection = document.getElementById('about-us-section');
    if (!aboutSection) {
        console.error("NO SE ENCUENTRA about-us-section EN EL DOM");
        return;
    }
    const aboutLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutUsLoader.loadContent();
                aboutLoadObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    aboutLoadObserver.observe(aboutSection);
    console.log("Observador de about-us-section activado");
}