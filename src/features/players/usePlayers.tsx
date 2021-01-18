import { useSelector } from 'react-redux';

import { RootState } from '../../app/rootReducer';

const playersSelector = (state: RootState) => state.playersReducer.players;

function usePlayers () {
    return useSelector(playersSelector);
}

export { usePlayers };
