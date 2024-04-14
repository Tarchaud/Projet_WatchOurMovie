import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { IndexComponent } from './components/index/index.component';
import { HeaderComponent } from './core/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { BannerComponent } from './components/banner/banner.component';
import { FilmModalComponent } from './components/film-modal/film-modal.component';
import { FooterComponent } from './core/footer/footer.component';
import { FilmCardComponent } from './components/film-card/film-card.component';
import { MatTabsModule} from "@angular/material/tabs";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieComponent } from './pages/movie/movie.component';
import { HomeComponent } from './pages/home/home.component';
import { RecommendedMoviesComponent } from './components/recommended-movies/recommended-movies.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotificationComponent } from './core/notification/notification.component';
import { GroupComponent } from './pages/group/group/group.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    FilmModalComponent,
    BannerComponent,
    FooterComponent,
    FilmCardComponent,
    MovieDetailsComponent,
    MovieComponent,
    HomeComponent,
    RecommendedMoviesComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NotificationComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTabsModule,
    MatDialogModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
