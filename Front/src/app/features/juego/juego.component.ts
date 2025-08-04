import { Component, inject } from '@angular/core';
import { CartaService } from '../../services/carta/carta.service';
import { CardModel } from '../../shared/Models/card.model';
import { CommonModule } from '@angular/common';
import { CartaComponent } from '../../shared/components/carta/carta.component';
import { PlayerService } from '../../services/player/player.service';
import { PlayerModel } from '../../shared/Models/player.model';

@Component({
  selector: 'app-juego',
  imports: [CommonModule, CartaComponent],
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css',
})
export class JuegoComponent {
  cards: CardModel[] = [];
  CardService = inject(CartaService);
  _playerService = inject(PlayerService);
  players: PlayerModel[] = [];

  ngOnInit(): void {
    this.loadCard();
    this.loadPlayers();
  }

  iniciarJugadores(players: PlayerModel[]) {
    const numJugadores = players.length;
    const cartasPorJugador = 8;

    
  }

  loadPlayers() {
    this._playerService.getPlayer().subscribe((data) => {
      this.players = data;
    });
  }

  loadCard() {
    this.CardService.getCard().subscribe((data) => {
      this.cards = data;
      console.log(data);
    });
  }
}
