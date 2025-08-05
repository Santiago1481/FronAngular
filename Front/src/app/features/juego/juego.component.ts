import { Component, inject, OnInit } from '@angular/core';
import { CartaService } from '../../services/carta/carta.service';
import { CardModel } from '../../shared/Models/card.model';
import { CommonModule } from '@angular/common';
import { CartaComponent } from '../../shared/components/carta/carta.component';
import { PlayerService } from '../../services/player/player.service';
import { PlayerModel } from '../../shared/Models/player.model';
import { DeckPlayerModel } from '../../shared/Models/deck.model';
import { DeckService } from '../../services/deck/deck.service';
import { PlayerComponent } from '../../shared/components/player/player.component';
import { TiempoPartidaComponent } from './components/tiempo-partida/tiempo-partida.component';
import { InfoPartidaComponent } from './components/info-partida/info-partida.component';
import { Router } from '@angular/router';
import { GameService } from '../../services/game/game.service';

@Component({
  selector: 'app-juego',
  imports: [
    CommonModule,
    CartaComponent,
    PlayerComponent,
    // TiempoPartidaComponent,
    // InfoPartidaComponent,
  ],
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css',
})
export class JuegoComponent implements OnInit {
  //Servicios y modelos
  // cards: CardModel[] = [];
  CardService = inject(CartaService);
  _playerService = inject(PlayerService);
  players: PlayerModel[] = [];
  deckPlayer?: DeckPlayerModel;
  deckService = inject(DeckService);
  router = inject(Router);
  gameService = inject(GameService);

  selectedCards: { card: CardModel; playerId: number }[] = [];

  ngOnInit(): void {
    // this.loadCard();
    this.loadPlayers();
    this.StartRound();
  }

  // Variables para el juego
  // ponts: number = 8;
  numPlayers: number = 0;
  turns: number = 0;
  atributte: string = '';
  numberRound: number = 1;
  maxRounds: number = 3;
  selectAtributte: boolean = true;
  PlayRound: boolean = false;
  FinishRound: boolean = false;
  winnerCard?: CardModel;
  points: { [playerId: number]: number } = {};
  winnerPlayerId?: number;

  get GameFinish(): boolean {
    return this.numberRound > this.maxRounds;
  }

  addCard(event: { card: CardModel; gamePlayerId: number }) {
    const { card, gamePlayerId } = event;
    const playerId = this.players[this.turns].id;

    this.selectedCards.push({ card, playerId });

    this.deckService.deleteDeck(gamePlayerId, card.id).subscribe();

    this.Turns();
  }
  // ver() {
  //   console.log(this.selectedCards);
  // }

  constructor() {}
  StartRound() {
    // this.Turns();
    // console.log(this.selectedCards);
    // console.log(this.numberRound);
    this.atributte = '';
    this.selectAtributte = true;
    this.PlayRound = false;
    this.FinishRound = false;
    this.winnerCard = undefined;
    // this.turns = 0;
    this.turns = (this.turns + 1) % this.players.length; //para pasar el juagdor a la derecha jeje, Magia

    this.selectedCards = [];
  }

  resertGame() {
    this.numberRound = 1;
    this.points = {};
    this.players.forEach((p) => (this.points[p.id] = 0));
    this.turns = 0;
    this.StartRound();
  }

  Turns() {
    console.log(this.turns);
    this.getDeckPlayer(this.players[this.turns].id);
    this.turns++;

    if (this.turns > this.numPlayers - 1) {
      this.turns = 0;
    }
    if (this.selectedCards.length == this.players.length) {
      this.calulateCardWinner(this.atributte);
      this.selectedCards = [];
    }
  }
  chooseAttribute(attr: string) {
    this.atributte = attr;
    this.selectAtributte = false;
    this.PlayRound = true;
    this.Turns();
  }
  getWinnerPlayerName(): string {
    const player = this.players.find((p) => p.id === this.winnerPlayerId);
    return player ? player.name : 'Jugador desconocido';
  }

