import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { SearchMoviesComponent } from './components/search-movies/search-movies.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { ManageGroupsComponent } from './components/manage-groups/manage-groups.component';
import { UserPreferencesComponent } from './components/user-preferences/user-preferences.component';

const routes: Routes = [
  { path: 'login', component: AuthenticationComponent },
  { path: 'search', component: SearchMoviesComponent},
  { path: 'movie/:id', component: MovieDetailsComponent},
  { path: 'groups', component: ManageGroupsComponent },
  { path: 'preferences', component: UserPreferencesComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
