import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-upper-tab',
  templateUrl: './upper-tab.component.html',
  styleUrls: ['./upper-tab.component.scss']
})
export class UpperTabComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.authService.logout();
  }
}
