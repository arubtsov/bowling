import { getScore } from '../utils/get-score';
import { createGame, createFrame } from '../utils/constructors';

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
        const game = createGame([]);

        expect(getScore(playerOne, game)).toEqual(0);
    });

    it('Should return sum of attempts for a player', () => {
        const frames = [
            createFrame([playerOne], [[2, 5]]),
            createFrame([playerOne], [[3, 7]])
        ];
        const game = createGame(frames);

        expect(getScore(playerOne, game)).toEqual(17);
    });

    it('Should distinct players while calculating the score', () => {
        const frames = [
            createFrame([playerOne, playerTwo], [[2, 5], [1, 4]]),
            createFrame([playerOne, playerTwo], [[3, 7], [2, 6]])
        ];
        const game = createGame(frames);

        expect(getScore(playerOne, game)).toEqual(17);
        expect(getScore(playerTwo, game)).toEqual(13);
    });
});
