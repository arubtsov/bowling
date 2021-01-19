import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { EmptyView } from '../../components/emptyView';
import { FrameMarker } from './frameMarker';
import { FrameList } from './frameList';
import { MobilePagination } from './mobilePagination';

import { useGame } from './useGame';
import { usePlayers } from '../players/usePlayers';
import { startGame } from './gameSlice';

const NOT_FINISHED_MESSAGE = 'The game is not finished yet. All progress will be lost. Are you sure?';

const Game: FC = () => {
    const dispatch = useDispatch();
    const { frames, currentFrameIndex, isFinished, placesWon, shownFrameIndex } = useGame();
    const gamePlayerNames = frames[0] ? Object.keys(frames[0].framesMap) : [];
    const players = usePlayers();

    function handleStartGame () {
        if (!frames.length || isFinished || window.confirm(NOT_FINISHED_MESSAGE))
            dispatch(startGame({ players, placesWon }));
    }

    return (
        <Box display='flex' flexDirection='column' alignItems='center'>
            {
                <Box display='flex' mb={3}>
                    <Button variant="contained" color="primary" type="submit"
                        onClick={handleStartGame}
                    >
                        Start a New Game
                    </Button>
                </Box>
            }
            <Paper elevation={3}>
                {
                    players.length && frames.length ?
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"></TableCell>
                                {
                                    frames.map((frame, index) =>
                                        <FrameMarker
                                            key={index}
                                            index={index}
                                            currentFrameIndex={currentFrameIndex}
                                            shownFrameIndex={shownFrameIndex}
                                        />
                                    )
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                gamePlayerNames.map(name =>
                                    <FrameList
                                        key={name}
                                        playerName={name}
                                        frames={frames}
                                    />
                                )
                            }
                        </TableBody>
                    </Table> :
                    <EmptyView>
                        Start a new Game
                    </EmptyView>
                }
            </Paper>
            <MobilePagination />
        </Box>
    );
};

export { Game }
