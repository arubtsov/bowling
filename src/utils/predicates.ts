import { Rolls } from "../types";

function isStrike (
    rolls: Rolls
): boolean {
    return rolls[0] === 10;
}

function isSpare (
    rolls: Rolls
): boolean {
    return typeof rolls[0] !== 'undefined' &&
        typeof rolls[1] !== 'undefined' &&
        rolls[0] + rolls[1] === 10;
}

export { isStrike, isSpare }
