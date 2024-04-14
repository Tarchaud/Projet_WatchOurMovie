import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, forkJoin } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MovieApiService } from 'src/app/services/movie-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  filmSectionsLike: any = [];
  filmSectionsWatch: any = [];

  constructor(private movieApiService: MovieApiService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!).id : null;

    if(!userId) {
      this.router.navigate(['/home']);
      return;
    }

    this.authService.getLikedMovies(userId).subscribe(results => {
      let moviesInfo = results.map((movie: any) => this.movieApiService.getMovieDetails(movie.film_tmdb_id));
      forkJoin(moviesInfo).subscribe(results => {
        this.filmSectionsLike = results;
      });
    });
    
    this.authService.getWatchedMovies(userId).subscribe(results => {
      let moviesInfo = results.map((movie: any) => this.movieApiService.getMovieDetails(movie.film_tmdb_id));
      forkJoin(moviesInfo).subscribe(results => {
        this.filmSectionsWatch = results;
      });
    });
  }

}
