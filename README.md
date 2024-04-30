# Lex Order multi variable polynomial

## Examples

```
const m1 = new Monomial({x: 2, y: 1}); // m1 = x^2 y
console.log(m1.toString()); // x^2y

const t1 = new Term(4, m1); // t1 = 4 x^2 y
console.log(t1.toString()); // 4x^2y

const p1 = new Polynomial("x^3+x y^2 + z + 4");
console.log(p1.toString()); // x^3+x+y^2+z+4

const p2 = new Polynomial("z^2 - z + 3");
console.log(p2.toString()); // z^2-z+3

const p3 = p1.add(p2);
console.log(p3.toString()); // x^3+x+y^2+z^2+7

const lm1 = p3.getLeadingMonomial(); // Leading Monomial of p3 (Lex order)
console.log(lm1.toString()); // x^3

const gcd = Monomial.getGCD(m1, lm1); // GCD of m1 and lm1
console.log(gcd.toString()); // x^3y

const lcm = Monomial.getLCM(m1, lm1); // LCM of m1 and lm1
console.log(lcm.toString()); // x^2
```

