import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-boton',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './boton.component.html',
  styleUrl: './boton.component.css'
})
export class BotonComponent {
  @Input() title: string = '';
  @Input() route: string = '';
   @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }


}
