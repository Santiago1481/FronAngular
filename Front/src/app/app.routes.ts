import { Routes } from '@angular/router';
import { InicioComponent } from './features/inicio/inicio.component';
import { SalaEsperaComponent } from './features/sala-espera/sala-espera.component';

export const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: 'inicio', component: InicioComponent },
    { path: 'sala', component: SalaEsperaComponent }
];
