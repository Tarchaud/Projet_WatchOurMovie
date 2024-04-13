import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userName: string = 'Dorian';

  constructor(public dialog: MatDialog) {}

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
      console.log('The dialog was closed');
    });
  }
}
