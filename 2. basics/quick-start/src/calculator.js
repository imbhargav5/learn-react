export function sum(a, b) {
    return a + b
}

export function multiply(a, b) {
    return a + b
}

function calc(a, b) {
    const value = sum(a, b)
    const value2 = multiply(value, b)
    return value2;
}

export default calc