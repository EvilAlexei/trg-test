import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'table', pathMatch: 'full'},
  {path: 'map', loadComponent: () => import('./components/map/map.component').then(mod => mod.MapComponent)},
  {path: 'table', loadComponent: () => import('./components/table/table.component').then(mod => mod.TableComponent)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
