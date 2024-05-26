import Monomial from './Monomial.js';
import Term from './Term.js';

class Polynomial {
    constructor(terms) {
        if (typeof terms === 'string' || terms instanceof String) {
            terms = Polynomial.createTermsFromString(terms);
        }
        const nonZeroTerms = terms.filter((term) => term.getCoefficient() != 0);
        this.terms = [...nonZeroTerms].sort(Term.compare);
    }

    getLeadingTerm() {
        if (this.terms.length >= 1) {
            return this.terms[0];
        }
        return null;
    }

    getLeadingCofficient() {
        if (this.terms.length >= 1) {
            return this.terms[0].getCoefficient();
        }
        return 0;
    }

    getLeadingMonomial() {
        if (this.terms.length >= 1) {
            return this.terms[0].getMonomial();
        }
        return null;
    }

    getTerms() {
        return this.terms;
    }

    removeTerm(removeTerm) {
        const terms = this.terms.filter((term) => ! term === removeTerm);
        return new Polynomial(terms);
    }

    negative() {
        const negatedTerms = this.terms.map(term => new Term(-term.coefficient, new Monomial({...term.mono.variables})));
        return new Polynomial(negatedTerms);
    }

    multiplyTerm(term) {
        const newTerms = this.terms.map(polyTerm => {
            const newCoefficient = polyTerm.coefficient * term.coefficient;
            
            const newVariables = {...polyTerm.mono.variables};
            for (const [varName, power] of Object.entries(term.mono.variables)) {
                newVariables[varName] = (newVariables[varName] || 0) + power;
            }
            const newMonomial = new Monomial(newVariables);
            
            return new Term(newCoefficient, newMonomial);
        });
        
        return new Polynomial(newTerms);
    }

    divideByTerm(term) {
        if (term.coefficient === 0) {
            throw new Error("Cannot divide by zero.");
        }

        const newTerms = [];
        for (const polyTerm of this.terms) {
            try {
                const newTerm = polyTerm.divideByTerm(term);
                newTerms.push(newTerm);
            } catch (error) {
                throw new Error(`Cannot divide: ${error.message}`);
            }
        }

        return new Polynomial(newTerms);
    }

    multiplyPolynomial(poly) {
        let result = new Polynomial([]);
        const terms = poly.getTerms();
        for (let i=0; i < terms.length; i++) {
            const term = terms[i];
            result = result.add(this.multiplyTerm(term));
        }
        return result;
    }

    quotient(divisor) {
        const [q, r] = this.divideByPolynomial(divisor);
        return q;
    }

    reminder(divisor) {
        const [q, r] = this.divideByPolynomial(divisor);
        return r;
    }

    divideByPolynomial(divisor) {
        let reminder = this.clone();
        let quotient = new Polynomial([]);

        while (true) {
            let lt = reminder.getLeadingTerm();
            if (lt == null) {
                return [new Polynomial([]), new Polynomial([])];
            }
            let dlt = divisor.getLeadingTerm();
            if (dlt == null) {
                throw new Error(`Cannot divide by Polynomial of zero.`);
            }
            if (! lt.getMonomial().dividableByMonomial(dlt.getMonomial())) {
                return [quotient, reminder];
            }
            let dt = lt.divideByTerm(dlt);
            quotient = quotient.add(new Polynomial([dt]));
            reminder = reminder.sub(dt.multiplyPolynomial(divisor));
            if (reminder == 0) {
                return [quotient, reminder];
            }
        }
    }

    clone() {
        return new Polynomial([...this.terms]);
    }

    toString() {
        let flagLeading = true;
        let result = "";
        if (this.terms.length == 0) {
            return "0";
        }
        for (const term of this.terms) {
            if (term.getCoefficient()>0 && ! flagLeading) {
                result += "+" + term.toString();
            } else {
                result += term.toString();
            }
            flagLeading = false;
        }
        return result;
    }
    
    add(poly) {
        return Polynomial.sum(this, poly); 
    }

    sub(poly) {
        const negatedPoly = poly.negative();
        return Polynomial.sum(this, negatedPoly);
    }

    static sum(poly1, poly2) {
        const allTerms = [...poly1.terms, ...poly2.terms];
        
        allTerms.sort((term1, term2) => Term.compare(term1, term2));

        const combinedTerms = [];
        for (let term of allTerms) {
            if (combinedTerms.length > 0 && Term.compare(term, combinedTerms[combinedTerms.length - 1]) === 0) {
                combinedTerms[combinedTerms.length - 1].coefficient += term.coefficient;
            } else {
                combinedTerms.push(new Term(term.coefficient, new Monomial({...term.mono.variables})));
            }
        }

        const resultTerms = combinedTerms.filter(term => term.coefficient !== 0);

        return new Polynomial(resultTerms);
    }

    static createTermsFromString(polyString) {
        const terms = [];
        const termRegex = /\s*([-+]?\s*[\d.]*)([a-z^0-9]*)/g;
        let match;
        while ((match = termRegex.exec(polyString)) !== null && match.index < polyString.length) {
            const coefficientPart = match[1].trim().replace(/\s+/g, '');
            const variablePart = match[2];
            const coefficient = coefficientPart === '+' || coefficientPart === '' ? 1 : coefficientPart === '-' ? -1 : Number(coefficientPart);
            const variables = {};

            const varRegex = /([a-z])\^?(\d*)/g;
            let varMatch;
            while ((varMatch = varRegex.exec(variablePart)) !== null) {
                const varName = varMatch[1];
                const power = varMatch[2] === '' ? 1 : parseInt(varMatch[2]);
                variables[varName] = power;
            }

            terms.push(new Term(coefficient, new Monomial(variables)));
        }

        return terms;
    }
}

export default Polynomial;

