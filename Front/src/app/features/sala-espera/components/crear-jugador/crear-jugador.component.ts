import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { PlayerModel } from '../../../../shared/Models/player.model';
import { PlayerService } from '../../../../services/player/player.service';

@Component({
  selector: 'app-crear-jugador',
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-jugador.component.html',
  styleUrl: './crear-jugador.component.css',
})
export class CrearJugadorComponent implements OnInit {
  playerService = inject(PlayerService);

  @Input() player?: PlayerModel;
  @Output() onDeleted = new EventEmitter<void>();

  avatarAleatorio: string = '';
  imagenes = [
    '/avatares/1.jpg',
    '/avatares/2.jpg',
    '/avatares/3.jpg',
    '/avatares/4.jpg',
    '/avatares/5.jpg',
  ];

  ngOnInit(): void {
    const i = Math.floor(Math.random() * this.imagenes.length);
    this.avatarAleatorio = this.imagenes[i];
  }

  deleteLogic(id: number) {
    this.playerService.deleteLogic(id).subscribe(() => {
      console.log('eliminado');

      this.onDeleted.emit();
    });
  }
}
