import { isValidAchievementItem } from './isValidAchievementItem.js';

describe('Tikriname parametrus', () => {
    test('Nevalidu kai duodama be parametru', () => {
        expect(isValidAchievementItem()).toBeFalsy();
    })
})