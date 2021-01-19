import React, { FC } from 'react';

import TableCell from '@material-ui/core/TableCell';
import Chip from '@material-ui/core/Chip';

interface MarkerProps {
    index: number;
    currentFrameIndex: number;
}

const FrameMarker: FC<MarkerProps> = props => {
    const { index, currentFrameIndex } = props;
    const color = index === currentFrameIndex ? 'primary' : 'default';
    const disabled = index > currentFrameIndex;

    return (
        <TableCell align="center" key={index}>
            <Chip label={index + 1} color={color} disabled={disabled} />
        </TableCell>
    );
};

export { FrameMarker };
