import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { SERVER_URL } from "../consts/const";
import { HallModel } from "../models/hall.model";
import { MovieModel } from "../models/movie.model";
import { ShowingModel, ShowingSeats } from "../models/showing.model";

@Injectable()
export class CinemaService {
  constructor(
    private http: HttpClient,
    private router: Router,
    ) {}

  public getMovies() : Observable<MovieModel[]> {
    return this.http.get<MovieModel[]>(SERVER_URL + '/movies');
  }
  
  public getShowings() : Observable<ShowingModel[]> {
    return this.http.get<ShowingModel[]>(SERVER_URL + '/showings');
  }

  public getHalls() : Observable<HallModel[]> {
    return this.http.get<HallModel[]>(SERVER_URL + '/halls');
  }

  public getMovie(id: number) : Observable<MovieModel> {
    return this.http.get<MovieModel>(SERVER_URL + '/movies/' + id);
  }

  public getShowing(id: number) : Observable<ShowingModel> {
    return this.http.get<ShowingModel>(SERVER_URL + '/showings/' + id);
  }

  public getHall(id: number) : Observable<HallModel> {
    return this.http.get<HallModel>(SERVER_URL + '/halls/' + id);
  }

  public sellTickets(showingId: number, pickedSeats: ShowingSeats[]) {
    return this.http.post(SERVER_URL + '/showings/', {
      showingId,
      pickedSeats
    }).subscribe((response: any) => {
      console.log(response);
      this.router.navigate(['/tickets-selling/movies'])
    });
  }
}