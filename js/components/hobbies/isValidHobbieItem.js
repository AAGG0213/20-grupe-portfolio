function isValidHobbieItem(item) {
    if (typeof item !== 'object' ||
        Array.isArray(item) ||
        typeof item.icon !== 'string' ||
        typeof item.title !== 'string' ||
        item.icon === '' ||
        item.title === '') {
        return false;
    }
    return true;
}

export { isValidHobbieItem }