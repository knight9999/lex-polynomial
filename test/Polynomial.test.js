import { Monomial, Term, Polynomial } from '../index.js';

describe('Polynomial', () => {
    test('should correctly add polynomials', () => {
        const p1 = new Polynomial("2x^2+y-2");
        const p2 = new Polynomial("x^2+y+z+1");
        const result = p1.add(p2);
        expect(result.toString()).toEqual("3x^2+2y+z-1");
    });
    test('should correctly devide and get quotient', () => {
        const p1 = new Polynomial("2x^2+y-2");
        const p2 = new Polynomial("x^2+y+z+1");
        const result = p1.quotient(p2);
        expect(result.toString()).toEqual("2");
    });
    test('should correctly devide and get reminder', () => {
        const p1 = new Polynomial("2x^2+y-2");
        const p2 = new Polynomial("x^2+y+z+1");
        const result = p1.reminder(p2);
        expect(result.toString()).toEqual("-y-2z-4");
    });
    test('should correctly devide and zero', () => {
        const p1 = new Polynomial("2x^2+y-2");
        const p2 = new Polynomial("2x^2+y-2");
        const result = p1.divideByPolynomial(p2);
        expect(result[0].toString()).toEqual("1");
        expect(result[1].toString()).toEqual("0");
    });
});
