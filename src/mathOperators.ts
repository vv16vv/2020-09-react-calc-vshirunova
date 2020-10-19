export type BinaryOperationType = (first: number, second: number) => number;
export type UnaryOperationType = (param: number) => number;

export enum OperationKind {
    UnaryPrefix,
    UnaryPostfix,
    Binary
}

export enum MathPriorities {
    PARENTHESIS = 7,
    FUNCTIONS = 6,
    UNARY_PRE = 5,
    UNARY_POST = 4,
    BINARY_3 = 3,
    BINARY_2 = 2,
    BINARY_1 = 1,
}

export type PreUnaryOperations = MathPriorities.FUNCTIONS | MathPriorities.UNARY_PRE;
export type PostUnaryOperations = MathPriorities.UNARY_POST;
export type BinaryOperations = MathPriorities.BINARY_3 | MathPriorities.BINARY_2 | MathPriorities.BINARY_1;

export interface Operation<T> {
    kind: OperationKind;
    priority: MathPriorities;
    sign: string;
    fun: T,
}

export const mul: Operation<BinaryOperationType> = {
    kind: OperationKind.Binary,
    priority: MathPriorities.BINARY_2,
    sign: "*",
    fun: (
        first: number,
        second: number
    ): number => first * second
}

export const div: Operation<BinaryOperationType> = {
    kind: OperationKind.Binary,
    priority: MathPriorities.BINARY_2,
    sign: "/",
    fun: (
        first: number,
        second: number
    ): number => first / second
}

export const add: Operation<BinaryOperationType> = {
    kind: OperationKind.Binary,
    priority: MathPriorities.BINARY_1,
    sign: "+",
    fun: (
        first: number,
        second: number
    ): number => first + second
}

export const minus: Operation<BinaryOperationType> = {
    kind: OperationKind.Binary,
    priority: MathPriorities.BINARY_1,
    sign: "-",
    fun: (
        first: number,
        second: number
    ): number => first - second
}

export const power: Operation<BinaryOperationType> = {
    kind: OperationKind.Binary,
    priority: MathPriorities.BINARY_3,
    sign: "^",
    fun: (
        first: number,
        second: number
    ): number => first ** second
}

export const square: Operation<UnaryOperationType> = {
    kind: OperationKind.UnaryPrefix,
    priority: MathPriorities.UNARY_PRE,
    sign: "**",
    fun: param => param * param
}

export const factorial: Operation<UnaryOperationType> = {
    kind: OperationKind.UnaryPostfix,
    priority: MathPriorities.UNARY_POST,
    sign: "!",
    fun: param => calcFactorial(param)
}

const calcFactorial = (n: number): number => {
    if (n <= 0 || isNaN(n)) throw new SyntaxError(`Cannot calculate factorial for ${n}`)
    if (n === 1) return 1;
    return n * calcFactorial(n - 1);
}

export const sinus: Operation<UnaryOperationType> = {
    kind: OperationKind.UnaryPrefix,
    priority: MathPriorities.FUNCTIONS,
    sign: "sin",
    fun: param => Math.sin(param)
}

export const cosinus: Operation<UnaryOperationType> = {
    kind: OperationKind.UnaryPrefix,
    priority: MathPriorities.FUNCTIONS,
    sign: "cos",
    fun: param => Math.cos(param)
}

export const fibonacci: Operation<UnaryOperationType> = {
    kind: OperationKind.UnaryPrefix,
    priority: MathPriorities.FUNCTIONS,
    sign: "fib",
    fun: param => calcFibonacci(param)
}

const calcFibonacci = (n: number): number => {
    if (n <= 0) throw new SyntaxError(`Cannot calculate fibonacci number for ${n}`)
    if (n <= 2) return 1;
    return calcFibonacci(n - 1) + calcFibonacci(n - 2);
}

export const mathOperators: { [key: string]: Operation<BinaryOperationType | UnaryOperationType> } = {
    [mul.sign]: mul,
    [div.sign]: div,
    [add.sign]: add,
    [minus.sign]: minus,
    [power.sign]: power,
    [square.sign]: square,
    [factorial.sign]: factorial,
    [sinus.sign]: sinus,
    [cosinus.sign]: cosinus,
    [fibonacci.sign]: fibonacci,
};
