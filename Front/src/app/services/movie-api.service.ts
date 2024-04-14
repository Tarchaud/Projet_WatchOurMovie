import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { TranslationService } from './translation.service';

@Injectable({ providedIn: 'root' })
export class MovieApiService {
  private baseurl : string = 'http://localhost:8000';

  constructor( private http : HttpClient, private translationService: TranslationService ) { }

  getMoviesByGenre(genre: number): Observable<any> {
    return this.http.get(`${this.baseurl}/movies/genre/`, {
      params: {
        language: this.translationService.currentLanguage,
        with_genres: genre
      }
    });
  }

  getMovieDetails(movieId: string): Observable<any> {
    return this.http.get(`${this.baseurl}/movies/${movieId}/details/`, {
      params: {
        language: this.translationService.currentLanguage,
        append_to_response : "videos"
      }
    });
  }

  searchMovies(query: string) {
    return this.http.get(`${this.baseurl}/movies/search/`, {
      params: {
        title: query,
        language: this.translationService.currentLanguage
      }
    });
  }

  getRecommendedMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/movies/trending/`, {
      params: {
        language: this.translationService.currentLanguage
      }
    });
  }

  fetchBannerDetails () : Observable<any> {
    return this.http.get( this.baseurl + "/movies/trending/", {
      params: {
        language: this.translationService.currentLanguage
      }
    });
  }
}