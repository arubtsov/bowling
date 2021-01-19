import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import TableCell from '@material-ui/core/TableCell';
import Box from '@material-ui/core/Box';

import { MobileHidden } from '../../components/mobileHidden';
import { PinsSelect } from './pinsSelect';
import { FrameTotal } from './frameTotal';

import { Frame } from '../../types';
import { useGame } from './useGame';
import { addRoll } from './gameSlice';

interface FrameProps {
    index: number;
    playerName: string;
    frame: Frame;
}

const PlayerFrame: FC<FrameProps> = ({ index, playerName, frame }) => {
    const dispatch = useDispatch();
    const { currentFrameIndex, shownFrameIndex } = useGame();
    const { rolls, total } = frame;

    const thirdRollAvailable = index === 9 && rolls[0] === 10;
    const rollsIndices = [0, 1];

    if (thirdRollAvailable)
        rollsIndices.push(2);

    function handleSelect (rollIndex: number, value: number) {
        dispatch(addRoll({ rollIndex, frameIndex: index, playerName, roll: value }));
    }

    return (
        <MobileHidden hide={index !== shownFrameIndex}>
            <TableCell>
                <Box display='flex' flexDirection='column'>
                    <Box display='flex' justifyContent='flex-end'>
                        {
                            rollsIndices.map(rollIndex =>
                                <PinsSelect
                                    key={rollIndex}
                                    index={rollIndex}
                                    frameIndex={index}
                                    rolls={rolls}
                                    disabled={index > currentFrameIndex}
                                    onSelect={handleSelect}
                                />
                            )
                        }
                    </Box>
                    <FrameTotal frameIndex={index}>{total}</FrameTotal>
                </Box>
            </TableCell>
        </MobileHidden>
    )
};

export { PlayerFrame };
