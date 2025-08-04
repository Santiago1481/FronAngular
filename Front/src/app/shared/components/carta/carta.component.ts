import { Component, inject, Input, OnInit } from '@angular/core';
import { CardModel } from '../../Models/card.model';
import { CommonModule } from '@angular/common';
import { CartaService } from '../../../services/carta/carta.service';

@Component({
  selector: 'app-carta',
  imports: [CommonModule],
  templateUrl: './carta.component.html',
  styleUrl: './carta.component.css'
})
export class CartaComponent{
  
  @Input() card!: CardModel;
  cardServie = inject(CartaService);

  cardId?: CardModel;
  

  getAttributeValue(id:number) {
    return this.cardServie.getCardById(id).subscribe((data)=>{
      this.cardId = data;
      console.log(this.cardId);
    })
    
  }

  
}
