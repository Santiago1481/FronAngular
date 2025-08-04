import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tiempo-partida',
  templateUrl: './tiempo-partida.component.html',
  styleUrls: ['./tiempo-partida.component.css']
})
export class TiempoPartidaComponent implements OnInit{
  segundos: number = 0;
  minutos: number = 0;
  @Input() detener: boolean = false;
  intervalo: any;

  ngOnInit(): void {
    this.iniciarContador();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['detener'] && changes['detener'].currentValue === true) {
  //     clearInterval(this.intervalo);
  //   }
  // }

  iniciarContador(): void {
    this.intervalo = setInterval(() => {
      if (!this.detener) {
        this.segundos++;
        if (this.segundos >= 60) {
          this.minutos++;
          this.segundos = 0;
        }
      }
    }, 1000);
  }
}
