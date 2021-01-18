import React, { FC } from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const EmptyView: FC = () => {
    return (
        <Box display="flex" justifyContent="center" my={3}>
            <Typography variant="body1" color="textSecondary">
                No players yet
            </Typography>
        </Box>
    )
};

export { EmptyView };
