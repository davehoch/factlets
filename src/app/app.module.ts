import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FactletComponent } from './factlet/factlet.component';
import { FactletListComponent } from './factlet-list/factlet-list.component';
import { SavedSearchComponent } from './saved-search/saved-search.component';
import { SavedSearchListComponent } from './saved-search-list/saved-search-list.component';
import { MainPageComponent } from './main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FactletComponent,
    FactletListComponent,
    SavedSearchComponent,
    SavedSearchListComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
