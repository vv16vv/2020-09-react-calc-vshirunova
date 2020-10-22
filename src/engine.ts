import {ParsedLineType} from "./parser";
import {isNumber} from "./helpers";
import {
    BinaryOperations,
    BinaryOperationType,
    mathOperators,
    MathPriorities,
    Operation,
    PostUnaryOperations,
    PreUnaryOperations,
    UnaryOperationType
} from "./mathOperators";

const isOperator = (item: string | number, priority: MathPriorities): boolean => {
    return !isNumber(String(item)) && mathOperators[item]?.priority === priority
}

export const binaryPrioritiesCalc = (priority: BinaryOperations, stack: ParsedLineType): ParsedLineType => {
    let result: ParsedLineType = [];

    for (let key = 0; key < stack.length; key++) {
        const prevItem = result[result.length - 2];
        const item = result[result.length - 1];
        const nextItem = stack[key];

        if (isOperator(item, priority)) {
            const fun = (mathOperators[item] as Operation<BinaryOperationType>).fun
            result = [
                ...result.slice(0, -2),
                fun(Number(prevItem), Number(nextItem)),
            ];
        } else {
            result.push(nextItem);
        }
    }

    return result;
};

export const unaryPrePrioritiesCalc = (priority: PreUnaryOperations, stack: ParsedLineType): ParsedLineType => {
    let result: ParsedLineType = [];

    for (let key = 0; key < stack.length; key++) {
        const op = result[result.length - 1];
        const item = stack[key];

        if (isOperator(op, priority) && isNumber(String(item))) {
            const fun = (mathOperators[op] as Operation<UnaryOperationType>).fun;
            result.splice(-1, 1, fun(Number(item)));
            while (result.length > 1 && isOperator(result[result.length - 2], priority)) {
                const stepBackFun = (mathOperators[result[result.length - 2]] as Operation<UnaryOperationType>).fun;
                const stepBackParam = result[result.length - 1];
                result.splice(-2, 2, stepBackFun(Number(stepBackParam)))
            }
        } else {
            result.push(item);
        }
    }

    return result;
};

export const unaryPostPrioritiesCalc = (priority: PostUnaryOperations, stack: ParsedLineType): ParsedLineType => {
    let result: ParsedLineType = [];

    for (let key = 0; key < stack.length; key++) {
        const item = result[result.length - 1];
        const op = stack[key];

        if (isOperator(op, priority)) {
            const fun = (mathOperators[op] as Operation<UnaryOperationType>).fun
            result = [
                ...result.slice(0, -1),
                fun(Number(item)),
            ];
        } else {
            result.push(op);
        }
    }

    return result;
};

export const parLessExpressionCalc = (stack: ParsedLineType): number => {
    // TODO: how to avoid duplicating explicit enumeration here?
    const preUnaries: Array<PreUnaryOperations> = [MathPriorities.FUNCTIONS, MathPriorities.UNARY_PRE];
    const postUnaries: Array<PostUnaryOperations> = [MathPriorities.UNARY_POST];
    const binaries: Array<BinaryOperations> = [MathPriorities.BINARY_3, MathPriorities.BINARY_2, MathPriorities.BINARY_1];

    let result = stack;

    for (let priority of preUnaries) {
        result = unaryPrePrioritiesCalc(priority, result);
        if (result.length === 1) return Number(result[0]);
    }

    for (let priority of postUnaries) {
        result = unaryPostPrioritiesCalc(priority, result);
        if (result.length === 1) return Number(result[0]);
    }

    for (let priority of binaries) {
        result = binaryPrioritiesCalc(priority, result);
        if (result.length === 1) return Number(result[0]);
    }

    throw Error("Cannot calculate the expression")

}

export const parenthesisPrioritiesCalc = (stack: ParsedLineType): number => {
    let result: ParsedLineType = [];

    const openPar = "(";
    const closePar = ")";

    let openPars = [];

    for (let key = 0; key < stack.length; key++) {
        const item = stack[key];

        switch (item) {
            case openPar: {
                openPars.push(result.length);
                result.push(item);
                break;
            }
            case closePar: {
                if (openPars.length === 0) throw SyntaxError("Incorrect parenthesis");
                const pairedOpenPar = openPars.pop();
                const innerExpr = result.slice(pairedOpenPar + 1);
                result[pairedOpenPar] = parLessExpressionCalc(innerExpr);
                result.length = pairedOpenPar + 1;
                break;
            }
            default:
                result.push(item);
        }

    }

    if (result.length === 1) return Number(result[0]);
    else if (result.length > 0) return parLessExpressionCalc(result);
    throw SyntaxError("Incorrect expression");
};
