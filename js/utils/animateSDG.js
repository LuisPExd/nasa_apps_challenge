// js/utils/animateSDG.js
export function animateSDGCards() {
    const cards = document.querySelectorAll('#sdg-alignment-section .sdg-card');
    cards.forEach(card => {
        const delay = parseFloat(card.getAttribute('data-delay')) || 0;
        setTimeout(() => {
            card.classList.remove('hidden-sdg');
            card.classList.add('visible-sdg');
        }, delay * 1000);
    });
}