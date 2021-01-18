import { Attempts, Frame, Game, Player } from '../types';

function createGame (): Game {
    return { frames: [] };
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
    players: Player[],
    attempts: Attempts[]
): Game {
    return {
        frames: [...game.frames, createFrame(players, attempts)]
    };
}

export { createGame, addFrame };
