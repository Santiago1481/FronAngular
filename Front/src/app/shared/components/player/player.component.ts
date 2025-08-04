import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PlayerService } from '../../../services/player/player.service';
import { PlayerModel } from '../../Models/player.model';

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {
  playerService = inject(PlayerService);

  @Input() player?: PlayerModel;  
  // @Output() onDeleted = new EventEmitter<void>();

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

  // deleteLogic(id: number) {
  //   this.playerService.deleteLogic(id).subscribe(() => {
  //     console.log('eliminado');

  //     this.onDeleted.emit();
  //   });
  // }
}
