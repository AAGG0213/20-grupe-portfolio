class Gallery {
    constructor(params) {
        if (!this.isValidInput(params)) {
            return false;
        }

        this.selector = params.selector;
        this.data = params.data;
        this.validData = [];

        this.DOM = null;
        this.filterDOM = null;
        this.galleryDOM = null;
        this.galleryItemsDOM = null;
        this.filterAllTag = '';

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
        this.addEvents();
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
        const filterHTML = this.generateGalleryFilter();
        const listHTML = this.generateGalleryList();

        if (listHTML === '') {
            return false;
        }

        this.DOM.innerHTML = `<div class="gallery">
                                ${this.filterAllTag === filterHTML ? '' : `<div class="filter">${filterHTML}</div>`}
                                <div class="list">${listHTML}</div>
                            </div>`;

        this.galleryDOM = this.DOM.querySelector('.list');
        this.galleryItemsDOM = this.galleryDOM.querySelectorAll('.item');
        return true;
    }

    /**
     * Galerijos elementu  sarasa reprezentuojancio HTML generavimas
     * @returns {string} Galerijos elementu HTML
     */
    generateGalleryList() {
        let HTML = '';

        for (const item of this.data) {
            HTML += this.generateGalleryItem(item);
        }

        return HTML;
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

        this.validData.push(item);

        const tags = item.tags
            .filter(tag => typeof tag === 'string' && tag.length > 0)
            .map(tag => tag.toLocaleLowerCase());

        this.validData[this.validData.length - 1].tags = [...tags];

        return `<div class="item">
                    <img class="img" src="./img/portfolio/${item.image}" alt="Gallery item">
                    <div class="texts">
                        <div class="title">${item.title}</div>
                        <div class="tags">${tags.join(' &#9679; ')}</div>
                    </div>
                </div>`;
    }


    /**
     * Galerijos filtra generuojantis metodas
     * @returns {string} Galerijos filtro HTML
     */
    generateGalleryFilter() {
        // is visu darbu isrinkti tik tagus
        let allTags = [];
        for (const item of this.data) {
            if (!item.tags) {
                continue;
            }
            allTags = [...allTags, ...item.tags];
        }

        // suformatuojame (paverciama mazosiomis raidemis)
        const formatedTags = allTags
            .filter(tag => typeof tag === 'string' && tag.length > 0)
            .map(tag => tag.toLowerCase());

        // atfiltruoti tik unikalius tagus
        const uniqueTags = [];
        for (const tag of formatedTags) {
            if (!uniqueTags.includes(tag)) {
                uniqueTags.push(tag);
            }
        }

        // TODO: generuojame HTML
        let HTML = '<div class="tag active">All</div>';
        this.filterAllTag = HTML;
        for (const tag of uniqueTags) {
            HTML += `<div class="tag">${tag}</div>`
        }

        // TODO: graziname HTML
        return HTML;
    }

    /**
     * Metodas, kuris sudelioja `event listener'ius` ant filtro elementu
     * @returns {void}
     */
    addEvents() {
        // susirandame filtra, jei egzistuoja
        const filter = this.DOM.querySelector('.filter');
        if (!filter) {
            return false;
        }
        this.filterDOM = filter;

        // susirandame filtro tagus, jei filtras egzistuoja
        const tags = this.filterDOM.querySelectorAll('.tag');

        // uzregistruojame "click" stebejima ant ju (visu)
        for (const tag of tags) {
            tag.addEventListener('click', () => {
                this.updateGalleryList(tag.innerText);
            })
        }
    }

    /**
     * Parodo/paslepia galerijos elementus jei elementas turi/neturi ieskoma tag'a
     * @param {string} tag Tag'o pavadinimas
     * @returns {void}
     */
    updateGalleryList(tag) {
        if (tag === 'All') {
            for (const item of this.galleryItemsDOM) {
                item.classList.remove('hidden');
            }
        } else {
            const size = this.validData.length;
            for (let i = 0; i < size; i++) {
                const item = this.validData[i];
                if (item.tags.includes(tag)) {
                    this.galleryItemsDOM[i].classList.remove('hidden');
                } else {
                    this.galleryItemsDOM[i].classList.add('hidden');
                }
            }
        }
    }
}

export { Gallery }