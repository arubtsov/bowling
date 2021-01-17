import { getScore } from '../utils/get-score';
import { createGame, addFrame } from '../utils/constructors';

describe('getScore()', () => {
    const playerOne = {
        name: 'Jesus',
        gamesWon: 0
    };

    const playerTwo = {
        name: 'Dude',
        gamesWon: 0
    };

    it('Should return 0 if no frames are played yet', () => {
        const game = createGame([playerOne]);

        expect(getScore(playerOne, game)).toEqual(0);
    });

    it('Should return sum of attempts for a player', () => {
        let game = createGame([playerOne]);

        game = addFrame(game, [[2, 5]]);
        game = addFrame(game, [[3, 7]]);

        expect(getScore(playerOne, game)).toEqual(17);
    });

    it('Should distinct players while calculating the score', () => {
        let game = createGame([playerOne, playerTwo]);

        game = addFrame(game, [[2, 5], [1, 4]]);
        game = addFrame(game, [[3, 7], [2, 6]]);

        expect(getScore(playerOne, game)).toEqual(17);
        expect(getScore(playerTwo, game)).toEqual(13);
    });

    it('Should take strikes into account', () => {
        let game = createGame([playerOne]);

        game = addFrame(game, [[10, 0]]);
        game = addFrame(game, [[3, 6]]);
        game = addFrame(game, [[1, 0]]);

        expect(getScore(playerOne, game)).toEqual(29);
    });

    it('Regression: Strike in last but one frame', () => {
        let game = createGame([playerOne]);

        game = addFrame(game, [[10, 0]]);
        game = addFrame(game, [[3, 6]]);

        expect(getScore(playerOne, game)).toEqual(28);
    });

    it('Should correctly score two Strikes in a row', () => {
        let game = createGame([playerOne]);

        game = addFrame(game, [[10, 0]]);
        game = addFrame(game, [[10, 0]]);
        game = addFrame(game, [[4, 0]]);
        game = addFrame(game, [[2, 0]]);

        expect(getScore(playerOne, game)).toEqual(44);
    });

    it('Should correctly score Strike followed by a miss', () => {
        let game = createGame([playerOne]);

        game = addFrame(game, [[10, 0]]);
        game = addFrame(game, [[0, 5]]);
        game = addFrame(game, [[6, 0]]);

        expect(getScore(playerOne, game)).toEqual(26);
    });

    it('Should correctly score Spare', () => {
        let game = createGame([playerOne]);

        game = addFrame(game, [[8, 2]]);
        game = addFrame(game, [[2, 0]]);

        expect(getScore(playerOne, game)).toEqual(14);
    });

    it('Should correctly score perfect game', () => {
        let game = createGame([playerOne]);

        for(let index = 0; index < 9; index++)
            game = addFrame(game, [[10, 0]]);

        game = addFrame(game, [[10, 10, 10]]);

        expect(getScore(playerOne, game)).toEqual(300);
    });

    it('Should correctly score given examples',() => {
        let game = createGame([playerOne, playerTwo]);

        game = addFrame(game, [[8, 0], [8, 2]]);
        game = addFrame(game, [[7, 0], [9, 0]]);
        game = addFrame(game, [[5, 3], [4, 4]]);
        game = addFrame(game, [[9, 1], [7, 2]]);
        game = addFrame(game, [[9, 1], [9, 0]]);
        game = addFrame(game, [[10, 0], [10, 0]]);
        game = addFrame(game, [[8, 0], [10, 0]]);
        game = addFrame(game, [[5, 1], [8, 0]]);
        game = addFrame(game, [[3, 7], [3, 5]]);
        game = addFrame(game, [[9, 0], [9, 1, 7]]);

        expect(getScore(playerOne, game)).toEqual(122);
        expect(getScore(playerTwo, game)).toEqual(133);
    });
});
