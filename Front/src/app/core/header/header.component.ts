import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MovieApiService } from 'src/app/services/movie-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userName: string | null = null;
  searchResults: any[] = [];

  constructor(public dialog: MatDialog, private authService: AuthService, private movieAPI: MovieApiService, private router: Router) {
    this.authService.currentUser.subscribe(user => {
      this.userName = user ? user.username : null;
    });
  }

  onSearchKeyUp(event: any) {
    const query = event.target.value;
    if (query.length > 1) {
      this.movieAPI.searchMovies(query).subscribe((response: any) => {
        console.log(response.results)
        this.searchResults = response.results.slice(0, 5);
      });
    } else {
      this.searchResults = [];
    }
  }

  onSelectMovie(movieId: number) {
    this.searchResults = [];
    this.router.navigate(['/movie', movieId]); // Naviguez vers la page du film
  }

  openLoginModal() {
    const dialogRef = this.dialog.open(LoginComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.authService.currentUserValue) {
        this.userName = this.authService.currentUserValue.username;
      } else {
        this.userName = null;
      }
      console.log('The dialog was closed');
    });
  }

  logout() {
    this.authService.logout();
    this.userName = null;
  }

  getCurrentLanguage() {
    return localStorage.getItem('language');
  }

  onFlagClick() {
    localStorage.setItem('language', localStorage.getItem('language') === 'en' ? 'fr' : 'en');
  }
}
