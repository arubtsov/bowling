import playerReducer,
{
    addPlayer,
    deletePlayer
} from '../features/players/playersSlice';

describe('Players reducer', () => {
    const playerOneName = 'Dude';
    const playerTwoName = 'Jesus';

    it('Should return initial state', () => {
        expect(playerReducer(void 0, { type: '' })).toEqual({
            players: []
        });
    });

    it('Should handle addPlayer action', () => {
        expect(playerReducer(void 0, addPlayer(playerOneName))).toEqual({
            players: [{
                name: playerOneName,
                gamesWon: 0
            }]
        });
    });

    it('Should handle deletePlayer action', () => {
        const initialState = {
            players: [
                { name: playerOneName, gamesWon: 0 },
                { name: playerTwoName, gamesWon: 0 }
            ]
        };

        expect(playerReducer(initialState, deletePlayer(playerTwoName))).toEqual({
            players: [{
                name: playerOneName,
                gamesWon: 0
            }]
        });
    });
});
