import { Component, inject } from '@angular/core';
import { CartaService } from '../../services/carta/carta.service';
import { CardModel } from '../../shared/Models/card.model';
import { CommonModule } from '@angular/common';
import { CartaComponent } from "../../shared/components/carta/carta.component";

@Component({
  selector: 'app-juego',
  imports: [CommonModule, CartaComponent],
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css'
})
export class JuegoComponent {
  cards: CardModel[] = [];
  CardService = inject(CartaService);



  ngOnInit(): void {
    this.loadCard();
  }
  
  loadCard(){
    this.CardService.getCard().subscribe((data)=>{
      this.cards = data;
      console.log(data)
    })
  }
}
