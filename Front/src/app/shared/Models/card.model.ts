
export interface CardModel {
    id:         number;
    imageUrl:   string;
    health:     number;
    speed:      number;
    resistance: number;
    magic:      number;
    force:      number;
    defense:    number;
    isBurned?: boolean;
}