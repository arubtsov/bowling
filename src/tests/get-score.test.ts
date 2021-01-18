import { getScore } from '../utils/get-score';
import { addFrame } from '../utils/constructors';
import { Frame } from '../types';

describe('getScore()', () => {
    let frames: Frame[] = [];
    const playerOne = {
        name: 'Jesus',
        gamesWon: 0
    };

    const playerTwo = {
        name: 'Dude',
        gamesWon: 0
    };
    const onePLayer = [playerOne];
    const twoPlayers = [playerOne, playerTwo];

    beforeEach(() => {
        frames = [];
    });

    it('Should return 0 if no frames are played yet', () => {
        expect(getScore(playerOne.name, frames)).toEqual(0);
    });

    it('Should return sum of attempts for a player', () => {
        addFrame(frames, onePLayer, [[2, 5]]);
        addFrame(frames, onePLayer, [[3, 7]]);

        expect(getScore(playerOne.name, frames)).toEqual(17);
    });

    it('Should distinct players while calculating the score', () => {
        addFrame(frames, twoPlayers, [[2, 5], [1, 4]]);
        addFrame(frames, twoPlayers, [[3, 7], [2, 6]]);

        expect(getScore(playerOne.name, frames)).toEqual(17);
        expect(getScore(playerTwo.name, frames)).toEqual(13);
    });

    it('Should take strikes into account', () => {
        addFrame(frames, onePLayer, [[10, 0]]);
        addFrame(frames, onePLayer, [[3, 6]]);
        addFrame(frames, onePLayer, [[1, 0]]);

        expect(getScore(playerOne.name, frames)).toEqual(29);
    });

    it('Regression: Strike in last but one frame', () => {
        addFrame(frames, onePLayer, [[10, 0]]);
        addFrame(frames, onePLayer, [[3, 6]]);

        expect(getScore(playerOne.name, frames)).toEqual(28);
    });

    it('Should correctly score two Strikes in a row', () => {
        addFrame(frames, onePLayer, [[10, 0]]);
        addFrame(frames, onePLayer, [[10, 0]]);
        addFrame(frames, onePLayer, [[4, 0]]);
        addFrame(frames, onePLayer, [[2, 0]]);

        expect(getScore(playerOne.name, frames)).toEqual(44);
    });

    it('Should correctly score Strike followed by a miss', () => {
        addFrame(frames, onePLayer, [[10, 0]]);
        addFrame(frames, onePLayer, [[0, 5]]);
        addFrame(frames, onePLayer, [[6, 0]]);

        expect(getScore(playerOne.name, frames)).toEqual(26);
    });

    it('Should correctly score Spare', () => {
        addFrame(frames, onePLayer, [[8, 2]]);
        addFrame(frames, onePLayer, [[2, 0]]);

        expect(getScore(playerOne.name, frames)).toEqual(14);
    });

    it('Should correctly score perfect game', () => {
        for(let index = 0; index < 9; index++)
            addFrame(frames, onePLayer, [[10, 0]]);

        addFrame(frames, onePLayer, [[10, 10, 10]]);

        expect(getScore(playerOne.name, frames)).toEqual(300);
    });

    it('Should correctly score given examples',() => {
        addFrame(frames, twoPlayers, [[8, 0], [8, 2]]);
        addFrame(frames, twoPlayers, [[7, 0], [9, 0]]);
        addFrame(frames, twoPlayers, [[5, 3], [4, 4]]);
        addFrame(frames, twoPlayers, [[9, 1], [7, 2]]);
        addFrame(frames, twoPlayers, [[9, 1], [9, 0]]);
        addFrame(frames, twoPlayers, [[10, 0], [10, 0]]);
        addFrame(frames, twoPlayers, [[8, 0], [10, 0]]);
        addFrame(frames, twoPlayers, [[5, 1], [8, 0]]);
        addFrame(frames, twoPlayers, [[3, 7], [3, 5]]);
        addFrame(frames, twoPlayers, [[9, 0], [9, 1, 7]]);

        expect(getScore(playerOne.name, frames)).toEqual(122);
        expect(getScore(playerTwo.name, frames)).toEqual(133);
    });
});
