import React, { FC, ChangeEvent } from 'react';

import Select from '@material-ui/core/Select';

import { PinsSelectItems } from './pinsSelectItems';
import { Roll } from '../../types';

interface SelectProps {
    index: number;
    frameIndex: number;
    rolls: Roll[];
    disabled: boolean;
    onSelect: (index: number, value: number) => void
}

const PinsSelect: FC<SelectProps> = props => {
    const { index, frameIndex, rolls, disabled, onSelect } = props;
    const value = typeof rolls[index] === 'number' ? rolls[index] : '';
    const isDisabled = disabled ||
        (rolls[index - 1] === 10 && frameIndex < 9) ||
        rolls[index - 1] === null;

    const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
        onSelect(index, +(event.target.value as string));
    }

    return (
        <Select value={value} onChange={handleChange} disabled={isDisabled}>
            {PinsSelectItems(index, frameIndex, rolls)}
        </Select>
    )
};

export { PinsSelect };
