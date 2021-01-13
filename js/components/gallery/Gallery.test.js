import { Gallery } from './Gallery.js';

describe('Validuojame parametrus', () => {
    test('turetu grazinti false, jei parametrai yra ne objektas', () => {
        const gallery = new Gallery();
        expect(Object.keys(gallery).length).toBe(0);
    })

    test('turetu grazinti false, jei parametrai yra tuscias objektas', () => {
        const gallery = new Gallery({});
        expect(Object.keys(gallery).length).toBe(0);
    })

    test('turetu grazinti false, jei selector nera tekstinis', () => {
        const gallery = new Gallery();
        expect(gallery.isValidInput({ selector: 511 })).toBeFalsy();
        expect(gallery.isValidInput({ selector: true })).toBeFalsy();
        expect(gallery.isValidInput({ selector: false })).toBeFalsy();
        expect(gallery.isValidInput({ selector: [] })).toBeFalsy();
        expect(gallery.isValidInput({ selector: {} })).toBeFalsy();
    })

    test('turetu grazinti false, jei selector yra tuscias tekstas', () => {
        const gallery = new Gallery();
        expect(gallery.isValidInput({ selector: '' })).toBeFalsy();
    })

    test('turetu grazinti false, duomenys nera array', () => {
        const gallery = new Gallery();
        expect(gallery.isValidInput({
            selector: 'body'
        })).toBeFalsy();
        expect(gallery.isValidInput({
            selector: 'body',
            data: 15
        })).toBeFalsy();
        expect(gallery.isValidInput({
            selector: 'body',
            data: ''
        })).toBeFalsy();
        expect(gallery.isValidInput({
            selector: 'body',
            data: true
        })).toBeFalsy();
        expect(gallery.isValidInput({
            selector: 'body',
            data: false
        })).toBeFalsy();
        expect(gallery.isValidInput({
            selector: 'body',
            data: {}
        })).toBeFalsy();
    })

    test('turetu grazinti false, duomenys yra tuscias array', () => {
        const gallery = new Gallery();
        expect(gallery.isValidInput({
            selector: 'body',
            data: []
        })).toBeFalsy();
    })

    test('turetu grazinti ne tuscias objekta, kai duodami visi reikalingi parametrai ir parametru kiekis contructoriuje yra tinkamas', () => {
        const params = {
            selector: 'body',
            data: [{}]
        }
        const gallery = new Gallery(params);
        expect(gallery.isValidInput(params)).toBeTruthy();
        expect(Object.keys(gallery).length).toBe(8);
    })

    test('turetu grazinti false, jei duotas neegzistuojantis selector <h1>', () => {
        document.body.innerHTML = '';
        const params = {
            selector: 'h1',
            data: [{}]
        }
        const gallery = new Gallery(params);
        expect(gallery.isValidSelector()).toBeFalsy();
    })

    test('turetu grazinti false, jei duotas neegzistuojantis selector <div id="gallery">', () => {
        document.body.innerHTML = '<div id="gallery2"></div>';
        const params = {
            selector: '#gallery',
            data: [{}]
        }
        const gallery = new Gallery(params);
        expect(gallery.isValidSelector()).toBeFalsy();
    })

    test('turetu grazinti true, jei randa egzistuojanti selector <div id="gallery">', () => {
        document.body.innerHTML = '<div id="gallery"></div>';
        const params = {
            selector: '#gallery',
            data: [{}]
        }
        const gallery = new Gallery(params);
        expect(gallery.isValidSelector()).toBeTruthy();
    })

    test('turetu rasti DOM elementa, jei selector buvo teisingas', () => {
        document.body.innerHTML = '<div id="gallery"></div>';
        const params = {
            selector: '#gallery',
            data: [{}]
        }
        const gallery = new Gallery(params);
        expect(gallery.DOM).not.toBeNull();
    })

    test('turetu grazinti tuscia HTML teksta, jei duomenu sarasas yra netinkamo formato', () => {
        document.body.innerHTML = '<div id="gallery"></div>';
        const params = {
            selector: '#gallery',
            data: [{}]
        }
        const gallery = new Gallery(params);
        expect(gallery.render()).toBeFalsy();
    })

    test('turetu grazinti tuscia HTML teksta, jei galerijos objekto duomenu formatas yra netinkamas', () => {
        const gallery = new Gallery({
            selector: 'body',
            data: [{}]
        });
        expect(gallery.generateGalleryItem()).toBe('');
        expect(gallery.generateGalleryItem({})).toBe('');
        expect(gallery.generateGalleryItem({
            image: '1.jpg',
            title: 'The Usefulness',
            tags: ['web', 'design']
        })).not.toBe('');
    })

    test('turetu sugeneruoti turini, jei galerijos objekto duomenu formatas yra tinkamas', () => {
        document.body.innerHTML = '<div id="gallery"></div>';
        const params = {
            selector: '#gallery',
            data: [{
                image: '1.jpg',
                title: 'The Usefulness',
                tags: ['web', 'design']
            }]
        }
        const gallery = new Gallery(params);
        const generatedItemsCount = document.querySelectorAll('.gallery .item').length;
        expect(generatedItemsCount).toBe(1);
    })
})