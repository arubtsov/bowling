import { Player, Game, Frame } from '../types';
import { isStrike } from './predicates';

function getFrameScore (
    player: Player,
    frames: Frame[],
    index: number
): number {
    const attempts = frames[index].attemptsMap[player.name];
    let score = attempts[0] + attempts[1];

    if (isStrike(attempts)) {
        const nextFourRolls = [frames[index + 1], frames[index + 2]]
            .reduce(
                (accumulator, frame) => {
                    if (frame)
                        accumulator.push(...frame.attemptsMap[player.name]);

                    return accumulator;
                },
                [] as number[]
            );
        let ballsToAdd = 2;

        while (ballsToAdd && nextFourRolls.length) {
            const roll = nextFourRolls.shift();

            if (roll) {
                score += roll;
                ballsToAdd--;
            }
        }
    }

    return score;
}


function getScore (
    player: Player,
    game: Game
): number {
    let score = 0;

    return game.frames.reduce(
        (accumulator, frame, index) =>
            accumulator + getFrameScore(player, game.frames, index),
    score);
}

export { getScore };
