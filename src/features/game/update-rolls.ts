import { Rolls } from '../../types';
import { sum } from '../../utils/array';

function updateRolls (
    frameIndex: number,
    rollIndex: number,
    roll: number,
    rolls: Rolls
) {
    rolls[rollIndex] = roll;

    if (rollIndex === 0) {
        if (frameIndex === 9) {
            if (roll === 10 && rolls.length === 2)
                rolls.push(null);
            else if (roll < 10) {
                if (rolls.length === 3)
                    rolls.pop();

                if (sum(rolls) > 10)
                    rolls[1] = null;
            }
        }
        else if (roll === 10)
            rolls[1] = 0;
        else if (rolls[1] !== null && roll + rolls[1] > 10)
            rolls[1] = null;
    }
}

export { updateRolls };
