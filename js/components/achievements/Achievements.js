import { isValidAchievementItem } from './isValidAchievementItem.js';

class Achievements {
    constructor(params) {
        this.selector = params.selector;
        this.limit = params.limit;
        this.data = params.data;

        this.defaultLimit = 4;
        this.DOM = null;
    }

    init() {
        if (!this.isValidSelector() || !this.isValidData()) {
            return false;
        }

        this.limit = this.isValidLimit() ? this.limit : this.defaultLimit;

        this.render();
    }

    isValidSelector() {
        if (typeof this.selector !== 'string' ||
            this.selector === '') {
            return false;
        }
        const DOM = document.querySelector(this.selector);
        if (!DOM) {
            return false;
        }
        this.DOM = DOM;
        return true;
    }

    isValidData() {
        if (!Array.isArray(this.data) ||
            this.data.length === 0) {
            return false;
        }
        return true;
    }

    isValidLimit() {
        if (typeof this.limit !== 'number' ||
            !isFinite(this.limit) ||
            this.limit < 1 ||
            this.limit % 1 !== 0) {
            return false;
        }
        return true;
    }

    render() {
        let HTML = '';

        let validItems = 0;
        for (const item of this.data) {
            if (validItems === this.limit) {
                break;
            }
            if (!isValidAchievementItem(item)) {
                continue;
            }
            HTML += `<div class="item"> 
                        <i class="fa fa-${item.icon}"></i>
                        <div class="number">${item.number}</div>
                        <div class="label">${item.label}</div>
                    </div>`;
            validItems++;
        }

        if (HTML === '') {
            return false;
        }

        this.DOM.innerHTML = HTML;
    }
}

export { Achievements }