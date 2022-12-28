import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";
import { UserModel } from "../models/users.model";
import { Role } from "../enums/roles.enums";

@Injectable()
export class UserService {
    apiURL = 'http://localhost:3000';

    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private cookieService: CookieService
    ) { 
    }

    public get user(): UserModel {
        return JSON.parse(this.cookieService.get('user'));
    }
}