import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithStore } from './utils';
import { addPlayerGroupModel } from './page-model';
import { AddPlayerGroup } from '../features/players/addPlayerGroup';
import { addPlayer } from '../features/players/playersSlice';

describe('AddPlayerGroup', () => {
    function setup () {
        const store = renderWithStore(<AddPlayerGroup />);

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
});
