import { isValidHobbieItem } from "./isValidHobbieItem.js";

describe('Tikriname duomenu formata', () => {
    test('netinkamas formatas', () => {
        expect(isValidHobbieItem()).toBeFalsy();
        expect(isValidHobbieItem(true)).toBeFalsy();
        expect(isValidHobbieItem(false)).toBeFalsy();
        expect(isValidHobbieItem([])).toBeFalsy();
        expect(isValidHobbieItem({})).toBeFalsy();
    })

    test('netinkamas objekto raktazodziu tipas', () => {
        expect(isValidHobbieItem({ icon: 15, title: '' })).toBeFalsy();
        expect(isValidHobbieItem({ icon: '', title: 51 })).toBeFalsy();
        expect(isValidHobbieItem({ icon: '', title: '' })).toBeFalsy();
    })

    test('tinkamas objekto struktura', () => {
        expect(isValidHobbieItem({ icon: 'globe', title: 'Design' })).toBeTruthy();
        expect(isValidHobbieItem({ icon: 'linkedin', title: 'Development' })).toBeTruthy();
    })
})