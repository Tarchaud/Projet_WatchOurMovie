import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private baseurl : string = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getGroups() {
    const url = `${this.baseurl}/groups`;
    return this.http.get<any>(url, {
      headers: { Authorization: `Bearer ` + localStorage.getItem('token') }
    });
  }
}
