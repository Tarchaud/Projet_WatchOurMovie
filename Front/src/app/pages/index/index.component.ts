import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  @Input() categoryName!: string;
  @Input() films!: any;

  constructor() { }

  hoverEffectOn(film: any) {
    film.isHovered = true;
  }

  hoverEffectOff(film: any) {
      film.isHovered = false;
  }
}
