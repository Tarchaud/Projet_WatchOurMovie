import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieApiService } from 'src/app/services/movie-api.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {

  film: any;
  id!: string;

  constructor(private movieAPI: MovieApiService, private route: ActivatedRoute, private router: Router) {
    this.id = "";
    this.route.params.subscribe(async params => {
      this.id = params['id'];
      this.movieAPI.getMovieDetails(this.id).subscribe(result => {
        this.film = result;
      });
    });
  }

  toggleLike(movieId: number) {
    console.log('Like button clicked for movie:', movieId);
  }

  toggleSeen(movieId: number) {
      console.log('Seen button clicked for movie:', movieId);
  }
}
