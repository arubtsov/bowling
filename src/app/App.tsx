import React, { FC, ChangeEvent } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { TabPanel } from '../components/tab-panel';

import { PlayerList } from '../features/players/playerList';
import { AddPlayerGroup } from '../features/players/addPlayerGroup';
import { Game } from '../features/game/game';

const App: FC = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <AppBar position="static" color="default">
                <Tabs
                    centered
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                >
                    <Tab label="Players" />
                    <Tab label="Game" />
                </Tabs>
            </AppBar>
            <Container component="main" maxWidth="sm">
                <Box mt={3}>
                    <TabPanel index={0} value={value}>
                        <PlayerList />
                        <AddPlayerGroup />
                    </TabPanel>
                    <TabPanel index={1} value={value}>
                        <Game />
                    </TabPanel>
                </Box>
            </Container>
        </>
    );
};

export default App;
