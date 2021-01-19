import gameReducer,
{
    startGame,
    addRoll
} from '../features/game/gameSlice';
import { Game, GameFrame } from '../types';
import { playerOne, playerTwo } from './const';
import { createGameFrame } from '../utils/constructors';

describe('Game reducer', () => {
    let initialState: Game;
    const lastFrame = 9;

    beforeEach(() => {
        initialState = {
            frames: [] as GameFrame[],
            isFinished: false,
            currentFrameIndex: 0,
            placesWon: {}
        };

        while (initialState.frames.length < 10)
            initialState.frames.push(createGameFrame([playerOne, playerTwo]));
    });

    it('Should return initial state', () => {
        expect(gameReducer(void 0, { type: '' })).toEqual({
            frames: [],
            isFinished: false,
            currentFrameIndex: 0,
            placesWon: {}
        });
    });

    it('Should handle startGame action', () => {
        const action = startGame({
            players: [playerOne, playerTwo],
            placesWon: {}
        });

        expect(gameReducer(void 0, action)).toEqual(initialState);
    });

    it('Should add a roll and compute total for a frame', () => {
        const state = gameReducer(initialState, addRoll({
            frameIndex: 0,
            playerName: playerOne.name,
            rollIndex: 0,
            roll: 3
        }));

        expect(state).not.toBe(initialState);
        expect(state.frames).not.toBe(initialState.frames);
        expect(state.frames[0]).not.toBe(initialState.frames[0]);
        expect(state.frames[0].framesMap).not.toBe(initialState.frames[0].framesMap);
        expect(state.frames[0].framesMap[playerOne.name]).not.toBe(initialState.frames[0].framesMap[playerOne.name]);

        expect(state.frames[0].framesMap[playerOne.name]).toEqual({
            isFinished: false,
            rolls: [3, null],
            total: 3
        });
    });

    it('Should mark frame as finished if two rolls are added', () => {
        const rollOne = 3;
        const rollTwo = 3;

        let state = gameReducer(initialState, addRoll({
            frameIndex: 0,
            playerName: playerOne.name,
            rollIndex: 0,
            roll: rollOne
        }));

        state = gameReducer(state, addRoll({
            frameIndex: 0,
            playerName: playerOne.name,
            rollIndex: 1,
            roll: rollTwo
        }));

        expect(state.frames[0].framesMap[playerOne.name]).toEqual({
            isFinished: true,
            rolls: [rollOne, rollTwo],
            total: rollOne + rollTwo
        });
    });

    it('Should auto add second roll if first roll is Strike', () => {
        const state = gameReducer(initialState, addRoll({
            frameIndex: 0,
            playerName: playerOne.name,
            rollIndex: 0,
            roll: 10
        }));

        expect(state.frames[0].framesMap[playerOne.name]).toEqual({
            isFinished: true,
            rolls: [10, 0],
            total: 10
        });
    });

    it('Should delete second roll if first is reset and sum is greater than 10', () => {
        initialState.frames[0].framesMap[playerOne.name] = {
            isFinished: true,
            rolls: [3, 5],
            total: 8
        };

        const state = gameReducer(initialState, addRoll({
            frameIndex: 0,
            playerName: playerOne.name,
            rollIndex: 0,
            roll: 7
        }));

        expect(state.frames[0].framesMap[playerOne.name]).toEqual({
            isFinished: false,
            rolls: [7, null],
            total: 7
        });
    });

    it('Should add third roll in last frame if first is strike', () => {
        const state = gameReducer(initialState, addRoll({
            frameIndex: lastFrame,
            playerName: playerOne.name,
            rollIndex: 0,
            roll: 10
        }));

        expect(state.frames[lastFrame].framesMap[playerOne.name]).toEqual({
            isFinished: false,
            rolls: [10, null, null],
            total: 10
        });
    });

    it('Should remove third roll in last frame if first is reset to value lesser than 10', () => {
        let state = gameReducer(initialState, addRoll({
            frameIndex: lastFrame,
            playerName: playerOne.name,
            rollIndex: 0,
            roll: 10
        }));

        state = gameReducer(initialState, addRoll({
            frameIndex: lastFrame,
            playerName: playerOne.name,
            rollIndex: 0,
            roll: 8
        }));

        expect(state.frames[lastFrame].framesMap[playerOne.name]).toEqual({
            isFinished: false,
            rolls: [8, null],
            total: 8
        });
    });

    it('should not auto add 0 value in third roll if second is strike', () => {
        initialState.frames[lastFrame].framesMap[playerOne.name] = {
            isFinished: true,
            rolls: [10, null, null],
            total: 10
        };

        const state = gameReducer(initialState, addRoll({
            frameIndex: lastFrame,
            playerName: playerOne.name,
            rollIndex: 1,
            roll: 10
        }));

        expect(state.frames[lastFrame].framesMap[playerOne.name]).toEqual({
            isFinished: false,
            rolls: [10, 10, null],
            total: 20
        });
    });
});
