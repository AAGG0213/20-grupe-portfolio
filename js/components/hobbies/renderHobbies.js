import { isValidHobbies } from './isValidHobbies.js';
import { findIfValidSelector } from './findIfValidSelector.js';
import { isValidHobbieItem } from './isValidHobbieItem.js';

function renderHobbies(params) {
    // input validation
    if (!isValidHobbies(params)) {
        return false;
    }

    // logic
    const { selector, data, limit } = params;

    const DOM = findIfValidSelector(selector);
    if (!DOM) {
        return false;
    }

    let HTML = '';
    for (const item of data) {
        if (!isValidHobbieItem(item)) {
            continue;
        }
        HTML += `<div class="item">
                    <i class="fa fa-${item.icon}"></i>
                    <span>${item.title}</span>
                </div>`;
    }

    // post logic validation



    // result
    DOM.classList.add('hobbie-list');
    DOM.innerHTML = HTML;

    return true;
}

export { renderHobbies }