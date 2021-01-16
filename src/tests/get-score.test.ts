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

    it('Regression: Strike is one of last frames', () => {
        let game = createGame([playerOne]);

        game = addFrame(game, [[10, 0]]);
        game = addFrame(game, [[3, 6]]);

        expect(getScore(playerOne, game)).toEqual(28);
    });
});
