import { getFrameScore } from '../../utils/get-score';
import { isDone } from '../../utils/predicates';
import { GameFrame } from '../../types';

function updateDependentFrameScores (
    frameIndex: number,
    playerName: string,
    frames: GameFrame[]
) {
    for (let index = frameIndex - 2; index < frames.length; index++) {
        const frame = frames[index];

        if (frame) {
            const playerFrames = frame.framesMap[playerName];

            if (!playerFrames.rolls.find(isDone))
                continue;

            playerFrames.total = getFrameScore(playerName, frames, index);

            if (index > 0)
                playerFrames.total += frames[index - 1].framesMap[playerName].total;
        }
    }
}

export { updateDependentFrameScores };
