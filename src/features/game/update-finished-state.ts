import { Game, GameFrame, Frame } from '../../types';
import { isDone } from '../../utils/predicates';

interface IsFinished {
    isFinished: boolean;
}

function reducer (result: boolean, frame: IsFinished) {
    return result && frame.isFinished;
}

function reduceFramesFinished (frames: IsFinished[]) {
    return frames.reduce(reducer, true);
}

function updateFinishedState (
    playerFrame: Frame,
    gameFrame: GameFrame,
    state: Game
) {
    const { frames } = state;
    const { rolls } = playerFrame;

    playerFrame.isFinished = rolls.every(isDone);
    gameFrame.isFinished = reduceFramesFinished(Object.values(gameFrame.framesMap))
    state.isFinished = reduceFramesFinished(frames);
}

export { updateFinishedState };
