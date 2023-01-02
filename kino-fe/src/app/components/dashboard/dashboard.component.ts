import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Role } from 'src/app/enums/roles.enums';
import { UserModel } from 'src/app/models/users.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public user!: UserModel;
  public userRole = Role;

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.user = this.userService.user;
    console.log(this.user);
  }
}
