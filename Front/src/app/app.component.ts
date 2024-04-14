import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Upload System';

  constructor() { }

  ngOnInit(): void {
      if(!localStorage.getItem('language')) {
        localStorage.setItem('language', 'en');
      }
  }
}
