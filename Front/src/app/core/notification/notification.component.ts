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
        bottom: 20px; /* Espacement du bas pour l'élever un peu au-dessus du bord inférieur */
        left: 50%; /* Positionnement horizontal au milieu */
        transform: translateX(-50%); /* Centrage précis avec une translation négative */
        background: blue; /* Couleur de fond bleue */
        color: white; /* Texte en blanc */
        padding: 15px 30px; /* Un peu plus de padding pour agrandir le rectangle */
        border-radius: 5px; /* Coins arrondis */
        font-size: 1.2rem; /* Taille de texte augmentée */
        z-index: 1000; /* Assurez-vous que la notification passe au-dessus des autres éléments */
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2); /* Une légère ombre pour la profondeur */
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
