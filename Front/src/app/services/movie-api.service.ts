import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieApiService {
  private baseurl : string = 'http://localhost:8000';

  constructor( private http : HttpClient ) { }

  getMoviesByGenre(genre: number): Observable<any> {
    return this.http.get(`${this.baseurl}/movies/genre/`, {
      params: {
        language: "fr-FR",
        with_genres: genre
      }
    });
  }

  getMovieDetails(movieId: string): Observable<any> {
    return this.http.get(`${this.baseurl}/movies/${movieId}/details/`, {
      params: {
        language: "fr-FR",
        append_to_response : "videos"
      }
    });
  }

  searchMovies(query: string) {
    return this.http.get(`${this.baseurl}/movies/search/`, {
      params: {
        title: query,
        language: "fr-FR"
      }
    });
  }

  getRecommendedMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/movies/trending/`, {
      params: {
        language: "fr-FR"
      }
    });
  }

  fetchBannerDetails () : Observable<any> {
    return this.http.get( this.baseurl + "/movies/trending/", {
      params: {
        language: "fr-FR"
      }
    });
  }

  getLikedMovies(userId: string): Observable<any> {
    return this.http.get(`${this.baseurl}/${userId}/liked_films/`, {
      params: {
        language: "fr-FR"
      }
    });
  }

  getWatchedMovies(userId: string): Observable<any> {
    return this.http.get(`${this.baseurl}/${userId}/seen_films/`, {
      params: {
        language: "fr-FR"
      }
    });
  }
}