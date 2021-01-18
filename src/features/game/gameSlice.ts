import { createSlice } from '@reduxjs/toolkit';
import { Game } from '../../types';

const initialState: Game = {
    frames: []
};

const game = createSlice({
    name: 'Game',
    initialState,
    reducers: {
    }
});

export default game.reducer;
