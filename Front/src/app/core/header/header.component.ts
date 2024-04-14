import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieApiService } from 'src/app/services/movie-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userName: string = 'Dorian';
  searchResults: any[] = [];

  constructor ( private movieAPI: MovieApiService, private router: Router ) {}

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
    this.router.navigate(['/movie', movieId]); // Naviguez vers la page du film
  }
}
