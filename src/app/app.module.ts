import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListPetComponent } from './components/list-pet/list-pet.component';
import { AddEditPetComponent } from './components/add-edit-pet/add-edit-pet.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutesModule } from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    ListPetComponent,
    AddEditPetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
