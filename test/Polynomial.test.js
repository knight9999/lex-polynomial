import { Monomial, Term, Polynomial } from '../index.js';

describe('Polynomial', () => {
    test('should correctly add polynomials', () => {
        const p1 = new Polynomial("2x^2+y-2");
        const p2 = new Polynomial("x^2+y+z+1");
        const result = p1.add(p2);
        expect(result.toString()).toEqual("3x^2+2y+z-1");
    });
});
