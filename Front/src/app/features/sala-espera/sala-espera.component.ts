import { Component } from '@angular/core';
import { CrearJugadorComponent } from './components/crear-jugador/crear-jugador.component';
import { BotonComponent } from '../../shared/components/boton/boton.component';

@Component({
  selector: 'app-sala-espera',
  imports: [CrearJugadorComponent, BotonComponent],
  templateUrl: './sala-espera.component.html',
  styleUrl: './sala-espera.component.css'
})
export class SalaEsperaComponent {

}
