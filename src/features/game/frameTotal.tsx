import React, { FC } from 'react';

import Typography from '@material-ui/core/Typography';

import { useGame } from './useGame';

interface TotalProps {
    frameIndex: number;
}

const FrameTotal: FC<TotalProps> = props => {
    const { isFinished } = useGame();
    const { frameIndex, children } = props;
    const color = isFinished && frameIndex === 9 ? 'secondary' : 'textSecondary';

    return (
        <Typography variant="h6" color={color} align='center'>
            {children}
        </Typography>
    )
};

export { FrameTotal };
