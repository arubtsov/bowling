import React, { FC } from 'react';

import Container from '@material-ui/core/Container';
import { PlayerList } from '../features/players/playerList';
import { AddPlayerGroup } from '../features/players/addPlayerGroup';

const App: FC = () => {
    return (
        <Container component="main" maxWidth="sm">
            <PlayerList />
            <AddPlayerGroup />
        </Container>
    );
};

export default App;
