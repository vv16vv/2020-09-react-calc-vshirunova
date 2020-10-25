import {binaryPrioritiesCalc} from "./engine";
import {MathPriorities} from "./mathOperators";

describe("binaries operations should be calculated", () => {
    test("power: [2, ^, 3]", () => {
        expect(binaryPrioritiesCalc(MathPriorities.BINARY_3, [2, "^", 3])).toEqual([8]);
    });

    test("multiplication: [2, *, 3]", () => {
        expect(binaryPrioritiesCalc(MathPriorities.BINARY_2, [2, "*", 3])).toEqual([6]);
    });

    test("division: [6, /, 3]", () => {
        expect(binaryPrioritiesCalc(MathPriorities.BINARY_2, [6, "/", 3])).toEqual([2]);
    });

    test("addition: [2, +, 3]", () => {
        expect(binaryPrioritiesCalc(MathPriorities.BINARY_1, [2, "+", 3])).toEqual([5]);
    });

    test("subtraction: [2, -, 3]", () => {
        expect(binaryPrioritiesCalc(MathPriorities.BINARY_1, [2, "-", 3])).toEqual([-1]);
    });
});

describe("binaries operations, several different priorities, should be calculated only required", () => {
    test("power: [2, ^, 3, *, 4]", () => {
        expect(binaryPrioritiesCalc(MathPriorities.BINARY_3, [2, "^", 3, "*", 4])).toEqual([8, "*", 4]);
    });

    test("multiplication : [2, -, 3, *, 4]", () => {
        expect(binaryPrioritiesCalc(MathPriorities.BINARY_2, [2, "-", 3, "*", 4])).toEqual([2, "-", 12]);
    });

    test("subtraction : [2, -, 3, *, 4]", () => {
        expect(binaryPrioritiesCalc(MathPriorities.BINARY_1, [2, "-", 3, "*", 4])).toEqual([-1, "*", 4]);
    });
});

describe("binaries operations, several the same priorities, should be calculated all from left to right", () => {
    test("power: [2, ^, 3, ^, 2]", () => {
        expect(binaryPrioritiesCalc(MathPriorities.BINARY_3, [2, "^", 3, "^", 2])).toEqual([64]);
    });

    test("mul/div: [2, *, 3, /, 2]", () => {
        expect(binaryPrioritiesCalc(MathPriorities.BINARY_2, [2, "*", 3, "/", 2])).toEqual([3]);
    });

    test("add/sub: [25, -, 13, +, 2]", () => {
        expect(binaryPrioritiesCalc(MathPriorities.BINARY_1, [25, "-", 13, "+", 2])).toEqual([14]);
    });
});
