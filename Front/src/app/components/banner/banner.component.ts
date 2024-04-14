import { Component, OnInit } from '@angular/core';
import { MovieApiService } from 'src/app/services/movie-api.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  bannerList: any[] = [];

  constructor ( private movieAPI: MovieApiService ) {}

  ngOnInit(): void {
    this.movieAPI.fetchBannerDetails().subscribe( result => this.bannerList = result.results );
  }
}
