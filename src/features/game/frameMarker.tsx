import React, { FC } from 'react';

import TableCell from '@material-ui/core/TableCell';
import Chip from '@material-ui/core/Chip';

import { MobileHidden } from '../../components/mobileHidden';

interface MarkerProps {
    index: number;
    currentFrameIndex: number;
    shownFrameIndex: number;
}

const FrameMarker: FC<MarkerProps> = props => {
    const { index, currentFrameIndex, shownFrameIndex } = props;
    const color = index === currentFrameIndex ? 'primary' : 'default';
    const disabled = index > currentFrameIndex;

    return (
        <MobileHidden hide={index !== shownFrameIndex}>
            <TableCell align="center" key={index}>
                <Chip label={index + 1} color={color} disabled={disabled} />
            </TableCell>
        </MobileHidden>
    );
};

export { FrameMarker };
