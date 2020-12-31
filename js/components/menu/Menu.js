class Menu {
    constructor(params) {
        this.selector = params.selector;
        this.structure = params.structure;

        this.DOM = null;
    }

    init() {
        if (!this.isValidSelector()) {
            return false;
        }
        this.render();
    }

    isValidSelector() {
        if (typeof this.selector !== 'string') {
            return false;
        }

        if (this.selector === '') {
            return false;
        }

        const DOM = document.querySelector(this.selector);
        if (!DOM) {
            return false;
        }

        this.DOM = DOM;
        return true;
    }

    isHomePage(title) {
        return title === 'Home';
    }

    isValidMenuItem(item) {
        if (typeof item !== 'object' ||
            typeof item.href !== 'string' ||
            typeof item.title !== 'string' ||
            item.href === '' ||
            item.title === '') {
            return false;
        }
        return true;
    }

    generateHTML(item) {
        if (!this.isValidMenuItem(item)) {
            return '';
        }

        const active = this.isHomePage(item.title) ? 'active' : '';
        return `<a href="${item.href}" class="${active}">${item.title}</a>`;
    }

    render() {
        let HTML = '';
        for (const item of this.structure) {
            HTML += this.generateHTML(item);
        }

        this.DOM.innerHTML = HTML;
    }
}

export { Menu }