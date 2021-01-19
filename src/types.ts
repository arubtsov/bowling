export interface Player {
    name: string;
    gamesWon: number;
}

export type Roll = undefined | number;
export type Rolls = Roll[];

export interface Frame {
    rollsMap: Record<string, Rolls>;
    totalMap: Record<string, number>;
    isFinished: boolean;
}

export interface Game {
    frames: Frame[];
}
