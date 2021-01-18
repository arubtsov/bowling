import { Attempts, Frame, Player } from '../types';

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
    frames: Frame[],
    players: Player[],
    attempts: Attempts[]
): void {
    frames.push(createFrame(players, attempts));
}

export { createFrame, addFrame };
