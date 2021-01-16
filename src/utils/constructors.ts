import { Attempts, Frame, Game, Player } from '../types';

function createGame (
    frames: Frame[]
): Game {
    return { frames };
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

export { createGame, createFrame };
