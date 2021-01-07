import { Achievements } from './Achievements.js';

describe('Tikriname parametrus', () => {
    test('Nevalidu kai duodama be parametru', () => {
        const achievement = new Achievements();
        expect(achievement.init()).toBeFalsy();
    })
})