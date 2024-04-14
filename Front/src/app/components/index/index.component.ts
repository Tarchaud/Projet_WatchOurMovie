import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  @Input() categoryName!: string;
  @Input() films!: any;

  @ViewChild('track') track!: ElementRef;

  constructor(private router: Router) { }

  currentSlideIndex = 0;

  getFilmGroups() {
    const groupSize = 4;
    return new Array(Math.ceil(this.films.length / groupSize))
        .fill(null)
        .map((_, i) => this.films.slice(i * groupSize, i * groupSize + groupSize));
  }

  moveSlide(direction: string) {
    const slidesAmount = this.getFilmGroups().length;
    const trackEl = this.track.nativeElement as HTMLElement;

    if (direction === 'prev') {
        this.currentSlideIndex = (this.currentSlideIndex - 1 + slidesAmount) % slidesAmount;
    } else {
        this.currentSlideIndex = (this.currentSlideIndex + 1) % slidesAmount;
    }
    
    const moveDistance = -this.currentSlideIndex * trackEl.clientWidth;
    trackEl.style.transform = `translateX(${moveDistance}px)`;
  }

  openFilmDetails(film: any) {
    this.router.navigate(['/movie', film.id]);
  }
}
