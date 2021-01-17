import { combineReducers } from '@reduxjs/toolkit';

import playersReducer from '../features/players/playersSlice';

const rootReducer = combineReducers({
    playersReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