  calulateCardWinner(atributte: string) {
    if (!atributte) {
      console.error('Atributo no definido');
      return;
    }

    let ganador: { card: CardModel; playerId: number };

    switch (atributte) {
      case 'speed':
        ganador = this.getCardWinnerBySpeed();
        break;
      case 'force':
        ganador = this.getCardWinnerByForce();
        break;
      case 'defense':
        ganador = this.getCardWinnerByDefense();
        break;
      case 'resistance':
        ganador = this.getCardWinnerByResistance();
        break;
      case 'magic':
        ganador = this.getCardWinnerByMagic();
        break;
      case 'health':
        ganador = this.getCardWinnerByHealth();
        break;
      default:
        console.log('Atributo no válido');
        return;
    }

    this.winnerCard = ganador.card;
    this.winnerPlayerId = ganador.playerId;
    this.FinishRound = true;
    this.PlayRound = false;

    // Sumar puntos
    this.points[ganador.playerId]++;
    const playerWinner = this.players.find((p) => p.id === ganador.playerId);
    console.log(`La carta ganadora es: `, ganador.card);
    console.log(`El jugador que ganó la ronda es: ${playerWinner?.name}`);

    // Avanzar ronda
    this.numberRound++;
  }

  getCardWinnerBySpeed() {
    let mayor = this.selectedCards[0];
    for (let i = 1; i < this.selectedCards.length; i++) {
      if (this.selectedCards[i].card.speed > mayor.card.speed) {
        mayor = this.selectedCards[i];
      }
    }
    return mayor;
  }

  getCardWinnerByForce() {
    let mayor = this.selectedCards[0];
    for (let i = 1; i < this.selectedCards.length; i++) {
      if (this.selectedCards[i].card.force > mayor.card.force) {
        mayor = this.selectedCards[i];
      }
    }
    return mayor;
  }

  getCardWinnerByDefense() {
    let mayor = this.selectedCards[0];
    for (let i = 1; i < this.selectedCards.length; i++) {
      if (this.selectedCards[i].card.defense > mayor.card.defense) {
        mayor = this.selectedCards[i];
      }
    }
    return mayor;
  }

  getCardWinnerByResistance() {
    let mayor = this.selectedCards[0];
    for (let i = 1; i < this.selectedCards.length; i++) {
      if (this.selectedCards[i].card.resistance > mayor.card.resistance) {
        mayor = this.selectedCards[i];
      }
    }
    return mayor;
  }
  getCardWinnerByMagic() {
    let mayor = this.selectedCards[0];
    for (let i = 1; i < this.selectedCards.length; i++) {
      if (this.selectedCards[i].card.magic > mayor.card.magic) {
        mayor = this.selectedCards[i];
      }
    }
    return mayor;
  }

  getCardWinnerByHealth() {
    let mayor = this.selectedCards[0];
    for (let i = 1; i < this.selectedCards.length; i++) {
      if (this.selectedCards[i].card.health > mayor.card.health) {
        mayor = this.selectedCards[i];
      }
    }
    return mayor;
  }

  // ResolRound() {
  //   this.numberRound++;
  // }

  // iniciarJugadores(players: PlayerModel[]) {
  //   const numJugadores = players.length;
  //   const cartasPorJugador = 8;
  // }

  getDeckPlayer(id: number) {
    this.deckService.getDeckPlayer(id).subscribe((data) => {
      this.deckPlayer = data;
      // console.log(data);
    });
  }

  loadPlayers() {
    this._playerService.getPlayer().subscribe((data) => {
      this.players = data;
      // console.log(data);
      this.numPlayers = this.players.length;
      this.players.forEach((player) => {
        this.points[player.id] = 0;
      });
      // console.log(this.numPlayers);
    });
  }

  exit() {
    this.gameService.deletAll().subscribe(() => {
      this.router.navigate(['inicio']);
    });
  }

  // loadCard() {
  //   this.CardService.getCard().subscribe((data) => {
  //     this.cards = data;
  //     // console.log(data);
  //   });
  // }
}
