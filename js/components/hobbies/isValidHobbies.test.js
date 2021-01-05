import { isValidHobbies } from "./isValidHobbies.js";

describe('Tikriname duomenu formata', () => {
    test('turi buti duodami parametrai', () => {
        expect(isValidHobbies()).toBeFalsy();
    })
    test('negali buti skaicius', () => {
        expect(isValidHobbies(54415)).toBeFalsy();
    })
    test('negali buti tekstas', () => {
        expect(isValidHobbies('')).toBeFalsy();
        expect(isValidHobbies('asd')).toBeFalsy();
    })
    test('negali buti boolean tipo', () => {
        expect(isValidHobbies(true)).toBeFalsy();
        expect(isValidHobbies(false)).toBeFalsy();
    })
    test('negali buti array tipo', () => {
        expect(isValidHobbies([])).toBeFalsy();
    })

    test('negali buti tuscias objektas', () => {
        expect(isValidHobbies({})).toBeFalsy();
    })
    test('objekto selecotr reiksme turi buti ne tuscias tekstas', () => {
        expect(isValidHobbies({ selector: 15 })).toBeFalsy();
        expect(isValidHobbies({ selector: '' })).toBeFalsy();
    })
    test('objekto data reiksme turi buti ne tuscias array', () => {
        expect(isValidHobbies({ selector: 'body', data: 15 })).toBeFalsy();
        expect(isValidHobbies({ selector: 'body', data: [] })).toBeFalsy();
    })
    test('objekto limit reiksme turi buti sveikasis skaicius', () => {
        expect(isValidHobbies({ selector: 'body', data: [{}], limit: 'asdf' })).toBeFalsy();
        expect(isValidHobbies({ selector: 'body', data: [{}], limit: 0 })).toBeFalsy();
        expect(isValidHobbies({ selector: 'body', data: [{}], limit: -10 })).toBeFalsy();
        expect(isValidHobbies({ selector: 'body', data: [{}], limit: 3.14 })).toBeFalsy();
        expect(isValidHobbies({ selector: 'body', data: [{}], limit: Infinity })).toBeFalsy();
        expect(isValidHobbies({ selector: 'body', data: [{}], limit: NaN })).toBeFalsy();
    })

    test('tinkamas formatas', () => {
        expect(isValidHobbies({ selector: 'body', data: [{}], limit: 12 })).toBeTruthy();
        expect(isValidHobbies({ selector: 'div > p', data: [{ icon: 'globe', title: 'Design' }], limit: 12 })).toBeTruthy();
    })
})