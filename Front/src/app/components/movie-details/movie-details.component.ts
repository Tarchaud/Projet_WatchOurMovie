import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieApiService } from 'src/app/services/movie-api.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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

  constructor(private movieAPI: MovieApiService, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) {
    this.id = "";
    this.route.params.subscribe(async params => {
      this.id = params['id'];
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
    console.log('Like button clicked for movie:', movieId);
  }

  toggleSeen(movieId: number) {
      console.log('Seen button clicked for movie:', movieId);
  }

  getSafeUrl(trailerKey : string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${trailerKey}?si=M5T27dKv_Q6niZtj`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
