import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FactletComponent } from './factlet/factlet.component';
import { FactletListComponent } from './factlet-list/factlet-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FactletComponent,
    FactletListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
