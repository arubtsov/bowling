import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player } from '../../types';

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
        }
    }
});

export const {
    addPlayer,
    deletePlayer
} = players.actions;

export default players.reducer;
