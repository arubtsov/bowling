import { Rolls, GameFrame, Frame, Player } from '../types';

function createGameFrame (
    players: Player[],
    rolls?: Rolls[]
): GameFrame {
    return players.reduce(
        (frame, { name: playerName }, index) => {
            frame.framesMap[playerName] = {
                rolls: rolls ? rolls[index] : [null, null],
                total: 0,
                isFinished: false
            };

            return frame;
        },
        {
            framesMap: {} as Record<string, Frame>,
            isFinished: false
        }
    );
}

function addFrame (
    frames: GameFrame[],
    players: Player[],
    rolls: Rolls[]
): void {
    frames.push(createGameFrame(players, rolls));
}

export { createGameFrame, addFrame };
