export interface Player {
    name: string;
    gamesWon: number;
}

export type Attempts = [number, number] | [number, number, number];

export interface Frame {
    attemptsMap: Record<string, Attempts>;
}

export interface Game {
    frames: Frame[];
}
