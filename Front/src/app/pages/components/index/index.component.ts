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

  carouselOptions = {
    items: 3,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    nav: true,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      }
    }
  };

  hoverEffectOn(film: any) {
    film.isHovered = true;
  }

  hoverEffectOff(film: any) {
      film.isHovered = false;
  }

  selectedFilm: any = null;
  showModal: boolean = false;

  openModal(film: any) {
      this.selectedFilm = film;
      this.showModal = true;
  }

  closeModal() {
      this.showModal = false;
  }

  toggleLike() {
      if (this.selectedFilm) {
          this.selectedFilm.isLiked = !this.selectedFilm.isLiked;
      }
  }
}
