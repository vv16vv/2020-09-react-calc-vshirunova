import {mul, div, add, minus, power, square, factorial, sinus, cosinus, fibonacci} from "./mathOperators";

describe("operations should be calculated", () => {
    describe("multiplication", () => {
        test("mul 1 * 2 to equal 2", () => {
            expect(mul.fun(1, 2)).toBe(2);
        });

        test("mul 2 * 2 to equal 4", () => {
            expect(mul.fun(2, 2)).toBe(4);
        });
    });

    describe("division", () => {
        test("div 2 / 2 to equal 1", () => {
            expect(div.fun(2, 2)).toBe(1);
        });

        test("div 4 / 2 to equal 2", () => {
            expect(div.fun(4, 2)).toBe(2);
        });
    });

    describe("addition/subtraction", ()=> {

        test("add 4 + 2 to equal 6", () => {
            expect(add.fun(4, 2)).toBe(6);
        });

        test("minus 4 - 2 to equal 2", () => {
            expect(minus.fun(4, 2)).toBe(2);
        });
    });

    describe("power, including square", ()=> {
        test("power 4 ^ 3 to equal 64", () => {
            expect(power.fun(4, 3)).toBe(64);
        });

        test("power -4 ^ 3 to equal -64", () => {
            expect(power.fun(-4, 3)).toBe(-64);
        });

        test("power 4 ^ 0.5 to equal 2", () => {
            expect(power.fun(4, 0.5)).toBeCloseTo(2, 3);
        });

        test("power 2 ^ -2 to equal 0.25", () => {
            expect(power.fun(2, -2)).toBeCloseTo(0.25, 3);
        });

        test("square for 9 to equal 81", () => {
            expect(square.fun(9)).toBe(81);
        });

        test("square for -9 to equal 81", () => {
            expect(square.fun(-9)).toBe(81);
        });

        test("square for 0.1 to equal 0.01", () => {
            expect(square.fun(0.1)).toBeCloseTo(0.01);
        });
    });

    describe("factorial", () => {
        test("for 5 to equal 120", () => {
            expect(factorial.fun(5)).toBe(120);
        });

        test("for 1 to equal 1", () => {
            expect(factorial.fun(1)).toBe(1);
        });

        test("for 0 should be error", () => {
            expect(() => factorial.fun(0)).toThrowError(SyntaxError);
        });

        test("for -2 should be error", () => {
            expect(() => factorial.fun(-2)).toThrow(SyntaxError);
        });
    });

    describe("functions", () => {
        test("sinus for 0 to equal 0", () => {
            expect(sinus.fun(0)).toBeCloseTo(0, 3);
        });

        test("sinus for PI/2 to equal 1", () => {
            expect(sinus.fun(Math.PI / 2)).toBeCloseTo(1, 3);
        });

        test("cosinus for 0 to equal 1", () => {
            expect(cosinus.fun(0)).toBeCloseTo(1, 3);
        });

        test("cosinus for PI/2 to equal 0", () => {
            expect(cosinus.fun(Math.PI / 2)).toBeCloseTo(0, 3);
        });
    });

    describe("function fibonacci", () => {
        test("for 6 to equal 8", () => {
            expect(fibonacci.fun(6)).toBe(8);
        });

        test("for 5 to equal 5", () => {
            expect(fibonacci.fun(5)).toBe(5);
        });

        test("for 4 to equal 3", () => {
            expect(fibonacci.fun(4)).toBe(3);
        });

        test("for 3 to equal 2", () => {
            expect(fibonacci.fun(3)).toBe(2);
        });

        test("for 2 to equal 1", () => {
            expect(fibonacci.fun(2)).toBe(1);
        });

        test("for 1 to equal 1", () => {
            expect(fibonacci.fun(1)).toBe(1);
        });

        test("for 0 should be error", () => {
            expect(() => fibonacci.fun(0)).toThrow(SyntaxError);
        });

        test("for -2 should be error", () => {
            expect(() => fibonacci.fun(-2)).toThrow(SyntaxError);
        });
    });
});
