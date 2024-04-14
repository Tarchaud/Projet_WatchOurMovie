import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GroupService {
  private apiUrl: string = 'http://localhost:8000/groups';

  constructor(private http: HttpClient) {}

  getGroupsByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  createGroup(groupName: string, userId: string): Observable<any> {
    const group = {
      name: groupName,
      user_ids: [userId]
    };
    return this.http.post(this.apiUrl, group, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }
}
