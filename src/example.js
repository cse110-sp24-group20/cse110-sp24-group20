/**
 * Represents a calculator.
 * @class
 */
class Calculator {
    /**
     * Create a calculator.
     * @constructor
     */
    constructor() {
        this.memory = 0;
    }

    /**
     * Adds two numbers together.
     * @param {number} a The first number.
     * @param {number} b The second number.
     * @returns {number} Sum of a and b.
     */
    add(a, b) {
        return a + b;
    }

    /**
     * Subtracts the second number from the first.
     * @param {number} a The first number.
     * @param {number} b The second number.
     * @returns {number} Difference between a and b.
     */
    subtract(a, b) {
        return a - b;
    }

    /**
     * Multiplies two numbers.
     * @param {number} a The first number.
     * @param {number} b The second number.
     * @returns {number} Product of a and b.
     */
    multiply(a, b) {
        return a * b;
    }

    /**
     * Divides the first number by the second.
     * @param {number} a The numerator.
     * @param {number} b The denominator.
     * @returns {number} Result of division.
     */
    divide(a, b) {
        if (b === 0) {
            throw new Error('Cannot divide by zero.');
        }
        return a / b;
    }

    /**
     * Stores a number in memory.
     * @param {number} value Number to store.
     */
    storeInMemory(value) {
        this.memory = value;
    }

    /**
     * Clears the memory.
     */
    clearMemory() {
        this.memory = 0;
    }

    /**
     * Retrieves the number stored in memory.
     * @returns {number} Number stored in memory.
     */
    getMemory() {
        return this.memory;
    }

    /**
     * Retrieves the number stored in Money.
     * @returns {number} Number stored in Money.
     */
    getMoney() {
        return this.memory;
    }
}

module.exports = Calculator;
