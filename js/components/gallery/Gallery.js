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

    init() {
        if (!this.isValidSelector()) {
            return false;
        }
        this.render();
    }

    isValidSelector() {
        const DOM = document.querySelector(this.selector);
        if (!DOM) {
            return false;
        }
        this.DOM = DOM;
        return true;
    }

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
                    <div class="texts">
                        <div class="title">${item.title}</div>
                        <div class="tags">${item.tags.join(' &#9679; ')}</div>
                    </div>
                </div>`;
    }
}

export { Gallery }