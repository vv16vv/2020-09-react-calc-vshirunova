import {parser} from "./parser";

describe("Parser should correctly recognize the correct line", () => {
    describe("line with one operation", () => {
        test("1 + 32", () => {
            expect(parser("1 + 32")).toEqual([1, "+", 32]);
        });

        test("1 - 32", () => {
            expect(parser("1 - 32")).toEqual([1, "-", 32]);
        });

        test("1 * 32", () => {
            expect(parser("1 * 32")).toEqual([1, "*", 32]);
        });

        test("1 / 32", () => {
            expect(parser("1 / 32")).toEqual([1, "/", 32]);
        });

        test("1 ^ 32", () => {
            expect(parser("1 ^ 32")).toEqual([1, "^", 32]);
        });

        test("** 2", () => {
            expect(parser("** 2")).toEqual(["**", 2]);
        });

        test("3 !", () => {
            expect(parser("3 !")).toEqual([3, "!"]);
        });

        test("fib 3", () => {
            expect(parser("fib 3")).toEqual(["fib", 3]);
        });

        test("sin 1", () => {
            expect(parser("sin 1")).toEqual(["sin", 1]);
        });

        test("cos 1", () => {
            expect(parser("cos 1")).toEqual(["cos", 1]);
        });
    });

    describe("line with several operations", () => {
        test("11 + 3 * 22", () => {
            expect(parser("11 + 3 * 22")).toEqual([11, "+", 3, "*", 22]);
        });

        test("1 + 32 - 2 + 2", () => {
            expect(parser("1 + 32 - 2 + 2")).toEqual([1, "+", 32, "-", 2, "+", 2]);
        });

        test("1 ! 33 - 2", () => {
            expect(parser("1 ! 33 - 2")).toEqual([1, "!", 33, "-", 2]);
        });

        test("1 ! + 33 - 2", () => {
            expect(parser("1 ! + 33 - 2")).toEqual([1, "!", "+", 33, "-", 2]);
        });

        test("1e3 + 32", () => {
            expect(parser("1e3 + 32")).toEqual([1e3, "+", 32]);
        });

        test("parser: 1 + + 33 - 2", () => {
            expect(parser("1 + + 33 - 2")).toEqual([1, "+", "+", 33, "-", 2]);
        });

        test("parser: 1 33", () => {
            expect(parser("1 33")).toEqual([1, 33]);
        });
    });
});

describe("Parser should fail if a token is not a number or is absent in the operator's list", () => {
    test("boolean value: true", () => {
        expect(() => parser("true")).toThrow(TypeError("Unexpected string"));
    });

    test("unsupported function: tan 1", () => {
        expect(() => parser("tan 1")).toThrow(TypeError("Unexpected string"));
    });
});
