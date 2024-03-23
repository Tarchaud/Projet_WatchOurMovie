import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  private baseUrl = 'http://127.0.0.1:8000/films/';

  constructor(private http: HttpClient) { }

  getFilms(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
