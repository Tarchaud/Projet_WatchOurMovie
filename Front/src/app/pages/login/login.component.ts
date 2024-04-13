// login.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  currentUserSubject: any;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService
  ) { }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (user: any) => { // Maintenant 'user' est utilisé et typé
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.dialogRef.close();
        // Si tu as besoin d'informer d'autres composants de la connexion, fais-le ici.
      },
      error: (error: any) => {
        console.error('Erreur lors de la connexion', error);
        // Gère ton erreur ici, par exemple en affichant un message à l'utilisateur.
      }
    });
  }
}
