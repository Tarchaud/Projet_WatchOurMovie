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
    let sections = [{ name: "Action", id: 28 }, { name: "Aventure", id: 12 }, { name: "Comédie", id: 35 }, { name: "Romance", id: 10749 }, { name: "Science-Fiction", id: 878 }];
    
    let requests = sections.map(section => 
      this.movieApiService.getMoviesByGenre(section.id).pipe(
        map((films: any) => ({ name: section.name, films: films.results }))
      )
    );
    
    forkJoin(requests).subscribe(results => {
      this.filmSections = results;
    });
  }
}
