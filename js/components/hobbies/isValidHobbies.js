function isValidHobbies(params) {
    if (typeof params !== 'object' ||
        Array.isArray(params) ||
        Object.keys(params).length === 0) {
        return false;
    }
    if (typeof params.selector !== 'string' ||
        params.selector === '') {
        return false
    }
    if (!Array.isArray(params.data) ||
        params.data.length === 0) {
        return false
    }
    if (typeof params.limit !== 'number' ||
        params.limit < 1 ||
        params.limit % 1 !== 0) {
        return false;
    }
    return true;
}

export { isValidHobbies }