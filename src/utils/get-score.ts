import { GameFrame } from '../types';
import { isStrike, isSpare } from './predicates';
import { sum } from './array';

function getFrameScore (
    playerName: string,
    frames: GameFrame[],
    index: number
): number {
    const { rolls: frameRolls } = frames[index].framesMap[playerName];
    let score = sum(frameRolls);

    if (isStrike(frameRolls)) {
        const isLastButOne = index === 8;
        let rollsToAdd = 2;

        for (const nextFrame of [frames[index + 1], frames[index + 2]]) {
            if (nextFrame && rollsToAdd) {
                const { rolls: nextFrameRolls } = nextFrame.framesMap[playerName];

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
    else if (isSpare(frameRolls)) {
        const nextFrame = frames[index + 1];

        if (nextFrame) {
            const { rolls: nextFrameRolls } = nextFrame.framesMap[playerName];

            if (nextFrameRolls[0])
                score += nextFrameRolls[0];
        }
    }

    return score;
}


function getScore (
    playerName: string,
    frames: GameFrame[],
    end: number = frames.length
): number {
    let score = 0;

    for (let index = 0; index < end; index++)
        score += getFrameScore(playerName, frames, index);

    return score;
}

export { getScore, getFrameScore };
