// js/UIHandler.js
export class UIHandler {
    constructor(headerId, targetSectionId) {
        this.header = document.getElementById(headerId);
        this.targetSection = document.getElementById(targetSectionId);
        this.scrollIndicator = document.querySelector('.scroll-indicator');
        this.headerHeight = this.header ? this.header.offsetHeight : 0;
        this.isSticky = false;

        window.addEventListener('scroll', this.handleScroll);
        
        if (this.scrollIndicator) {
            this.scrollIndicator.addEventListener('click', () => this.scrollToTarget(this.targetSection));
        }
    }

    // Se mantiene como arrow function para preservar el contexto 'this' cuando se usa como listener
    handleScroll = () => {
        const scrollPosition = window.scrollY;

        if (this.header) {
            if (scrollPosition > this.headerHeight && !this.isSticky) {
                this.header.classList.remove('header-initial');
                this.header.classList.add('header-sticky');
                this.isSticky = true;
            } else if (scrollPosition <= this.headerHeight && this.isSticky) {
                this.header.classList.remove('header-sticky');
                this.header.classList.add('header-initial');
                this.isSticky = false;
            }
        }

        if (this.scrollIndicator) {
            if (scrollPosition > window.innerHeight - 50) {
                this.scrollIndicator.style.opacity = '0';
                this.scrollIndicator.style.pointerEvents = 'none';
            } else {
                this.scrollIndicator.style.opacity = '1';
                this.scrollIndicator.style.pointerEvents = 'auto';
            }
        }
    }

    scrollToTarget(target) {
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
}