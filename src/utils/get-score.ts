import { Player, Game } from '../types';

function getScore (
    player: Player,
    game: Game
): number {
    let score = 0;

    for (const frame of game.frames) {
        const playerAttempts = frame.attemptsMap[player.name];

        score += playerAttempts[0] + playerAttempts[1];
    }

    return score;
}

export { getScore };
