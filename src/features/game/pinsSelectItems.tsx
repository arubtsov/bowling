import React, { ReactElement } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { Roll } from '../../types';

const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const labels = ['-', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'X'];

function PinsSelectItems (
    rollIndex: number,
    frameIndex: number,
    rolls: Roll[]
) {
    const items: ReactElement[] = [];
    const previousRoll = rolls[rollIndex - 1];
    const lastFrameAfterStrike = frameIndex === 9 && previousRoll === 10;
    let renderValues = values;
    let renderLabels = labels;

    if (typeof previousRoll === 'number' && !lastFrameAfterStrike) {
        renderValues = values.filter(val => val + previousRoll <= 10);
        renderLabels = renderValues.map(
            val =>  {
                if (previousRoll === 10)
                    return '';
                else if (val && val + previousRoll === 10)
                    return '/';

                return labels[val];
            }
        );
    }

    for (const value of renderValues) {
        items.push(
            <MenuItem value={value} key={value}>
                {renderLabels[value]}
            </MenuItem>
        );
    }

    return items;
}

export { PinsSelectItems }
