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

  selectedCards: CardModel[] = [];

  addCard(event: CardModel) {
    this.selectedCards.push(event);
    this.Turns();
  }

  ngOnInit(): void {
    // this.loadCard();
    this.loadPlayers();
    this.StartRound();
  }

  // Variables para el juego
  numberRound: number = 0;
  ponts: number = 8;
  numPlayers: number = 0;
  turns: number = 0;
  atributte :  string = 'speed'; // Atributo por defecto para la comparación

  ver() {
    console.log(this.selectedCards);
  }

  constructor() {}
  StartRound() {
    this.Turns();
    // console.log(this.selectedCards);
    // console.log(this.numberRound);
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
    let mayor!: CardModel;
    switch (atributte) {
      case 'speed':
        mayor = this.getCardWinnerBySpeed();
        break;
      case 'force':
        mayor = this.getCardWinnerByForce();
        break;
      case 'defense':
        mayor = this.getCardWinnerByDefense();
        break;
        case 'resistance':
        mayor = this.getCardWinnerByResistance();
        break;
        case 'magic':
        mayor = this.getCardWinnerByMagic();
        break;
        case 'health':
        mayor = this.getCardWinnerByHealth();
        break;
      default:
        console.log('Atributo no válido');
        break;
    }
    
    console.log('La carta ganadora es: ', mayor);
  }


  getCardWinnerBySpeed(){
    let mayor!: CardModel;
    for (let i = 0; i < this.selectedCards.length; i++) {
      mayor = this.selectedCards[i];
      for (let j = 0; j < this.selectedCards.length; j++) {
        if (this.selectedCards[j].speed > mayor.speed) {
          mayor = this.selectedCards[j];
        }
      }
    }
    return mayor;
  }

  getCardWinnerByForce(){
    let mayor!: CardModel;
    for (let i = 0; i < this.selectedCards.length; i++) {
      mayor = this.selectedCards[i];
      for (let j = 0; j < this.selectedCards.length; j++) {
        if (this.selectedCards[j].force > mayor.force) {
          mayor = this.selectedCards[j];
        }
      }
    }
    return mayor;
  }

  getCardWinnerByDefense(){
    let mayor!: CardModel;
    for (let i = 0; i < this.selectedCards.length; i++) {
      mayor = this.selectedCards[i];
      for (let j = 0; j < this.selectedCards.length; j++) {
        if (this.selectedCards[j].defense > mayor.defense) {
          mayor = this.selectedCards[j];
        }
      }
    }
    return mayor;
  }

  getCardWinnerByResistance(){
    let mayor!: CardModel;
    for (let i = 0; i < this.selectedCards.length; i++) {
      mayor = this.selectedCards[i];
      for (let j = 0; j < this.selectedCards.length; j++) {
        if (this.selectedCards[j].resistance > mayor.resistance) {
          mayor = this.selectedCards[j];
        }
      }
    }
    return mayor;
  }
  getCardWinnerByMagic(){
    let mayor!: CardModel;
    for (let i = 0; i < this.selectedCards.length; i++) {
      mayor = this.selectedCards[i];
      for (let j = 0; j < this.selectedCards.length; j++) {
        if (this.selectedCards[j].magic > mayor.magic) {
          mayor = this.selectedCards[j];
        }
      }
    }
    return mayor;
  }

  getCardWinnerByHealth(){
    let mayor!: CardModel;
    for (let i = 0; i < this.selectedCards.length; i++) {
      mayor = this.selectedCards[i];
      for (let j = 0; j < this.selectedCards.length; j++) {
        if (this.selectedCards[j].health > mayor.health) {
          mayor = this.selectedCards[j];
        }
      }
    }
    return mayor;
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
    });
  }

  // loadCard() {
  //   this.CardService.getCard().subscribe((data) => {
  //     this.cards = data;
  //     // console.log(data);
  //   });
  // }
}
