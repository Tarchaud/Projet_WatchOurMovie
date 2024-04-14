import { Component, OnInit } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { MovieApiService } from 'src/app/services/movie-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  filmSections: any = [];

  constructor(private movieApiService: MovieApiService) { }

  ngOnInit(): void {
    let sections = ["Action", "Aventure", "Comédie", "Science-Fiction", "Fantastique"];
    
    let requests = sections.map(section => 
      this.movieApiService.getMoviesByGenre(section).pipe(
        map((films: any) => ({ name: section, films: films }))
      )
    );
    
    forkJoin(requests).subscribe(results => {
      this.filmSections = results;
    });
  }
}
