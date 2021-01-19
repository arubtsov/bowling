import React, { FC } from 'react';

import TableRow from '@material-ui/core/TableRow';

import { PlayerName } from './playerName';
import { PlayerFrame } from './playerFrame';
import { GameFrame } from '../../types';

interface ListProps {
    playerName: string;
    frames: GameFrame[];
}

const FrameList: FC<ListProps> = props => {
    const { playerName, frames } = props;

    return (
        <TableRow>
            <PlayerName name={playerName} />
            {
                frames.map((frame, index) =>
                    <PlayerFrame
                        key={index}
                        index={index}
                        playerName={playerName}
                        frame={frame.framesMap[playerName]}
                    />
                )
            }
        </TableRow>
    );
};

export { FrameList };
