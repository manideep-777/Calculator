export function calculate(expression) {
    const tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/|\^|\(|\))/g);
    if (!tokens) return "Invalid Input";

    const precedence = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3 };
    const isLeftAssociative = { "+": true, "-": true, "*": true, "/": true, "^": false };

    const outputQueue = [];
    const operatorStack = [];

    tokens.forEach((token) => {
        if (!isNaN(token)) {
            outputQueue.push(Number(token));
        } else if (token in precedence) {
            while (
                operatorStack.length &&
                precedence[operatorStack[operatorStack.length - 1]] >= precedence[token] &&
                isLeftAssociative[token]
            ) {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(token);
        } else if (token === "(") {
            operatorStack.push(token);
        } else if (token === ")") {
            while (operatorStack.length && operatorStack[operatorStack.length - 1] !== "(") {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.pop();
        }
    });

    while (operatorStack.length) {
        outputQueue.push(operatorStack.pop());
    }

    const evaluationStack = [];
    for (const token of outputQueue) {
        if (typeof token === "number") {
            evaluationStack.push(token);
        } else {
            const b = evaluationStack.pop();
            const a = evaluationStack.pop();

            if (token === "/" && b === 0) {
                return "Error: Division by zero";
            }

            switch (token) {
                case "+": evaluationStack.push(a + b); break;
                case "-": evaluationStack.push(a - b); break;
                case "*": evaluationStack.push(a * b); break;
                case "/": evaluationStack.push(a / b); break;
                case "^": evaluationStack.push(a ** b); break;
                default: return "Error: Invalid operation";
            }
        }
    }

    return evaluationStack[0]?.toString() || "Invalid Input";
}
