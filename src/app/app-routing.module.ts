import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent} from './vistas/inicio/inicio.component';
import { EquipoComponent } from './equipo/equipo.component';


const routes: Routes = [
  { path: '', redirectTo:'inicio' ,pathMatch:'full'},
  { path: 'inicio', component:InicioComponent},
  { path: 'equipo/:summonerName', component: EquipoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [InicioComponent]
