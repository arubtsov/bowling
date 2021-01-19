import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Game, Player } from '../../types';
import { createGameFrame } from '../../utils/constructors';
import { isDone } from '../../utils/predicates';
import { getFrameScore } from '../../utils/get-score';
import { updateRolls } from './update-rolls';

const initialState: Game = {
    frames: [],
    isFinished: false,
    currentFrameIndex: 0,
    placesWon: {}
};

interface GameStarted {
    players: Player[];
    placesWon: Record<string, number>;
}

interface RollAdded {
    frameIndex: number;
    playerName: string;
    rollIndex: number;
    roll: number;
}

const game = createSlice({
    name: 'Game',
    initialState,
    reducers: {
        startGame (state, action: PayloadAction<GameStarted>) {
            const { players } = action.payload;

            state.frames = [];
            state.currentFrameIndex = 0;
            state.isFinished = false;
            state.placesWon = {};

            while (state.frames.length < 10)
                state.frames.push(createGameFrame(players));
        },

        addRoll (state, action: PayloadAction<RollAdded>) {
            const { frames, currentFrameIndex } = state;
            const { frameIndex, playerName, rollIndex, roll } = action.payload;
            const gameFrame = frames[frameIndex];
            const playerFrame = gameFrame.framesMap[playerName];
            const { rolls } = playerFrame;

            updateRolls(frameIndex, rollIndex, roll, rolls);

            for (let index = frameIndex - 2; index < frames.length; index++) {
                const frameToUpdate = frames[index];

                if (frameToUpdate) {
                    if (!frameToUpdate.framesMap[playerName].rolls.find(isDone))
                        continue;

                    frameToUpdate.framesMap[playerName].total = getFrameScore(playerName, frames, index);

                    if (index > 0)
                        frameToUpdate.framesMap[playerName].total += frames[index - 1].framesMap[playerName].total;
                }
            }

            playerFrame.isFinished = rolls.every(isDone);
            gameFrame.isFinished = Object.values(gameFrame.framesMap).reduce<boolean>(
                (result, aFrame) => result && aFrame.isFinished
            , true);
            state.isFinished = frames.reduce<boolean>(
                (result, aGameFrame) => result && aGameFrame.isFinished
            , true);

            if (gameFrame.isFinished && frameIndex === currentFrameIndex)
                state.currentFrameIndex += 1;

            if (state.isFinished) {
                const lastFrameMap = frames[frames.length - 1].framesMap;
                const scoring: Record<number, string[]> = {};

                for (const [name, frame] of Object.entries(lastFrameMap)) {
                    if (scoring[frame.total])
                        scoring[frame.total].push(name);
                    else
                        scoring[frame.total] = [name];
                }

                Object.entries(scoring)
                    .map<[number, string[]]>(
                        ([score, names]) => [parseInt(score), names]
                    )
                    .sort((left, right) => {
                        if (left[0] < right[0])
                            return 1;
                        else if (left[0] > right[0])
                            return -1;

                        return 0;
                    }).forEach(([score, names], index) => {
                        for (const name of names)
                            state.placesWon[name] = index + 1;
                    });
            }
        }
    }
});

export const {
    startGame,
    addRoll
} = game.actions;

export default game.reducer;
