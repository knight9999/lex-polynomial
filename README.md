# Lex-Polynomial Library

This library provides classes to work with polynomials, monomials, and terms. The main classes included are `Polynomial`, `Monomial`, and `Term`.

## Installation

You can install this library by cloning the repository and importing the classes as needed.

```
npm install lex-polynoimal
```

## Usage

### Importing the Classes

```
import { Monomial, Term, Polynomial } from 'lex-polynomial'
```

### Creating Monomials

A Monomial represents a single term in a polynomial with variables and their respective powers.

```
const monomial = new Monomial({ x: 2, y: 1 });
console.log(monomial.toString()); // Outputs: x^2y
```

### Creating Terms

A Term consists of a coefficient and a Monomial.

```
const monomial = new Monomial({ x: 2, y: 1 });
const term = new Term(3, monomial);
console.log(term.toString()); // Outputs: 3x^2y
```

### Creating Polynomials

A `Polynomial` is a collection of `Term` objects.

```
const term1 = new Term(3, new Monomial({ x: 2, y: 1 }));
const term2 = new Term(-1, new Monomial({ y: 1 }));
const polynomial = new Polynomial([term1, term2]);
console.log(polynomial.toString()); // Outputs: 3x^2y-y
```

You can also create a `Polynomial` from a string representation:

```
const polynomial = new Polynomial("3x^2y - y");
console.log(polynomial.toString()); // Outputs: 3x^2y-y
```

### Operations on Polynomials

#### Addition

```
const poly1 = new Polynomial("3x^2y - y");
const poly2 = new Polynomial("x^2y + 2");
const sum = poly1.add(poly2);
console.log(sum.toString()); // Outputs: 4x^2y-y+2
```

#### Subtraction

```
const poly1 = new Polynomial("3x^2y - y");
const poly2 = new Polynomial("x^2y + 2");
const difference = poly1.sub(poly2);
console.log(difference.toString()); // Outputs: 2x^2y-y-2
```

#### Multiplication

```
const poly1 = new Polynomial("3x^2y - y");
const poly2 = new Polynomial("x + 1");
const product = poly1.multiplyPolynomial(poly2);
console.log(product.toString()); // Outputs: 3x^3y+3x^2y-yx-y
```

#### Division

```
const poly1 = new Polynomial("3x^2y - y");
const term = new Term(3, new Monomial({ x: 2 }));
const quotient = poly1.divideByTerm(term);
console.log(quotient.toString()); // Outputs: y - y/(3x^2)
```

### Class Methods

#### Monomial

- `getVarNames()`: Returns the sorted variable names.
- `getVariables()`: Returns the variables with their powers.
- `toString()`: Returns the string representation.
- `dividableByMonomial(mono)`: Checks if the monomial is divisible by another monomial.
- `compare(mono)`: Compares two monomials.
- `equal(mono)`: Checks if two monomials are equal.
- `static isSame(mono1, mono2)`: Static method to check if two monomials are the same.
- `static compare(mono1, mono2)`: Static method to compare two monomials.
- `static getGCD(mono1, mono2)`: Static method to get the GCD of two monomials.
- `static getLCM(mono1, mono2)`: Static method to get the LCM of two monomials.

#### Term

- `getCoefficient()`: Returns the coefficient.
- `getMonomial()`: Returns the monomial part.
- `getVarNames()`: Returns the variable names.
- `getVariables()`: Returns the variables.
- `toString()`: Returns the string representation.
- `getNonCoefficientPart()`: Returns the non-coefficient part as a monomial.
- `multiplyPolynomial(poly)`: Multiplies the term with a polynomial.
- `divideByMonomial(divisor)`: Divides the term by a monomial.
- `divideByTerm(divisor)`: Divides the term by another term.
- `static compare(term1, term2)`: Static method to compare two terms.

#### Polynomial

- `getLeadingTerm()`: Returns the leading term.
- `getLeadingCofficient()`: Returns the leading coefficient.
- `getLeadingMonomial()`: Returns the leading monomial.
- `getTerms()`: Returns the terms.
- `removeTerm(removeTerm)`: Removes a term.
- `negative()`: Returns the negation of the polynomial.
- `multiplyTerm(term)`: Multiplies the polynomial by a term.
- `divideByTerm(term)`: Divides the polynomial by a term.
- `multiplyPolynomial(poly)`: Multiplies the polynomial by another polynomial.
- `quotient(divisor)`: Returns the quotient of the polynomial division.
- `reminder(divisor)`: Returns the remainder of the polynomial division.
- `divideByPolynomial(divisor)`: Divides the polynomial by another polynomial.
- `clone()`: Clones the polynomial.
- `toString()`: Returns the string representation.
- `add(poly)`: Adds another polynomial.
- `sub(poly)`: Subtracts another polynomial.
- `static sum(poly1, poly2)`: Static method to sum two polynomials.
- `static createTermsFromString(polyString)`: Static method to create terms from a string.

