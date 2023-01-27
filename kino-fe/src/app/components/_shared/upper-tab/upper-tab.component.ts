import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-upper-tab',
  templateUrl: './upper-tab.component.html',
  styleUrls: ['./upper-tab.component.scss']
})
export class UpperTabComponent implements OnInit {
  @Input() public isBackVisible: boolean = false;
  @Input() public backText!: string;
  @Input() public backLink!: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.authService.logout();
  }

  public goBack(): void {
    this.router.navigate([this.backLink]);
  }
}
