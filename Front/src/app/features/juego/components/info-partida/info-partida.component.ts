import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-partida',
  imports: [],
  templateUrl: './info-partida.component.html',
  styleUrl: './info-partida.component.css'
})
export class InfoPartidaComponent{
  @Input() tiempo: number = 0;
  @Input() mensaje: string = "";

}
