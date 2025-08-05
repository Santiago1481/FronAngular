import { CardModel } from "./card.model";
import { GamePlayerModel } from "./gamePlayer.model";

export interface DeckPlayerModel {
    gamePlayerId: number;
    playerName:   string;
    playerId: number;
    cards:        CardModel[];
    used:         boolean;
    id:           number;
}