import React, { FC, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
import Hidden from '@material-ui/core/Hidden';

import { useGame } from './useGame';
import { showFrame } from './gameSlice';

const MobilePagination: FC = props => {
    const dispatch = useDispatch();
    const { currentFrameIndex, shownFrameIndex } = useGame();

    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        if (value - 1 <= currentFrameIndex)
            dispatch(showFrame(value));
    };

    return (
        <Hidden mdUp={true}>
            <Box mt={3}>
                <Pagination
                    count={currentFrameIndex + 1}
                    page={shownFrameIndex + 1}
                    onChange={handleChange}
                    size='medium'
                />
            </Box>
        </Hidden>
    )
}

export { MobilePagination }
