import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  template: `
    <div *ngIf="message" class="notification">
      {{ message }}
    </div>
  `,
  styles: [`
    .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: blue;
        color: white;
        padding: 15px 30px;
        border-radius: 5px;
        font-size: 1.2rem;
        z-index: 1000;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
      }
      
      @keyframes fadeOut {
        to {
          opacity: 0;
          visibility: hidden;
        }
      }
  `]
})
export class NotificationComponent implements OnInit, OnDestroy {
  message!: string;
  private subscription!: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.subscription = this.notificationService.getNotification().subscribe(notification => {
      this.message = notification.message;
      setTimeout(() => this.message = '', 3000);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
