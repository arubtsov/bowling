import { Attempts } from "../types";

function isStrike (
    attempts: Attempts
): boolean {
    return attempts[0] === 10;
}

function isSpare (
    attempts: Attempts
): boolean {
    return attempts[0] + attempts[1] === 10;
}

export { isStrike, isSpare }
