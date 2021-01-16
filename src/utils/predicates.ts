import { Attempts } from "../types";

function isStrike (
    attempts: Attempts
): boolean {
    return attempts[0] === 10;
}

export { isStrike }
