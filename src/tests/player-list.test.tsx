import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithStore } from './utils';
import { PlayerList } from '../features/players/playerList';
import { playerListModel } from './page-model';

describe('PlayerList', () => {
    const playerOne = { name: 'Dude', gamesWon: 1 };
    const playerTwo = { name: 'Jesus', gamesWon: 0 };

    it('Should render ampty view by default', () => {
        renderWithStore(<PlayerList />);

        expect(playerListModel.emptyView).toBeInTheDocument();
    });

    it('Should render players', () => {
        const initialState = {
            playersReducer: {
                players: [playerOne, playerTwo]
            }
        };

        renderWithStore(<PlayerList />, { initialState });

        expect(screen.getByText(playerOne.name)).toBeInTheDocument();
        expect(screen.getByText(playerTwo.name)).toBeInTheDocument();
    });
});
