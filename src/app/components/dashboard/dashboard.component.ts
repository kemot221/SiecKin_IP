import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from 'src/app/models/users.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public user!: UserModel;

  constructor(
    private cookieService: CookieService,
  ) {
    this.user = JSON.parse(this.cookieService.get('user'));
  }

  ngOnInit(): void {
    
  }

}
