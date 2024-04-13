import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieApiService {
  private readonly apiKey : string = '2febc056129f0371dc33718504831302';
  private baseurl : string = 'https://api.themoviedb.org/3';

  constructor( private http : HttpClient ) { }

  fetchBannerDetails () : Observable<any> {
    return this.http.get( this.baseurl + "/trending/all/week?api_key=" + this.apiKey );
  }
 
  fetchTrendingMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/trending/movie/day?api_key=${this.apiKey}`);
  }
 
  fetchActionMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apiKey}&with_genres=28`);
  }

  fetchAdventureMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apiKey}&with_genres=12`);
  }

  fetchAnimationMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apiKey}&with_genres=16`);
  }

  fetchComedyMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apiKey}&with_genres=35`);
  }

  fetchDocumentaryMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apiKey}&with_genres=99`);
  }

  fetchSiFiMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apiKey}&with_genres=878`);
  }

  fetchThrillerMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apiKey}&with_genres=53`);
  }
}