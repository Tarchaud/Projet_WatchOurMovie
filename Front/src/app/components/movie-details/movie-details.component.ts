import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieApiService } from 'src/app/services/movie-api.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {

  film: any;
  id!: string;
  trailer_url ?: SafeResourceUrl;
  url_created = false

  constructor(private movieAPI: MovieApiService, private authService: AuthService, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer, private notificationService: NotificationService) {
    this.id = "";
    this.route.params.subscribe(async params => {
      this.id = params['id'];
      this.url_created = false;
      this.trailer_url = "";
      this.movieAPI.getMovieDetails(this.id).subscribe(result => {
        this.film = result;
        const trailer = result.videos.results.find((video :any) => video.type === 'Trailer' && video.site === 'YouTube');
        if (trailer) {
          this.trailer_url = this.getSafeUrl(trailer.key)
          this.url_created = true
        }
      });
    });
  }

  toggleLike(movieId: number) {
    const userId = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!).id : null;
    if(userId === null) {
      return;
    }
    this.authService.getLikedMovies(userId).subscribe(result => {
      console.log(result.filter((mv: any) => mv.film_tmdb_id === movieId).length);
      this.authService.toggleLike(userId, movieId, result.filter((mv: any) => mv.film_tmdb_id === movieId).length === 0).subscribe(result => {
        this.notificationService.showNotification('Film marqué comme ' + (result.liked ? "" : "non") + ' favori !');
      });
    });
  }

  toggleSeen(movieId: number) {
    const userId = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!).id : null;
    if(userId === null) {
      return;
    }
    this.authService.getWatchedMovies(userId).subscribe(result => {
      this.authService.toggleSeen(userId, movieId, result.filter((mv: any) => mv.film_tmdb_id === movieId).length === 0).subscribe(result => {
        this.notificationService.showNotification('Film marqué comme ' + (result.seen ? "" : "non") + ' vu !');
      });
    });
  }

  getSafeUrl(trailerKey : string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${trailerKey}?si=M5T27dKv_Q6niZtj`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
