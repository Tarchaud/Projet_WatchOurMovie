import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieApiService } from 'src/app/services/movie-api.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  bannerList: any[] = [];

  constructor ( private movieAPI: MovieApiService, private router: Router ) {}

  ngOnInit(): void {
    this.movieAPI.fetchBannerDetails().subscribe( result => this.bannerList = result.results );
  }

  openFilmDetails(film: any) {
    this.router.navigate(['/movie', film.id]);
  }
}
