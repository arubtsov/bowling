import React, { FC, useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { addPlayer } from './playersSlice';
import { useUniqueName } from './useUniqueName';

const AddPlayerGroup: FC = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const error = useUniqueName(name);
    const hasError = !!error;

    const onSubmit = (event: FormEvent<HTMLElement>) => {
        event.preventDefault();

        if (error) return;

        dispatch(addPlayer(name));
        setName('');
    };

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="center"
            mt={3} component="form" onSubmit={onSubmit}
        >
            <TextField
                error={hasError}
                helperText={error}
                id='name-input'
                value={name}
                label="New Player Name"
                variant="outlined"
                onChange={onNameChange}
            />
            <Box ml={2}>
                <Button variant="contained" color="primary" type="submit"
                    disabled={!name || hasError}
                >
                    Add
                </Button>
            </Box>
        </Box>
    );
};

export { AddPlayerGroup };
