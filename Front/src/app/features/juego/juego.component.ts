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

@Component({
  selector: 'app-juego',
  imports: [
    CommonModule,
    CartaComponent,
    PlayerComponent,
    TiempoPartidaComponent,
    InfoPartidaComponent,
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

  selectedCards: { card: CardModel; playerId: number }[] = [];

  addCard(card: CardModel) {
    const playerId = this.players[this.turns].id;
    this.selectedCards.push({ card, playerId: playerId });
    this.Turns();
  }

  ngOnInit(): void {
    // this.loadCard();
    this.loadPlayers();
    this.StartRound();
  }

  // Variables para el juego
  ponts: number = 8;
  numPlayers: number = 0;
  turns: number = 0;
  atributte: string = '';
  numberRound: number = 1;
  maxRounds: number = 3;
  selectAtributte: boolean = true;
  isPlayingRound: boolean = false;
  FinishRound: boolean = false;
  gameFinished: boolean = false;
  winnerCard?: CardModel;
  scores: { [playerId: number]: number } = {};
  finalWinner?: PlayerModel;

  ver() {
    console.log(this.selectedCards);
  }

  constructor() {}
  
  StartRound() {
    // Si el juego ya terminó, no iniciar nueva ronda
    if (this.numberRound > this.maxRounds) {
      this.gameFinished = true;
      this.calculateFinalWinner();
      return;
    }

    // this.Turns();
    // console.log(this.selectedCards);
    // console.log(this.numberRound);
    this.atributte = ''; // atributo se elige por el jugador
    this.selectAtributte = true;
    this.isPlayingRound = false;
    this.FinishRound = false;
    this.winnerCard = undefined;
    this.turns = 0;
    this.selectedCards = [];
  }

  GetAttribute(atributte: string) {
    this.atributte = atributte;
    this.selectAtributte = false;
    this.isPlayingRound = true;
    this.Turns();
  }

  Turns() {
    console.log(this.turns);
    this.getDeckPlayer(this.players[this.turns].id); // Asumiendo que el primer jugador es el que inicia
    this.turns++;

    if (this.turns > this.numPlayers - 1) {
      this.turns = 0;
    }
    if (this.selectedCards.length == this.players.length) {
      this.calulateCardWinner(this.atributte);
      this.selectedCards = [];
    }
  }

  calulateCardWinner(atributte: string) {
    let ganador!: { card: CardModel; playerId: number };
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
        break;
    }
    this.winnerCard = ganador.card;
    this.FinishRound = true;
    this.isPlayingRound = false;

    // Sumar puntos
    if (ganador) {
      this.scores[ganador.playerId]++;
      const playerWinner = this.players.find((p) => p.id === ganador.playerId);
      console.log(`La carta ganadora es: `, ganador.card);
      console.log(`El jugador que ganó la ronda es: ${playerWinner?.name}`);
      console.log('Puntuaciones actuales:', this.scores);
    }

    // No avanzar ronda aquí, se hace cuando se presiona "Siguiente ronda"
  }

  getWinnerPlayerName(): string {
    // Buscar el jugador usando el playerId del ganador
    const winnerData = this.selectedCards.find(sc => sc.card === this.winnerCard);
    if (winnerData) {
      const player = this.players.find(p => p.id === winnerData.playerId);
      return player ? player.name : 'Jugador desconocido';
    }
    return 'Jugador desconocido';
  }

  calculateFinalWinner() {
    let maxScore = -1;
    let winnerId = -1;
    
    // Encontrar el puntaje más alto
    for (const playerId in this.scores) {
      if (this.scores[playerId] > maxScore) {
        maxScore = this.scores[playerId];
        winnerId = parseInt(playerId);
      }
    }
    
    // Encontrar el jugador ganador
    this.finalWinner = this.players.find(p => p.id === winnerId);
    console.log(`¡Juego finalizado! Ganador: ${this.finalWinner?.name} con ${maxScore} rondas ganadas`);
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
      // CORREGIDO: Comparar health con health, no speed con health
      if (this.selectedCards[i].card.health > mayor.card.health) {
        mayor = this.selectedCards[i];
      }
    }
    return mayor;
  }

  nextRound() {
    this.numberRound++;
    this.StartRound();
  }

  restartGame() {
    this.numberRound = 1;
    this.gameFinished = false;
    this.finalWinner = undefined;
    // Reiniciar puntuaciones
    this.players.forEach((player) => {
      this.scores[player.id] = 0;
    });
    this.StartRound();
  }

  ResolRound() {
    this.numberRound++;
  }

  iniciarJugadores(players: PlayerModel[]) {
    const numJugadores = players.length;
    const cartasPorJugador = 8;
  }

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
      // console.log(this.numPlayers);
      this.players.forEach((player) => {
        this.scores[player.id] = 0;
      });
    });
  }

  // Método para obtener las puntuaciones como array para mostrar en template
    getScoresArray() {
    return this.players.map(player => ({
      player: player,
      score: this.scores[player.id] || 0
    })).sort((a, b) => b.score - a.score); // Ordenar de mayor a menor puntuación
  }

  // loadCard() {
  //   this.CardService.getCard().subscribe((data) => {
  //     this.cards = data;
  //     // console.log(data);
  //   });
  // }
}