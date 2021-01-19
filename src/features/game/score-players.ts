import { Game } from '../../types';

function scorePlayers (state: Game) {
    const { frames } = state;
    const lastFrameMap = frames[frames.length - 1].framesMap;
    const scoring: Record<number, string[]> = {};

    for (const [name, frame] of Object.entries(lastFrameMap)) {
        if (scoring[frame.total])
            scoring[frame.total].push(name);
        else
            scoring[frame.total] = [name];
    }

    Object.entries(scoring)
        .map<[number, string[]]>(
            ([score, names]) => [parseInt(score), names]
        )
        .sort((left, right) => {
            if (left[0] < right[0])
                return 1;
            else if (left[0] > right[0])
                return -1;

            return 0;
        }).forEach(([score, names], index) => {
            for (const name of names)
                state.placesWon[name] = index + 1;
        });
}

export { scorePlayers }
