import { CardModel } from "./card.model";

export interface DeckPlayerModel{
    gamePlayerId: number;
    playerName:   string;
    cards:        CardModel[];
    used:         boolean;
    id:           number;
}