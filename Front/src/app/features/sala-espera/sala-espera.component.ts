import { Component, inject, OnInit } from '@angular/core';
import { CrearJugadorComponent } from './components/crear-jugador/crear-jugador.component';
import { BotonComponent } from '../../shared/components/boton/boton.component';
import { PlayerModel } from '../../shared/Models/player.model';
import { PlayerService } from '../../services/player/player.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sala-espera',
  imports: [BotonComponent, CommonModule, CrearJugadorComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './sala-espera.component.html',
  styleUrl: './sala-espera.component.css'
})
export class SalaEsperaComponent implements OnInit {
  players: PlayerModel[]=[];
  playerService = inject(PlayerService);
  mostrarModal = false;
  formBuilder = inject(FormBuilder);

  condition:boolean = false;
  countPlayer: number = 0;

  formPlayer: FormGroup = this.formBuilder.group({
    name:['', Validators.required]
  })
  
  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(){
    this.playerService.getPlayer().subscribe((data)=>{
      this.players = data;
      this.countPlayer = data.length;
    })
  }

  

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.formPlayer.reset();

  }

  register() {
  if (this.formPlayer.invalid) return;

  const objeto: PlayerModel = {
    id: 0, // O elimina esta línea si el backend lo genera automáticamente
    name: this.formPlayer.value.name
  };

  this.playerService.createPlayer(objeto).subscribe({
    next: () => {
      this.formPlayer.reset();       // limpia el formulario
      this.mostrarModal = false;     // cierra el modal
      this.loadPlayers();            // recarga la lista de jugadores
    },
    error: (err) => {
      console.error('Error al crear jugador:', err);
    }
  });
}


}
