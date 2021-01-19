import { Rolls, Frame, Player } from '../types';

function createFrame (
    players: Player[],
    attempts?: Rolls[]
): Frame {
    return players.reduce<Frame>(
        (frame, { name }, index) => {
            frame.rollsMap[name] = attempts ? attempts[index] : [void 0, void 0];
            frame.totalMap[name] = 0;

            return frame;
        },
        {
            rollsMap: {},
            totalMap: {},
            isFinished: false
        }
    );
}

function addFrame (
    frames: Frame[],
    players: Player[],
    attempts: Rolls[]
): void {
    frames.push(createFrame(players, attempts));
}

export { createFrame, addFrame };
