// create services.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';
import { CinemaService } from './cinema.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    declarations: [],
    providers: [
        CookieService,
        AuthService,
        UserService,
        CinemaService
    ]
})
export class ServicesModule { }
