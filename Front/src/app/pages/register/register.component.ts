import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private authService: AuthService
  ) { }

  onRegister() {
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (response) => {
        this.dialogRef.close(); // Fermer le modal après une inscription réussie
        // Connecter directement l'utilisateur ici si souhaité
      },
      error: (error) => {
        console.error("Erreur lors de l'inscription", error);
        // Affiche une erreur à l'utilisateur ici
      }
    });
  }
}
