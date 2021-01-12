class Gallery {
    constructor(params) {
        if (!this.isValidInput(params)) {
            return false;
        }

        this.selector = params.selector;
        this.data = params.data;

        this.DOM = null;

        this.init();
    }

    /**
     * Validuojama inicijuojamo objekto gauti parametrai
     * @param {Object} params Objektas aprasantis galerija
     * @param {string} params.selector Tekstinis selector'ius, kaip DOM'e rasti norima vieta, kur bus generuojamas galerijos turinys
     * @param {Object[]} params.data Sarasas objektu aprasanciu galerijos duomenis
     * @returns {boolean} Ar validus inicijuojamo objekto gauti parametrai
     */
    isValidInput(params) {
        if (typeof params !== 'object' ||
            Object.keys(params).length === 0) {
            return false;
        }
        if (typeof params.selector !== 'string' ||
            params.selector === '') {
            return false;
        }
        if (!Array.isArray(params.data) ||
            params.data.length === 0) {
            return false;
        }
        return true;
    }

    /**
     * Automatiskai paleidziamas metodas, kai yra kuriamas `Gallery` klases objektas
     * @returns {void}
     */
    init() {
        if (!this.isValidSelector()) {
            return false;
        }
        this.render();
    }

    /**
     * Pagal pateikta `this.selector` yra ieskoma `DOM` vieta puslapyje ir ja radus yra issaugoma `this.DOM`
     * @returns {boolean} Ar pavyko rasti `DOM` elementa
     */
    isValidSelector() {
        const DOM = document.querySelector(this.selector);
        if (!DOM) {
            return false;
        }
        this.DOM = DOM;
        return true;
    }

    /**
     * Sukonstruoja galutini `HTML` teksta is pateiktu duomenu ir ji istati i nurodyta `this.DOM` vieta pagal gauta `this.selector` parametra
     * @returns {boolean} Ar pavyko sugeneruoti turini
     */
    render() {
        let listHTML = '';

        for (const item of this.data) {
            listHTML += this.generateGalleryItem(item);
        }

        if (listHTML === '') {
            return false;
        }

        this.DOM.innerHTML = `<div class="gallery">
                                <div class="filter"></div>
                                <div class="list">${listHTML}</div>
                            </div>`;
        return true;
    }

    /**
     * Sukonstruoja galerijos elementa reprezentuojanti HTML tekstini turini
     * @param {Object} item Objektas aprasantis viena galerijos saraso elementa
     * @param {string} item.image Kelias i nuotrauka
     * @param {string} item.title Galerijos elemento pavadinimas
     * @param {string[]} item.tags Galerijos elementa aprasanciu tag'u sarasas
     * @param {string} item.tags[] Galerijos elementa aprasanciu tag'as
     * @returns {string} HTML tekstas
     */
    generateGalleryItem(item) {
        if (!item ||
            typeof item !== 'object' ||
            Array.isArray(item) ||
            typeof item.image !== 'string' ||
            item.image === '' ||
            typeof item.title !== 'string' ||
            item.title === '' ||
            !Array.isArray(item.tags) ||
            item.tags.length === 0) {
            return '';
        }
        return `<div class="item">
                    <img class="img" src="./img/portfolio/${item.image}" alt="Gallery item">
                    <div class="texts">
                        <div class="title">${item.title}</div>
                        <div class="tags">${item.tags.join(' &#9679; ')}</div>
                    </div>
                </div>`;
    }
}

export { Gallery }