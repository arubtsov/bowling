import { Game, GameFrame, Frame } from '../../types';
import { isDone } from '../../utils/predicates';

function updateFinishedState (
    playerFrame: Frame,
    gameFrame: GameFrame,
    state: Game
) {
    const { frames } = state;
    const { rolls } = playerFrame;

    playerFrame.isFinished = rolls.every(isDone);
    gameFrame.isFinished = Object.values(gameFrame.framesMap).reduce<boolean>(
        (result, aFrame) => result && aFrame.isFinished
    , true);
    state.isFinished = frames.reduce<boolean>(
        (result, aGameFrame) => result && aGameFrame.isFinished
    , true);
}

export { updateFinishedState };
