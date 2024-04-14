import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieApiService } from './movie-api.service';

interface User {
  username: string;
  email: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private baseurl : string = 'http://localhost:8000';

  constructor(private http: HttpClient ) {
    const user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!) : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`http://localhost:8000/auth/login`, { username, password }).pipe(
      map(response => {
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        localStorage.setItem('token', response.access_token);
        this.currentUserSubject.next(response.user);
        return response;
      }));
  }

  register(username: string, email: string, password: string) {
    return this.http.post<any>(`http://localhost:8000/auth/signup`, { username, email, password }).pipe(
      map(response => {
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        localStorage.setItem('token', response.access_token);
        this.currentUserSubject.next(response.user);
        return response;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getLikedMovies(userId: string) {
    const url = `${this.baseurl}/user_films/${userId}/liked_films/`;
    return this.http.get<any>(url, {
      headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
    });
  }

  getWatchedMovies(userId: string) {
    const url = `${this.baseurl}/user_films/${userId}/seen_films/`;
    return this.http.get<any>(url, {
      headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
    });
  }

  toggleLike(userId: string, movieId: number, like: boolean) {
    const url = `${this.baseurl}/user_films/${userId}/films/`;
    const filmData = {
      user_id: userId,
      film_tmdb_id: movieId,
      liked: like
    };

    console.log(filmData);
    
    return this.http.post<any>(url, filmData, {
      headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
    });
  }

  toggleSeen(userId: string, movieId: number, seen: boolean) {
    const url = `${this.baseurl}/user_films/${userId}/films/`;
    const filmData = {
      user_id: userId,
      film_tmdb_id: movieId,
      seen: seen
    };
    
    return this.http.post<any>(url, filmData, {
      headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
    });
  }
}
