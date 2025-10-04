// js/observers/importanceObserver.js
export function setupImportanceObserver() {
    const importanceSection = document.getElementById('project-importance');
    if (!importanceSection) {
        console.error("NO SE ENCUENTRA project-importance EN EL DOM");
        return;
    }
    const importanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden');
                importanceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    importanceObserver.observe(importanceSection);
    console.log("Observador de project-importance activado");
}