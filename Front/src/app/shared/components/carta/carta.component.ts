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

  @Output() getCard = new EventEmitter<CardModel>();
  cardId!: CardModel;
  

  getAttributeValue(id:number) {
    return this.cardServie.getCardById(id).subscribe((data)=>{
      this.cardId = data;
      this.getCard.emit(this.cardId);
      console.log(this.cardId);
    })

  }
}
