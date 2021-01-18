import { screen } from '@testing-library/react';

const addPlayerGroupModel = {
    get input () {
        return screen.getByLabelText(/New Player Name/i);
    },

    get button () {
        return screen.getByRole('button', { name: /add/i });
    }
};

export { addPlayerGroupModel };
