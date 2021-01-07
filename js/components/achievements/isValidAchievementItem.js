function isValidAchievementItem(item) {
    if (typeof item !== 'object' ||
        Array.isArray(item) ||
        Object.keys(item).length !== 3) {
        return false;
    }
    if (typeof item.icon !== 'string' ||
        item.icon === '') {
        return false;
    }
    if (typeof item.label !== 'string' ||
        item.label === '') {
        return false;
    }
    if (typeof item.number !== 'number' ||
        !isFinite(item.number) ||
        item.number < 1 ||
        item.number % 1 !== 0) {
        return false;
    }
    return true;
}

export { isValidAchievementItem }