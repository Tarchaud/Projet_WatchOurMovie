import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, forkJoin } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MovieApiService } from 'src/app/services/movie-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  filmSections: any = [];

  constructor(private movieApiService: MovieApiService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

    if(!this.authService.currentUserValue) {
      this.router.navigate(['/home']);
      return;
    }
    
    let requests = [
      this.movieApiService.getLikedMovies(this.authService.currentUserValue.id).pipe(
        map((films: any) => ({ name: 'Films aimés', films: films.results }))
      ),
      this.movieApiService.getWatchedMovies(this.authService.currentUserValue.id).pipe(
        map((films: any) => ({ name: 'Films vus', films: films.results }))
      )
    ];
    
    forkJoin(requests).subscribe(results => {
      this.filmSections = results;
    });
  }

}
