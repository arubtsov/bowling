import { screen } from '@testing-library/react';

const addPlayerGroupModel = {
    get input () {
        return screen.getByLabelText(/New Player Name/i);
    },

    get button () {
        return screen.getByRole('button', { name: /add/i });
    }
};

const playerItemModel = {
    get deleteButton () {
        return screen.getByRole('button', { name: /delete player/i });
    }
};

const playerListModel = {
    get emptyView () {
        return screen.getByText(/no players yet/i);
    }
}

export {
    addPlayerGroupModel,
    playerItemModel,
    playerListModel
};
