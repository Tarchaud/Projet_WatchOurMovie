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

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private movieAPI: MovieApiService,
    private router: Router
  ) {
    this.authService.currentUser.subscribe(user => {
      this.userName = user ? user.username : null;
    });
  }

  onSearchKeyUp(event: any) {
    const query = event.target.value;
    if (query.length > 1) {
      this.movieAPI.searchMovies(query).subscribe((response: any) => {
        this.searchResults = response.results.slice(0, 5);
      });
    } else {
      this.searchResults = [];
    }
  }

  onSelectMovie(movieId: number) {
    this.searchResults = [];
    this.router.navigate(['/movie', movieId]);
  }

  openLoginModal() {
    const dialogRef = this.dialog.open(LoginComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (this.authService.currentUserValue) {
        this.userName = this.authService.currentUserValue.username;
      } else {
        this.userName = null;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.userName = null;
  }

  getCurrentLanguage(): string {
    return localStorage.getItem('language') || 'en';
  }

  onFlagClick(): void {
    const newLang = this.getCurrentLanguage() === 'en' ? 'fr' : 'en';
    localStorage.setItem('language', newLang);
    window.location.reload(); 
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
