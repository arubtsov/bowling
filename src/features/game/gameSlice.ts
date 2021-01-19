import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Game, Player } from '../../types';
import { createGameFrame } from '../../utils/constructors';
import { isDone } from '../../utils/predicates';
import { updateRolls } from './update-rolls';
import { updateDependentFrameScores } from './update-frame-scores';
import { scorePlayers } from './score-players';

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
            updateDependentFrameScores(frameIndex, playerName, frames);

            playerFrame.isFinished = rolls.every(isDone);
            gameFrame.isFinished = Object.values(gameFrame.framesMap).reduce<boolean>(
                (result, aFrame) => result && aFrame.isFinished
            , true);
            state.isFinished = frames.reduce<boolean>(
                (result, aGameFrame) => result && aGameFrame.isFinished
            , true);

            if (gameFrame.isFinished && frameIndex === currentFrameIndex)
                state.currentFrameIndex += 1;

            if (state.isFinished)
                scorePlayers(state);
        }
    }
});

export const {
    startGame,
    addRoll
} = game.actions;

export default game.reducer;
