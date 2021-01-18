import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import { Player } from '../types';
import { renderWithStore } from './utils';
import { PlayerItem } from '../features/players/playerItem';
import { playerItemModel } from './page-model';
import { deletePlayer } from '../features/players/playersSlice';

describe('PlayerItem', () => {
    const player: Player = {
        name: 'Dude',
        gamesWon: 7
    };

    function setup (player: Player, index = 0) {
        const tbodyElement = document.createElement('tbody');
        const store = renderWithStore(
            <PlayerItem player={player} index={index} />,
            { container: document.body.appendChild(tbodyElement) }
        );

        return { ...playerItemModel, store };
    }

    it('Should render player`s name, games won count and a delete button', () => {
        const playerIndex = 2;
        const { deleteButton } = setup(player, playerIndex);
        const index = screen.getByText(playerIndex + 1);
        const name = screen.getByText(player.name);
        const gamesWon = screen.getByText(player.gamesWon);

        expect(index).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(gamesWon).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
    });

    it('Should create deletePlayer action after delete button click', () => {
        const { store, deleteButton } = setup(player);

        fireEvent.click(deleteButton);

        expect(store.getActions()).toEqual([deletePlayer(player.name)]);
    });
});
