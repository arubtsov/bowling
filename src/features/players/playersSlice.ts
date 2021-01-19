import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player } from '../../types';
import { startGame } from '../game/gameSlice';

interface PlayersState {
    players: Player[];
}

const initialState: PlayersState = {
    players: []
};

const players = createSlice({
    name: 'Players',
    initialState,
    reducers: {
        addPlayer (state, { payload: name }: PayloadAction<string>) {
            state.players.push({
                name,
                gamesWon: 0
            });
        },

        deletePlayer (state, { payload: name }: PayloadAction<string>) {
            state.players = state.players.filter(
                player => player.name !== name
            );
        },

        clearStats (state) {
            for (const player of state.players)
                player.gamesWon = 0;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(startGame, (state, action) => {
            const { placesWon } = action.payload;

            for (const [name, place] of Object.entries(placesWon)) {
                if (place === 1) {
                    const winner = state.players.find(aPlayer => aPlayer.name === name);

                    if (winner)
                        winner.gamesWon += 1;
                }
            }
        })
    }
});

export const {
    addPlayer,
    deletePlayer,
    clearStats
} = players.actions;

export default players.reducer;
