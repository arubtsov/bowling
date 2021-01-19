import { Attempts, Frame, Player } from '../types';

function createFrame (
    players: Player[],
    attempts?: Attempts[]
): Frame {
    return players.reduce<Frame>(
        (frame, { name }, index) => {
            frame.attemptsMap[name] = attempts ? attempts[index] : [void 0, void 0];
            frame.totalMap[name] = 0;

            return frame;
        },
        {
            attemptsMap: {},
            totalMap: {}
        }
    );
}

function addFrame (
    frames: Frame[],
    players: Player[],
    attempts: Attempts[]
): void {
    frames.push(createFrame(players, attempts));
}

export { createFrame, addFrame };
