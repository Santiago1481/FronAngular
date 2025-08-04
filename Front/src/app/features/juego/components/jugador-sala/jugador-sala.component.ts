import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-jugador-sala',
  imports: [],
  templateUrl: './jugador-sala.component.html',
  styleUrl: './jugador-sala.component.css'
})
export class JugadorSalaComponent {
  @Input() nombre: string = '';
  @Input() imagenUrl: string = '';
  @Input() cantidadCartas: number = 5;
}
