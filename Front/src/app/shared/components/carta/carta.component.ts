import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CardModel } from '../../Models/card.model';
import { CommonModule } from '@angular/common';
import { CartaService } from '../../../services/carta/carta.service';
import { get } from 'http';

@Component({
  selector: 'app-carta',
  imports: [CommonModule],
  templateUrl: './carta.component.html',
  styleUrl: './carta.component.css'
})
export class CartaComponent{
  
  @Input() card!: CardModel;
  cardServie = inject(CartaService);

  @Input() gamePlayerId!: number;

  @Output() getCard = new EventEmitter<{ card: CardModel, gamePlayerId: number }>();
  cardId!: CardModel;
  

  getAttributeValue(id: number) {
  this.cardServie.getCardById(id).subscribe((data) => {
    this.getCard.emit({ card: data, gamePlayerId: this.gamePlayerId });
  });
}
}
