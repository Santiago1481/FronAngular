import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-jugador',
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-jugador.component.html',
  styleUrl: './crear-jugador.component.css'
})
export class CrearJugadorComponent {
  jugadores: { nombre: string, avatar: string }[] = [];
  mostrarModal = false;
  nuevoNombre = '';

  obtenerAvatarAleatorio(): string {
    const imagenes = [
      'assets/avatares/1.jpg',
      'assets/avatares/2.jpg',
      'assets/avatares/3.jpg',
      'assets/avatares/4.jpg',
      'assets/avatares/5.jpg'
    ];
    const aleatorio = Math.floor(Math.random() * imagenes.length);
    return imagenes[aleatorio];
  }

  agregarJugador() {
    if (this.nuevoNombre.trim()) {
      this.jugadores.push({
        nombre: this.nuevoNombre,
        avatar: this.obtenerAvatarAleatorio()
      });
      this.nuevoNombre = '';
      this.mostrarModal = false;
    }
  }

  eliminarJugador(index: number) {
    this.jugadores.splice(index, 1);
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevoNombre = '';
  }
}
