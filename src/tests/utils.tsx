import React, { FC, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import reducer, { RootState } from '../app/rootReducer';

interface Options {
    initialState?: RootState;
    container?: Element;
}

const defaultState: RootState = {
    playersReducer: {
        players: []
    }
};
const defaultOptions: Options = { initialState: defaultState };
const mockStore = configureStore([]);

function renderWithStore (
    ui: ReactElement,
    { initialState = defaultState, container } = defaultOptions
) {
    const store = mockStore((action: AnyAction) => reducer(initialState, action));

    const Wrapper: FC = ({ children }) =>
        <Provider store={store}>{children}</Provider>;

    render(ui, { wrapper: Wrapper, container });

    return store;
}

export { renderWithStore };
