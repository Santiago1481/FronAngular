import { CardModel } from "./card.model";
import { GamePlayerModel } from "./gamePlayer.model";

export interface DeckModel {
    gamePlayerId: number;
    cardId: number;
    active: boolean;
    card: CardModel[];
    gamePlayer: GamePlayerModel;
    id: number;
}