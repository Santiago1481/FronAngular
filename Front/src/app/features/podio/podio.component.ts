import { Component } from '@angular/core';
import { BotonComponent } from '../../shared/components/boton/boton.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-podio',
  imports: [BotonComponent,CommonModule],
  templateUrl: './podio.component.html',
  styleUrl: './podio.component.css'
})
export class PodioComponent {

}
