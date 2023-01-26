import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SERVER_URL } from "../consts/const";
import { MovieModel } from "../models/movie.model";
import { ShowingModel } from "../models/showing.model";

@Injectable()
export class MoviesService {
  constructor(private http: HttpClient) {}

  public getMovies() : Observable<MovieModel[]> {
    return this.http.get<MovieModel[]>(SERVER_URL + '/movies');
  }
  
  public getShowings() : Observable<ShowingModel[]> {
    return this.http.get<ShowingModel[]>(SERVER_URL + '/showings');
  }
}