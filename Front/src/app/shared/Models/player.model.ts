import { CardModel } from "./card.model";

export interface PlayerModel{
    id: number;
    name: string;
    // cartas?: CardModel[];
    // points: number;
}

export interface PlayerCreateModel{
    id: number;
    name: string;
}


