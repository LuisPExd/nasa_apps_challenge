
// js/utils/Carousel.js


export class Carousel {
    constructor(containerId, interval = 4000) {
        this.container = document.getElementById(containerId);
        this.slides = Array.from(this.container.querySelectorAll('.slide'));
        // Los indicadores se asumen globales, fuera del contenedor del carrusel.
        this.indicators = Array.from(document.querySelectorAll('.carousel-indicators .indicator'));
        this.interval = interval;
        this.currentIndex = 0;
        this.timer = null;
    }

    init() {
        if (this.slides.length === 0) {
            console.error("No se encontraron slides en el carrusel.");
            return;
        }
        
        const initialSlide = this.container.querySelector('.current-slide');
        if (initialSlide) {
            this.currentIndex = parseInt(initialSlide.getAttribute('data-index')) || 0;
        } else {
            this.slides[0].classList.add('current-slide');
            this.indicators[0].classList.add('active');
            this.currentIndex = 0;
        }

        this.startAutoAdvance();
        this.setupIndicators();
    }

    goToSlide(index) {
        this.currentIndex = (index + this.slides.length) % this.slides.length; 

        this.slides.forEach((slide, i) => {
            slide.classList.remove('current-slide');
            if (i === this.currentIndex) {
                slide.classList.add('current-slide');
            }
        });

        this.updateIndicators();
        this.resetAutoAdvance();
    }

    // Se mantiene como arrow function para preservar el contexto 'this' cuando se usa en setInterval
    nextSlide = () => {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    startAutoAdvance() {
        this.timer = setInterval(this.nextSlide, this.interval);
    }

    resetAutoAdvance() {
        clearInterval(this.timer);
        this.startAutoAdvance();
    }

    updateIndicators() {
        this.indicators.forEach((indicator, i) => {
            indicator.classList.remove('active');
            if (i === this.currentIndex) {
                indicator.classList.add('active');
            }
        });
    }

    setupIndicators() {
        this.indicators.forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-slide-to'));
                if (!isNaN(index)) {
                    this.goToSlide(index);
                }
            });
        });
    }
}