export interface Player {
    name: string;
    gamesWon: number;
}

export type Attempt = undefined | number;
export type Attempts = Attempt[];

export interface Frame {
    attemptsMap: Record<string, Attempts>;
    totalMap: Record<string, number>;
}

export interface Game {
    frames: Frame[];
}
