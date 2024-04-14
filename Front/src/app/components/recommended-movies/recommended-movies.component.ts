import { Component } from '@angular/core';
import { MovieApiService } from 'src/app/services/movie-api.service';

@Component({
  selector: 'app-recommended-movies',
  templateUrl: './recommended-movies.component.html',
  styleUrls: ['./recommended-movies.component.scss']
})
export class RecommendedMoviesComponent {
  recommendedMovies: any[] = [];

  constructor(private movieApiService: MovieApiService) {}

  ngOnInit() {
      this.movieApiService.getRecommendedMovies().subscribe(movies => {
          this.recommendedMovies = movies;
      });
  }
}
