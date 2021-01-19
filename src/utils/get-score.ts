import { Frame } from '../types';
import { isStrike, isSpare } from './predicates';
import { sum } from './array';

function getFrameScore (
    playerName: string,
    frames: Frame[],
    index: number
): number {
    const rolls = frames[index].rollsMap[playerName];
    let score = sum(rolls);

    if (isStrike(rolls)) {
        const isLastButOne = index === 8;
        let rollsToAdd = 2;

        for (const nextFrame of [frames[index + 1], frames[index + 2]]) {
            if (nextFrame && rollsToAdd) {
                const nextFrameRolls = nextFrame.rollsMap[playerName];

                if (isLastButOne) {
                    rollsToAdd -= 2;
                    score += sum(nextFrameRolls.slice(0, 2));
                }
                else if (isStrike(nextFrameRolls)) {
                    rollsToAdd -= 1;

                    if (nextFrameRolls[0])
                        score += nextFrameRolls[0];
                }
                else {
                    rollsToAdd -= 2;
                    score += sum(nextFrameRolls);
                }
            }
        }
    }
    else if (isSpare(rolls)) {
        const nextFrame = frames[index + 1];

        if (nextFrame) {
            const rolls = nextFrame.rollsMap[playerName];

            if (rolls[0])
                score += rolls[0];
        }
    }

    return score;
}


function getScore (
    playerName: string,
    frames: Frame[],
    end: number = frames.length
): number {
    let score = 0;

    for (let index = 0; index < end; index++)
        score += getFrameScore(playerName, frames, index);

    return score;
}

export { getScore, getFrameScore };
