// js/observers/sdgObserver.js
import { ContentLoader } from '../utils/ContentLoader.js';

/**
 * Configura el IntersectionObserver para cargar el contenido de "Alineación ODS".
 * @param {ContentLoader} sdgLoader Instancia del ContentLoader para la sección.
 */
export function setupSDGLoadObserver(sdgLoader) {
    const sdgAlignmentSection = document.getElementById('sdg-alignment-section');
    if (!sdgAlignmentSection) {
        console.error("NO SE ENCUENTRA sdg-alignment-section EN EL DOM");
        return;
    }
    const sdgLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                sdgLoader.loadContent();
                sdgLoadObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    sdgLoadObserver.observe(sdgAlignmentSection);
    console.log("Observador de sdg-alignment-section activado");
}
