import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import ClearAll from '@material-ui/icons/ClearAll';

import { PlayerItem } from './playerItem';
import { EmptyView } from '../../components/emptyView';
import { usePlayers } from './usePlayers';
import { clearStats } from './playersSlice';

const CLEAR_ALL_MESSAGE = 'Clear all game statistics?';

const PlayerList: FC = () => {
    const dispatch = useDispatch();
    const players = usePlayers();

    function handleClearAll () {
        if (window.confirm(CLEAR_ALL_MESSAGE))
            dispatch(clearStats());
    }

    return (
        <Paper elevation={3}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="center">Games Won</TableCell>
                        <TableCell align="center">
                            <IconButton
                                color="primary"
                                aria-label="clear stats"
                                onClick={handleClearAll}
                            >
                                <ClearAll />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        players.map((player, index) =>
                            <PlayerItem
                                key={player.name}
                                player={player}
                                index={index}
                            />
                        )
                    }
                </TableBody>
            </Table>
            {
                !players.length &&
                <EmptyView>
                    No players yet
                </EmptyView>
            }
        </Paper>
    );
};

export { PlayerList };
