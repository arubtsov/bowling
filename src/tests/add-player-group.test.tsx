import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { renderWithStore } from './utils';
import { addPlayerGroupModel } from './page-model';
import { AddPlayerGroup } from '../features/players/addPlayerGroup';
import { addPlayer } from '../features/players/playersSlice';
import { RootState } from '../app/rootReducer';

describe('AddPlayerGroup', () => {
    function setup (initialState?: RootState) {
        const store = renderWithStore(<AddPlayerGroup />, { initialState });

        return { ...addPlayerGroupModel, store };
    }

    it('Should render an empty input and a disabled button by default', () => {
        const { input, button } = setup();

        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('');

        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
    });

    it('Should enable button after input', () => {
        const { input, button } = setup();

        fireEvent.change(input, { target: { value: 'Dude' } });

        expect(button).not.toBeDisabled();
    });

    it('Should dispatch addPlayer action on button click', () => {
        const { input, button, store } = setup();

        const name = 'Dude';

        fireEvent.change(input, { target: { value: name } });
        fireEvent.click(button);

        expect(store.getActions()).toEqual([addPlayer(name)]);
    });

    it('Should show error, disable button, and dispatch no actions if player name is already taken', () => {
        const errorRe = /This name is already taken/i;
        const existingPlayer = { name: 'Jesus', gamesWon: 0 };
        const initialState = {
            playersReducer: {
                players: [existingPlayer]
            }
        };
        const { input, button, store } = setup(initialState);

        fireEvent.change(input, { target: { value: existingPlayer.name } });

        expect(screen.getByText(errorRe)).toBeInTheDocument();
        expect(button).toBeDisabled();

        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(store.getActions()).toEqual([]);

        fireEvent.change(input, { target: { value: 'Dude' } });

        expect(screen.queryByText(errorRe)).not.toBeInTheDocument();
        expect(button).not.toBeDisabled();
    });
});
