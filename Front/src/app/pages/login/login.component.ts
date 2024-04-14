import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Erreur lors de la connexion', error);
      }
    });
  }

  openRegister() {
    this.dialogRef.close();
    this.dialog.open(RegisterComponent, {
      width: '340px'
    });
  }
}
