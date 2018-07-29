import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FactletListComponent } from './factlet-list/factlet-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/factletList', pathMatch: 'full' },
  { path: 'factletList', component: FactletListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
