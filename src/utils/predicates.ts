import { Attempts } from "../types";

function isStrike (
    attempts: Attempts
): boolean {
    return attempts[0] === 10;
}

function isSpare (
    attempts: Attempts
): boolean {
    return typeof attempts[0] !== 'undefined' &&
        typeof attempts[1] !== 'undefined' &&
        attempts[0] + attempts[1] === 10;
}

export { isStrike, isSpare }
