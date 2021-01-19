export interface Player {
    name: string;
    gamesWon: number;
}

export type Roll = null | number;
export type Rolls = Roll[];

export interface Frame {
    rolls: Rolls;
    total: number;
    isFinished: boolean;
}

export type GameFrame =  {
    framesMap: Record<string, Frame>;
    isFinished: boolean;
};

export interface Game {
    frames: GameFrame[];
    isFinished: boolean;
}
