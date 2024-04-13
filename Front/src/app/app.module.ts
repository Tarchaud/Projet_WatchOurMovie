import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { BannerComponent } from './pages/components/banner/banner.component';
import { FilmModalComponent } from './pages/components/film-modal/film-modal.component';
import { IndexComponent } from './pages/components/index/index.component';
import { FooterComponent } from './pages/core/footer/footer.component';
import { HeaderComponent } from './pages/core/header/header.component';
import { FilmCardComponent } from './pages/components/film-card/film-card.component';
import {MatTabsModule} from "@angular/material/tabs";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    FilmModalComponent,
    BannerComponent,
    FooterComponent,
    FilmCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTabsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
