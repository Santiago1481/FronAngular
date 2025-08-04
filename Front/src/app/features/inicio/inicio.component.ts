import { Component, NgModule } from '@angular/core';
import { BotonComponent } from '../../shared/components/boton/boton.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [BotonComponent, FontAwesomeModule, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  faStar = faStar;
}
