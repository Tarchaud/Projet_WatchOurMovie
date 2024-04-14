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

  filmSectionsLike: any = [];
  filmSectionsWatch: any = [];

  constructor(private movieApiService: MovieApiService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

    if(!this.authService.currentUserValue) {
      this.router.navigate(['/home']);
      return;
    }

    this.authService.getLikedMovies(this.authService.currentUserValue.id).subscribe(results => {
      console.log(results)
      this.filmSectionsLike = results;
    });
    
    this.authService.getWatchedMovies(this.authService.currentUserValue.id).subscribe(results => {
      console.log(results)
      this.filmSectionsWatch = results;
    });
  }

}
