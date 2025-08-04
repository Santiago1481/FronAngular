import { Component, inject, OnInit } from '@angular/core';
import { CartaService } from '../../services/carta/carta.service';
import { CardModel } from '../../shared/Models/card.model';
import { CommonModule } from '@angular/common';
import { CartaComponent } from '../../shared/components/carta/carta.component';
import { PlayerService } from '../../services/player/player.service';
import { PlayerModel } from '../../shared/Models/player.model';
import { PlayerComponent } from '../../shared/components/player/player.component';
import { DeckPlayerModel } from '../../shared/Models/deck.model';
import { DeckService } from '../../services/deck/deck.service';

@Component({
  selector: 'app-juego',
  imports: [CommonModule, CartaComponent, PlayerComponent],
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css',
})
export class JuegoComponent implements OnInit {
  //Servicios y modelos
  cards: CardModel[] = [];
  CardService = inject(CartaService);
  _playerService = inject(PlayerService);
  players: PlayerModel[] = [];
  deckPlayer?: DeckPlayerModel;
  deckService = inject(DeckService);

  ngOnInit(): void {
    this.loadCard();
    this.loadPlayers();
    // this.StartRound();
  }
  // Variables para el juego
  numberRound: number = 0;
  ponts: number = 8;
  numPlayers: number = 0;
  turns: number = 0;

  constructor() {}
  StartRound() {
    console.log(this.turns);
    this.getDeckPlayer(this.players[this.turns].id); // Asumiendo que el primer jugador es el que inicia
    this.turns++;
    if (this.turns > this.numPlayers - 1) {
      this.turns = 0;
      this.numberRound++;
    }

    console.log(this.numberRound);
  }

  iniciarJugadores(players: PlayerModel[]) {
    const numJugadores = players.length;
    const cartasPorJugador = 8;
  }

  getDeckPlayer(id: number) {
    this.deckService.getDeckPlayer(id).subscribe((data) => {
      this.deckPlayer = data;
      console.log(data);
    });
  }

  loadPlayers() {
    this._playerService.getPlayer().subscribe((data) => {
      this.players = data;
      console.log(data);
      this.numPlayers = this.players.length;
      console.log(this.numPlayers);
    });
  }

  loadCard() {
    this.CardService.getCard().subscribe((data) => {
      this.cards = data;
    });
  }
}
