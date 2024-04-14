import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject = new Subject<any>();

  constructor() {}

  getNotification(): Observable<any> {
    return this.notificationSubject.asObservable();
  }

  showNotification(message: string) {
    this.notificationSubject.next({ message: message });
  }
}
