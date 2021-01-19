import React, { FC } from 'react';

import Hidden from '@material-ui/core/Hidden';

interface HiddenProps {
    hide: boolean;
}

const MobileHidden: FC<HiddenProps> = ({ hide, children }) => {
    return (
        <Hidden mdDown={hide}>
            {children}
        </Hidden>
    )
};

export { MobileHidden };
