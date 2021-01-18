import { combineReducers } from '@reduxjs/toolkit';

import playersReducer from '../features/players/playersSlice';
import gameReducer from '../features/game/gameSlice';

const rootReducer = combineReducers({
    playersReducer,
    gameReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
