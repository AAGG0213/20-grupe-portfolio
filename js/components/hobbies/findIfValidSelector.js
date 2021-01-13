function findIfValidSelector(selector) {
    if (typeof selector !== 'string') {
        return false;
    }

    if (selector === '') {
        return false;
    }

    const DOM = document.querySelector(selector);
    if (!DOM) {
        return false;
    }
    return DOM;
}

export { findIfValidSelector }