import Monomial from './Monomial.js';

class Term {
    constructor(coefficient, mono) {
        this.coefficient = coefficient;
        this.mono = mono;
    }

    getCoefficient() {
        return this.coefficient;
    }

    getMonomial() {
        return this.mono;
    }

    getVarNames() {
        return this.mono.getVarNames();
    }

    getVariables() {
        return this.mono.getVariables();
    }

    toString() {
        const coe = this.getCoefficient();
        const variables = this.getVariables();
        const len = Object.keys(variables).length;
        let result = String(this.getCoefficient());
        if (len > 0) {
            if (coe == 1) {
                result = "";
            } else if (coe == -1) {
                result = "-";
            }
        }
        const varNames = this.getVarNames();
        for (const varName of varNames) {
            const power = variables[varName];
            if (power !== 0) {
                result += varName + (power === 1 ? '' : '^' + power);
            }
        }
        return result;
    }

    getCoefficient() {
        return this.coefficient;
    }

    getNonCoefficientPart() {
        return new Monomial({...this.variables});
    }

    multiplyPolynomial(poly) {
        return poly.multiplyTerm(this);
    }

    divideByMonomial(divisor) {
        const newVars = {};
        const varNames = this.mono.getVarNames();

        for (const varName of varNames) {
            const powerInDividend = this.mono.variables[varName] || 0;
            const powerInDivisor = divisor.variables[varName] || 0;

            if (powerInDivisor > powerInDividend) {
                throw new Error(`Cannot divide: the divisor has higher power of '${varName}' than the dividend.`);
            }

            const newPower = powerInDividend - powerInDivisor;
            if (newPower > 0) {
                newVars[varName] = newPower;
            } else if (newPower === 0) {
                delete newVars[varName];
            }
        }

        const newMonomial = new Monomial(newVars);
        return new Term(this.coefficient, newMonomial);
    }

    divideByTerm(divisor) {
        if (divisor.coefficient === 0) {
            throw new Error("Cannot divide by Term with a coefficient of zero.");
        }

        const resultMonomialTerm = this.divideByMonomial(divisor.mono);
        const newCoefficient = this.coefficient / divisor.coefficient;
        return new Term(newCoefficient, resultMonomialTerm.mono);
    }

    static compare(term1, term2) {
        return Monomial.compare(term1.getMonomial(), term2.getMonomial());
    }
}

export default Term;
