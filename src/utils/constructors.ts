import { Attempts, Frame, Game, Player } from '../types';

function createGame (
    players: Player[]
): Game {
    return { players, frames: [] };
}

function createFrame (
    players: Player[],
    attempts: Attempts[]
): Frame {
    return {
        attemptsMap: players.reduce<Record<string, Attempts>>((map, player, index) => {
            map[player.name] = attempts[index];

            return map;
        }, {})
    };
}

function addFrame (
    game: Game,
    attempts: Attempts[]
): Game {
    return {
        ...game,
        frames: [...game.frames, createFrame(game.players, attempts)]
    }
}

export { createGame, addFrame };
