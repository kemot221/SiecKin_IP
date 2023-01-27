import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { HallModel } from 'src/app/models/hall.model';
import { MovieWithShowings } from 'src/app/models/movie.model';
import { ShowingModel } from 'src/app/models/showing.model';
import { CinemaService } from 'src/app/services/cinema.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  public moviesWithShowings$!: Observable<MovieWithShowings[]>;
  public halls$!: Observable<HallModel[]>;

  constructor(
    private router: Router,
    protected cinemaService: CinemaService
    ) { }

  ngOnInit(): void {
    this.moviesWithShowings$ = combineLatest([
      this.cinemaService.getMovies(),
      this.cinemaService.getShowings(),
    ]).pipe(
      map(([movies, showings]) => { 
        return movies.map(movie => {
          return {
            ...movie,
            // add hall to a showing
            showings: showings.filter(showing => showing.movie_id === movie.id).map(showing => {
              return {
                ...showing,
              }
            })
          }
        })
      }
    ));
    this.halls$ = this.cinemaService.getHalls();
    this.moviesWithShowings$.subscribe(movies => console.log(movies));
    this.halls$.subscribe(halls => console.log(halls));
  }

  public getHallName(hallId: number, halls: HallModel[]) {
    const hall = halls.find(hall => hall.id === hallId);
    return hall ? hall.tag : '';
  }

  public getTime(date: Date) {
    return new Date(date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  }

  public getDate(date: Date) {
    return new Date(date).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  public getDay(date: Date) {
    return new Date(date).toLocaleDateString('pl-PL', { weekday: 'long' });
  }

  public onShowingClick(movie: MovieWithShowings, showing: ShowingModel) {
    this.router.navigate(['tickets-selling/movies', 'showing', showing.id]);
  }
}
