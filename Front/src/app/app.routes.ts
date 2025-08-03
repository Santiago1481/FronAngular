import { Routes } from '@angular/router';
import { InicioComponent } from './features/inicio/inicio.component';
import { SalaEsperaComponent } from './features/sala-espera/sala-espera.component';
import { CartaComponent } from './shared/components/carta/carta.component';
import { JuegoComponent } from './features/juego/juego.component';
import { PodioComponent } from './features/podio/podio.component';

export const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: 'inicio', component: InicioComponent },
    { path: 'sala', component: SalaEsperaComponent },
    { path: 'juego',component: JuegoComponent},
    { path: 'podio', component: PodioComponent },
    { path:'card',component:CartaComponent}
];
