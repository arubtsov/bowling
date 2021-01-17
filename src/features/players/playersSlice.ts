import { createSlice } from '@reduxjs/toolkit';
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
    }
});

export default players.reducer;
