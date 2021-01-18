import { Player, Game, Frame } from '../types';
import { isStrike, isSpare } from './predicates';
import { sum } from './array';

function getFrameScore (
    player: Player,
    frames: Frame[],
    index: number
): number {
    const attempts = frames[index].attemptsMap[player.name];
    let score = sum(attempts);

    if (isStrike(attempts)) {
        const isLastButOne = index === 8;
        let rollsToAdd = 2;

        for (const nextFrame of [frames[index + 1], frames[index + 2]]) {
            if (nextFrame && rollsToAdd) {
                const nextFrameAttempts = nextFrame.attemptsMap[player.name];

                if (isLastButOne) {
                    rollsToAdd -= 2;
                    score += sum(nextFrameAttempts.slice(0, 2));
                }
                else if (isStrike(nextFrameAttempts)) {
                    rollsToAdd -= 1;

                    if (nextFrameAttempts[0])
                        score += nextFrameAttempts[0];
                }
                else {
                    rollsToAdd -= 2;
                    score += sum(nextFrameAttempts);
                }
            }
        }
    }
    else if (isSpare(attempts)) {
        const nextFrame = frames[index + 1];

        if (nextFrame) {
            const attempts = nextFrame.attemptsMap[player.name];

            if (attempts[0])
                score += attempts[0];
        }
    }

    return score;
}


function getScore (
    player: Player,
    game: Game
): number {
    const { frames } = game;
    let score = 0;

    for (let index = 0; index < frames.length; index++)
        score += getFrameScore(player, frames, index);

    return score;
}

export { getScore };
