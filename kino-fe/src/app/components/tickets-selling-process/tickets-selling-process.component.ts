import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShowingSeats } from '../../models/showing.model';
import { CinemaService } from '../../services/cinema.service';

@Component({
  selector: 'app-tickets-selling-process',
  templateUrl: './tickets-selling-process.component.html',
  styleUrls: ['./tickets-selling-process.component.scss']
})
export class TicketsSellingProcessComponent implements OnInit {
  showingId!: number;
  hallId!: number;
  movieId!: number;
  showing$: Observable<any> = new Observable();
  hall$: Observable<any> = new Observable();
  movie$: Observable<any> = new Observable();
  hallWithID$: Observable<any> = new Observable();
  showingWithID$: Observable<any> = new Observable();
  seatsTable: ShowingSeats[] = [];
  seatsTableForDB: ShowingSeats[] = [];
  wasShown: boolean = false;

  constructor(
    private router: Router,
    protected cinemaService: CinemaService
  ) { }

  ngOnInit(): void {
    // get showing id, movie id and hall id from url
    this.showingId = Number(this.router.url.split('/')[4]);
    this.movieId = Number(this.router.url.split('/')[6]);
    this.hallId = Number(this.router.url.split('/')[8]);

    this.showing$ = this.cinemaService.getShowing(this.showingId);
    this.hall$ = this.cinemaService.getHall(this.hallId);
    this.movie$ = this.cinemaService.getMovie(this.movieId);

    this.showingWithID$ = this.cinemaService.getShowingWithID(this.showingId);
    this.hallWithID$ = this.cinemaService.getHallWithID(this.hallId);
    
    // this.cinemaService.getShowing(this.showingId).subscribe(showing => console.log(showing));
    // this.cinemaService.getHall(this.hallId).subscribe(hall => console.log(hall));
    // this.cinemaService.getMovie(this.movieId).subscribe(movie => console.log(movie));

    // this.cinemaService.getShowingWithID(this.showingId).subscribe(showing => console.log(showing));
    // this.cinemaService.getHallWithID(this.hallId).subscribe(hall => console.log(hall));
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

  public checkIfPicked(rowNumber: number, seatNumber: number) {
    return this.seatsTable.find(seat => seat.row === rowNumber && seat.seat === seatNumber)?.is_taken;
  }

  public addSeat(rowNumber: number, seatNumber: number) {
    const seat: ShowingSeats = {
      row: rowNumber,
      seat: seatNumber,
      is_taken: true
    }
    const seatForDB: ShowingSeats = {
      row: rowNumber + 1,
      seat: seatNumber + 1,
      is_taken: true,
    }
    this.seatsTable.push(seat);
    this.seatsTableForDB.push(seatForDB);
  }

  public removeSeat(rowNumber: number, seatNumber: number, event: Event) {
    // remove seat from seatsTable but watch out for row
    this.seatsTable = this.seatsTable.filter(seat => !(seat.row === rowNumber && seat.seat === seatNumber));
    this.seatsTableForDB = this.seatsTableForDB.filter(seatForDB => !(seatForDB.row === rowNumber + 1 && seatForDB.seat === seatNumber + 1));
    // stop propagation to prevent adding seat
    event.stopPropagation();
  }

  public goBack() {
    this.router.navigate(['/tickets-selling/movies']);
  }

  public sellTickets() {
    this.cinemaService.sellTickets(this.showingId, this.seatsTableForDB);
  }
}
