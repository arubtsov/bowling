import { Roll, Rolls } from "../types";

function isStrike (
    rolls: Rolls
): boolean {
    return rolls[0] === 10;
}

function isSpare (
    rolls: Rolls
): boolean {
    return rolls[0] !== null && rolls[1] !== null &&
        rolls[0] + rolls[1] === 10;
}

function isDone(
    roll: Roll
) {
    return roll !== null;
}

export { isStrike, isSpare, isDone }
