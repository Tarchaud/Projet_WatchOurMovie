import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') ?? 'null')
    );
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`http://localhost:8000/auth/login`, { username, password })
      .pipe(map(response => {
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        localStorage.setItem('token', response.access_token);
        this.currentUserSubject.next(response.user);
        return response;
      }));
  }

  register(username: string, email: string, password: string) {
    return this.http.post<any>(`/auth/signup`, { username, email, password })
      .pipe(map(response => {
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
}
