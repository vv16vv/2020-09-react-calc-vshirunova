import {unaryPostPrioritiesCalc, unaryPrePrioritiesCalc,} from "./engine";
import {MathPriorities} from "./mathOperators";

describe("unary operations should be calculated", () => {
    test("function - sinus: [sin, 0] -> [0]", () => {
        expect(unaryPrePrioritiesCalc(MathPriorities.FUNCTIONS, ["sin", 0])).toEqual([0]);
    });

    test("function - cosinus: [cos, 0] -> [1]", () => {
        expect(unaryPrePrioritiesCalc(MathPriorities.FUNCTIONS, ["cos", 0])).toEqual([1]);
    });

    test("function - fibonacci: [fib, 5] -> [5]", () => {
        expect(unaryPrePrioritiesCalc(MathPriorities.FUNCTIONS, ["fib", 5])).toEqual([5]);
    });

    test("prefix - square: [**, 5] -> [25]", () => {
        expect(unaryPrePrioritiesCalc(MathPriorities.UNARY_PRE, ["**", 5])).toEqual([25]);
    });

    test("postfix - factorial: [5, !] -> [120]", () => {
        expect(unaryPostPrioritiesCalc(MathPriorities.UNARY_POST, [5, "!"])).toEqual([120]);
    });

});

describe("unary operations, several different priorities, should be calculated only required", () => {
    test("square: [2, *, **, 5] -> [2, *, 25]", () => {
        expect(unaryPrePrioritiesCalc(MathPriorities.UNARY_PRE, [2, "*", "**", 5])).toEqual([2, "*", 25]);
    });

    test("function: [2, +, fib, 5] -> [2, +, 5]", () => {
        expect(unaryPrePrioritiesCalc(MathPriorities.FUNCTIONS, [2, "+", "fib", 5])).toEqual([2, "+", 5]);
    });

    test("factorial: [2, !, +, 3, !] -> [2, +, 6]", () => {
        expect(unaryPostPrioritiesCalc(MathPriorities.UNARY_POST, [2, "!", "+", 3, "!"])).toEqual([2, "+", 6]);
    });
});

describe("unary prefix operations, several the same priorities, should be calculated all from right to left", () => {
    test("square: [**, **, 2] -> [16] (** ** 2 -> ** 4 -> 16)", () => {
        expect(unaryPrePrioritiesCalc(MathPriorities.UNARY_PRE, ["**", "**", 2])).toEqual([16]);
    });

    test("square: [**, **, **, 2] -> [256] (** ** ** 2 -> ** ** 4 -> ** 16 -> 256)", () => {
        expect(unaryPrePrioritiesCalc(MathPriorities.UNARY_PRE, ["**", "**", "**", 2])).toEqual([256]);
    });

    test("function: [fib, fib, 4] -> [2] (fib fib 4 -> fib 3 -> 2)", () => {
        expect(unaryPrePrioritiesCalc(MathPriorities.FUNCTIONS, ["fib", "fib", 4])).toEqual([2]);
    });
});

describe("unary postfix operations, several the same priorities, should be calculated all from left to right", () => {
    test("factorial: [3, !, !] -> [720] (3!! -> 6! -> 720)", () => {
        expect(unaryPostPrioritiesCalc(MathPriorities.UNARY_POST, [3, "!", "!"])).toEqual([720]);
    });
});
