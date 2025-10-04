// js/utils/ContentLoader.js


export class ContentLoader {
    constructor(placeholderId, htmlFilePath, afterLoadCallback = null) {
        this.placeholder = document.getElementById(placeholderId);
        this.htmlFilePath = htmlFilePath;
        this.afterLoadCallback = afterLoadCallback;
        this.contentLoaded = false;
        this.parentSection = this.placeholder ? this.placeholder.closest('.content-section') : null;
    }

    async loadContent() {
        if (this.contentLoaded) return;
        this.contentLoaded = true;

        try {
            const response = await fetch(this.htmlFilePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const htmlContent = await response.text();
            
            if (this.placeholder) {
                this.placeholder.innerHTML = htmlContent;

                if (this.parentSection) {
                    this.parentSection.classList.add('visible');
                    this.parentSection.classList.remove('hidden');
                }
                
                if (this.afterLoadCallback && typeof this.afterLoadCallback === 'function') {
                    this.afterLoadCallback();
                }

            } else {
                console.error(`Placeholder no encontrado para ${this.htmlFilePath}`);
            }

        } catch (error) {
            console.error(`Error al cargar ${this.htmlFilePath}:`, error);
            if (this.placeholder) {
                this.placeholder.innerHTML = `<p style="color: red;">Error al cargar el contenido. Intente de nuevo. (${error.message})</p>`;
                this.contentLoaded = false;
            }
        }
    }
}
