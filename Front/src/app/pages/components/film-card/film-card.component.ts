import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent {

  @Input() model: any;
  @Input() isMovie!: boolean;

  constructor () {}
}
