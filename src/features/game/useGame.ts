import { useSelector } from 'react-redux';

import { RootState } from '../../app/rootReducer';

const gameSelector = (state: RootState) => state.gameReducer;

function useGame () {
    return useSelector(gameSelector);
}

export { useGame };
