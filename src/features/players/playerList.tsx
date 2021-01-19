import React, { FC } from 'react';

import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { PlayerItem } from './playerItem';
import { EmptyView } from '../../components/emptyView';
import { usePlayers } from './usePlayers';

const PlayerList: FC = () => {
    const players = usePlayers();

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="center">Games Won</TableCell>
                        <TableCell align="center">&nbsp;</TableCell>
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
        </TableContainer>
    );
};

export { PlayerList };
