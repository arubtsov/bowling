import React, { FC } from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const EmptyView: FC = ({ children }) => {
    return (
        <Box display="flex" justifyContent="center" py={3} px={4}>
            <Typography variant="body1" color="textSecondary">
                {children}
            </Typography>
        </Box>
    )
};

export { EmptyView };
