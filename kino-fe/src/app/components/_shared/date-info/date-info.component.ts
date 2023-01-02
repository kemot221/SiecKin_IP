import { Component, OnInit } from '@angular/core';
import { map, Observable, pipe, shareReplay, timer } from 'rxjs';

@Component({
  selector: 'app-date-info',
  templateUrl: './date-info.component.html',
  styleUrls: ['./date-info.component.scss']
})
export class DateInfoComponent implements OnInit {
  public time$!: Observable<Date>;

  constructor() { }

  ngOnInit(): void {
    this.time$ = timer(0, 1000).pipe(
      map(() => new Date()),
      shareReplay(1)
    );
  }
}
