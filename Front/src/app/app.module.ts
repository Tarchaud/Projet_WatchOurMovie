import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { SearchMoviesComponent } from './components/search-movies/search-movies.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { ManageGroupsComponent } from './components/manage-groups/manage-groups.component';
import { UserPreferencesComponent } from './components/user-preferences/user-preferences.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    SearchMoviesComponent,
    MovieDetailsComponent,
    ManageGroupsComponent,
    UserPreferencesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
