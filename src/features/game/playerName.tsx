import React, { FC } from 'react';

import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

import { useGame } from './useGame';

interface NameProps {
    name: string;
}

const PlayerName: FC<NameProps> = props => {
    const { name } = props;
    const { isFinished, placesWon } = useGame();
    const nameElement = (
        <Typography variant='body1' align='center'>
            {name}
        </Typography>
    );

    return (
        <TableCell>
            {
                isFinished ?
                <Badge badgeContent={placesWon[name]} color='primary'>
                    {nameElement}
                </Badge> :
                nameElement
            }
        </TableCell>
    );
}

export { PlayerName };
