import { Routes, RouterModule } from '@angular/router';
import { ListPetComponent } from './components/list-pet/list-pet.component';
import { AddEditPetComponent } from './components/add-edit-pet/add-edit-pet.component';
import { DetailsPetComponent } from './components/details-pet/details-pet.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list-pet' },
  { path: 'list-pet', component: ListPetComponent },
  { path: 'add-pet', component: AddEditPetComponent },
  { path: 'edit-pet/:id', component: AddEditPetComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'list-pet' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule { }
