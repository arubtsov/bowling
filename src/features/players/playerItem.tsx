import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { Player } from '../../types';
import { deletePlayer } from './playersSlice';

interface ItemProps {
    player: Player;
    index: number;
}

const PlayerItem: FC<ItemProps> = ({ player, index }) => {
    const { name, gamesWon } = player;
    const dispatch = useDispatch();

    const onDeleteCLick = () => {
        dispatch(deletePlayer(name));
    };

    return (
        <TableRow>
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell align="right">{name}</TableCell>
            <TableCell align="center">{gamesWon}</TableCell>
            <TableCell align="center">
                <IconButton
                    color="primary"
                    aria-label="delete player"
                    onClick={onDeleteCLick}
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
};

export { PlayerItem };
