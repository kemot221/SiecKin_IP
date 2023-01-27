import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { HallModel } from '../../models/hall.model';
import { MovieModel } from '../../models/movie.model';
import { ShowingModel, ShowingSeats } from '../../models/showing.model';
import { CinemaService } from '../../services/cinema.service';

@Component({
  selector: 'app-tickets-selling-process',
  templateUrl: './tickets-selling-process.component.html',
  styleUrls: ['./tickets-selling-process.component.scss']
})
export class TicketsSellingProcessComponent implements OnInit {
  showingId!: number;
  showing$: Observable<ShowingModel> = new Observable();
  hall$: Observable<HallModel> = new Observable();
  movie$: Observable<MovieModel> = new Observable();
  seatsTable: ShowingSeats[] = [];

  constructor(
    private router: Router,
    protected cinemaService: CinemaService
  ) { }

  ngOnInit(): void {
    this.router.url.split('/').forEach((urlPart, index) => {
      if (urlPart === 'showing') {
        this.showingId = +this.router.url.split('/')[index + 1];
      }
    });

    this.cinemaService.getShowing(this.showingId).subscribe(
      showing => {
        this.showing$ = this.cinemaService.getShowing(showing.id);
        this.hall$ = this.cinemaService.getHall(showing.hall_id);
        this.movie$ = this.cinemaService.getMovie(showing.movie_id);
        this.showing$.subscribe(showing => console.log(showing));
      }
    );
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

  public getRowLetter(rowNumber: number) {
    return String.fromCharCode(65 + rowNumber);
  }

  public checkIfTaken(showing: ShowingModel ,rowNumber: number, seatNumber: number) {
    return showing.taken_seats.find(seat => seat.row === rowNumber && seat.seat === seatNumber)?.is_taken;
  }

  public checkIfPicked(rowNumber: number, seatNumber: number) {
    return this.seatsTable.find(seat => seat.row === rowNumber && seat.seat === seatNumber)?.is_taken;
  }

  public addSeat(rowNumber: number, seatNumber: number) {
    const seat: ShowingSeats = {
      row: rowNumber,
      seat: seatNumber,
      is_taken: true
    }
    this.seatsTable.push(seat);
  }

  public removeSeat(rowNumber: number, seatNumber: number, event: Event) {
    // remove seat from seatsTable but watch out for row
    this.seatsTable = this.seatsTable.filter(seat => !(seat.row === rowNumber && seat.seat === seatNumber));
    event.stopPropagation();
  }

  public goBack() {
    this.router.navigate(['/tickets-selling/movies']);
  }

  public sellTickets() {
    this.cinemaService.sellTickets(this.showingId, this.seatsTable);
  }
}
