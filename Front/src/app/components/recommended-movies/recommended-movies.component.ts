import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MovieApiService } from 'src/app/services/movie-api.service';

@Component({
  selector: 'app-recommended-movies',
  templateUrl: './recommended-movies.component.html',
  styleUrls: ['./recommended-movies.component.scss']
})
export class RecommendedMoviesComponent {
  recommendedMovies: any[] = [];

  constructor(private movieApiService: MovieApiService, private router: Router, private authService: AuthService) {}

  ngOnInit() {
      this.movieApiService.getRecommendedMovies().subscribe(result => {
        console.log(result);
        if(result.length === 0) {
          this.movieApiService.getTrendingMovies().subscribe((result: any) => {
            this.recommendedMovies = result.results;
          });
          return;
        }
        if(!this.authService.currentUserValue) {
          this.recommendedMovies = result.results;
          return;
        }
        let moviesInfo = result.map((movie: any) => this.movieApiService.getMovieDetails(movie.film_tmdb_id));
        forkJoin(moviesInfo).subscribe((films: any) => {
          const genreCounts = films.reduce((acc: any, film: any) => {
            film.genres.forEach((genre: any) => {
              if (acc[genre.id]) {
                acc[genre.id].count += 1;
              } else {
                acc[genre.id] = { genre: genre, count: 1 };
              }
            });
            return acc;
          }, {});
  
          const topThreeGenres = Object.values(genreCounts).sort((a: any, b: any) => b.count - a.count).slice(0, Object.values(genreCounts).length >= 3 ? 3 : Object.values(genreCounts).length);
          
          topThreeGenres.map((genre: any) => {
            this.movieApiService.getMoviesByGenre(genre.genre.id).subscribe((result: any) => {
              if(result) {
                this.recommendedMovies.push(...result.results.slice(0, 12).filter((film: any) => !films.find((f: any) => f.id === film.id)));
                this.recommendedMovies = [...this.recommendedMovies];
              }
            });
          });
        });
      });
  }

  openFilmDetails(film: any) {
    this.router.navigate(['/movie', film.id]);
  }
}
