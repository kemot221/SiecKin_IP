import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieModel } from 'src/app/models/movie.model';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  public movies$!: Observable<MovieModel[]>;

  constructor(
    private router: Router,
    private moviesService: MoviesService
    ) { }

  ngOnInit(): void {
    this.movies$ = this.moviesService.getMovies();
    this.movies$.subscribe((movies) => {
      console.log(movies);
    });
  }
}
