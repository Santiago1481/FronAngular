import { Component, inject, Input, OnInit } from '@angular/core';
import { CardModel } from '../../Models/card.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carta',
  imports: [CommonModule],
  templateUrl: './carta.component.html',
  styleUrl: './carta.component.css'
})
export class CartaComponent{


  @Input() card!: CardModel;



}
