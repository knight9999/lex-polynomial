class Monomial {
    constructor(variables) {
        this.variables = variables;
    }

    getVarNames() {
        const keysSorted = Object.keys(this.variables).sort();
        return keysSorted;
    }

    getVariables() {
        return this.variables;
    }

    toString() {
        let result = "";
        const varNames = this.getVarNames();
        for (const varName of varNames) {
            const power = this.variables[varName];
            if (power !== 0) {
                result += varName + (power === 1 ? '' : '^' + power);
            }
        }
        return result;
    }

    dividableByMonomial(mono) {
        const varNames = mono.getVarNames();
        for (const varName of varNames) {
            const powerInDividend = this.variables[varName] || 0;
            const powerInDivisor = mono.variables[varName] || 0;
            if (powerInDividend < powerInDivisor) {
                return false;
            }
        }
        return true;
    }

    compare(mono) {
        return Monomial.compare(this, mono);
    }

    equal(mono) {
        return Monomial.isSame(this, mono);
    }

    static isSame(mono1, mono2) {
        return Monomial.compare(mono1, mono2) === 0;
    }

    static compare(mono1, mono2) {
        const keys1 = mono1.getVarNames();
        const keys2 = mono2.getVarNames();
        const maxLength = Math.max(keys1.length, keys2.length);
        
        for (let i = 0; i < maxLength; i++) {
            const key1 = keys1[i] || "";
            const key2 = keys2[i] || "";
            const power1 = mono1.variables[key1] || 0;
            const power2 = mono2.variables[key2] || 0;
            
            if (key1 !== key2) {
                if (key1.length == 0) {
                    return 1;
                }
                if (key2.length == 0) {
                    return -1;
                }
                return key1.localeCompare(key2);
            }
            if (power1 !== power2) {
                return power1 > power2 ? -1 : +1;
            }
        }
        
        return 0;
    }

    static getGCD(mono1, mono2) {
        const commonVars = {};
        const keys1 = Object.keys(mono1.variables);
        for (const key of keys1) {
            if (mono2.variables.hasOwnProperty(key)) {
                const minPower = Math.min(mono1.variables[key], mono2.variables[key]);
                if (minPower > 0) {
                    commonVars[key] = minPower;
                }
            }
        }
        return new Monomial(commonVars);
    }

    static getLCM(mono1, mono2) {
        const lcmVars = {};
        const allKeys = new Set([...Object.keys(mono1.variables), ...Object.keys(mono2.variables)]);
        for (const key of allKeys) {
            const power1 = mono1.variables[key] || 0;
            const power2 = mono2.variables[key] || 0;
            const maxPower = Math.max(power1, power2);
            if (maxPower > 0) {
                lcmVars[key] = maxPower;
            }
        }
        return new Monomial(lcmVars);
    }

}

export default Monomial;
