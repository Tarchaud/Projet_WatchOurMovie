import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  registerError: boolean = false;
  emailError: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private authService: AuthService,
    private translationService: TranslationService
  ) { }

  onRegister() {
    if (!this.email.includes('@')) {
      this.emailError = true;
      return;
    }
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (response) => {
        this.registerError = false;
        this.dialogRef.close();
      },
      error: (error) => {
        this.registerError = true;
        console.error("Error during registration", error);
      }
    });
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}
