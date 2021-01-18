import { usePlayers } from './usePlayers';

const ALREADY_EXISTS_ERROR = 'This name is already taken';

function useUniqueName (name: string) {
    const players = usePlayers();
    const alreadyExists = players.find(player => player.name === name);
    const error = alreadyExists ? ALREADY_EXISTS_ERROR : '';

    return error;
}

export { useUniqueName };
