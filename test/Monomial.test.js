import { Monomial } from '../index.js';

describe('Monomial', () => {
    test('should correctly create monomial', () => {
        const m1 = new Monomial({x:2, y:2});
        expect(m1.toString()).toEqual("x^2y^2");
    });
    
    test('should correctly dividable monomial', () => {
        const m1 = new Monomial({x:3, y:2});
        const m2 = new Monomial({x:2, y:1});
        expect(m1.dividableByMonomial(m2)).toBeTruthy();
    })
});
