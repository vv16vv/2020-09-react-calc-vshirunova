import {
    parenthesisPrioritiesCalc,
    parLessExpressionCalc,
} from "./engine";

describe("Expressions without parenthesis should be calculated according to priorities", () => {
    test("highest priority at the begin: [5, !, + 6] -> 126", () => {
        expect(parLessExpressionCalc([5, "!", "+", 6])).toBe(126);
    });

    test("highest priority at the end: [1, +, 2, *, **3] -> 19 (1 + 2 * **3 -> 1 + 2 * 9 -> 1 + 18 -> 19)", () => {
        expect(parLessExpressionCalc([1, "+", 2, "*", "**", 3])).toBe(19);
    });

    test("highest priority at the middle: [1, +, 2, ^, 3 / 2] -> 19 (1 + 2 ^ 3 / 2 -> 1 + 8 / 2 -> 1 + 4 -> 5)", () => {
        expect(parLessExpressionCalc([1, "+", 2, "^", 3, "/", 2])).toBe(5);
    });

    test("function and unary prefix: [**, sin, 1] -> 19 (** sin 1 -> ** 0.841 -> 0.708)", () => {
        expect(parLessExpressionCalc(["**", "sin", 1])).toBeCloseTo(0.708, 3);
    });

    test("function and unary postfix: [fib, 4, !] -> 19 (fib 4 ! -> 3! -> 6)", () => {
        expect(parLessExpressionCalc(["fib", 4, "!"])).toBe(6);
    });

    test("function and binary: [sin, 1, +, cos, 1] -> 19 (sin 1 + cos 1 -> 0.841 + 0.540 -> 1.382)", () => {
        expect(parLessExpressionCalc(["sin", 1, "+", "cos", 1])).toBeCloseTo(1.382, 3);
    });
});

describe("Expressions with parenthesis should be calculated according to priorities", () => {
    test("parenthesis, changing the calculation order: [(, 1, +, 2, ), *, **, 3] -> 27 (( 1 + 2 ) * **3 -> 3 * **3 -> 3 * 9 -> 27)", () => {
        expect(parenthesisPrioritiesCalc(["(", 1, "+", 2, ")", "*", "**", 3])).toBe(27);
    });

    test("parenthesis at function: [fib, (, 2, *, 3, ), -, (, 1, +, 2, ), *, **3] -> -19 (fib(2*3) - (1+2)* **3 -> fib 6 - 3 * **3 -> 8 - 3 * **3 -> 8 - 3 * 9 -> 8 - 27 -> -19)", () => {
        expect(parenthesisPrioritiesCalc(["fib", "(", 2, "*", 3, ")", "-", "(", 1, "+", 2, ")", "*", "**", 3])).toBe(-19);
    });

    test("parenthesis + different priorities: [**,sin, (, PI, /, 4, ), +, **,cos, (, PI, /, 4, )] -> 1", () => {
        expect(parenthesisPrioritiesCalc(["**", "sin", "(", Math.PI, "/", 4, ")", "+", "**", "cos", "(", Math.PI, "/", 4, ")"])).toBeCloseTo(1, 3);
    });

    test("nested parenthesis: [4! / (1 + (**2 / 2 - 1) )] -> 4.8", () => {
        expect(parenthesisPrioritiesCalc([4, "!", "/", "(", 1, "+", "(", "**", 2, "/", "(", 2, "-", 1, ")", ")", ")"])).toBeCloseTo(4.8, 3);
    });
});
