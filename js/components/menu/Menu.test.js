import { Menu } from './Menu.js';

describe('Is valid selector', () => {
    test('is invalid if number is given', () => {
        const menu = new Menu({
            selector: 845
        });
        expect(menu.isValidSelector()).toBeFalsy();
    })

    test('is invalid if array is given', () => {
        const menu = new Menu({
            selector: []
        });
        expect(menu.isValidSelector()).toBeFalsy();
    })

    test('is invalid if object is given', () => {
        const menu = new Menu({
            selector: {}
        });
        expect(menu.isValidSelector()).toBeFalsy();
    })

    test('is invalid if boolean is given', () => {
        const menu = new Menu({
            selector: true
        });
        expect(menu.isValidSelector()).toBeFalsy();
    })

    test('is invalid if empty string is given', () => {
        const menu = new Menu({
            selector: ''
        });
        expect(menu.isValidSelector()).toBeFalsy();
    })
})

describe('generates valid HTML for a menu link', () => {
    test('is invalid link object', () => {
        const menu = new Menu({ selector: '', structure: [] });
        expect(menu.generateHTML(123)).toBe('');
        expect(menu.generateHTML(true)).toBe('');
    })

    test('is valid Home link', () => {
        const menu = new Menu({ selector: '', structure: [] });
        expect(menu.generateHTML({ title: 'Home', href: 123 })).toBe('');
        expect(menu.generateHTML({ title: 123, href: '/' })).toBe('');
        expect(menu.generateHTML({ title: 'Home' })).toBe('');
        expect(menu.generateHTML({ href: '/' })).toBe('');
        expect(menu.generateHTML({ title: 'Home', href: '' })).toBe('');
        expect(menu.generateHTML({ title: '', href: '/' })).toBe('');
        expect(menu.generateHTML({ title: 'Home', href: '/' })).toBe('<a href="/" class="active">Home</a>');
    })

    test('is valid Inner page link', () => {
        const menu = new Menu({ selector: '', structure: [] });
        expect(menu.generateHTML({ title: 'Services', href: '/services' })).toBe('<a href="/services" class="">Services</a>');
    })
})