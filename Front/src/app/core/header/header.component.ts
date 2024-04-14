import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userName: string | null = null;

  constructor(public dialog: MatDialog, private authService: AuthService) {
    this.authService.currentUser.subscribe(user => {
      this.userName = user ? user.username : null;
    });
  }

  onSearchKeyUp(event: any) {
    console.log(event.target.value);
  }

  onSearch() {
    console.log('Recherche effectuée');
  }

  openLoginModal() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '340px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.authService.currentUserValue) {
        this.userName = this.authService.currentUserValue.username;
      } else {
        this.userName = null;
      }
      console.log('The dialog was closed');
    });
  }

  logout() {
    this.authService.logout();
    this.userName = null;
  }
}
