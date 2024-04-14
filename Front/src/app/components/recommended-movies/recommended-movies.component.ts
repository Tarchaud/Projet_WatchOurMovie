import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieApiService } from 'src/app/services/movie-api.service';

@Component({
  selector: 'app-recommended-movies',
  templateUrl: './recommended-movies.component.html',
  styleUrls: ['./recommended-movies.component.scss']
})
export class RecommendedMoviesComponent {
  recommendedMovies: any[] = [];

  constructor(private movieApiService: MovieApiService, private router: Router) {}

  ngOnInit() {
      this.movieApiService.getRecommendedMovies().subscribe(result => {
        console.log(result.results);
          this.recommendedMovies = result.results;
      });
  }

  openFilmDetails(film: any) {
    this.router.navigate(['/movie', film.id]);
  }
}
