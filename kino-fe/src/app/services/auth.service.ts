import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { LoginModel } from "../models/login.model";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class AuthService {
    apiURL = 'http://localhost:3000';

    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private cookieService: CookieService
    ) { 
    }

    public get isLoggedIn(): boolean {
        if (!Boolean(this.cookieService.get('isLoggedIn'))) {
            this.cookieService.set('isLoggedIn', 'false');
            return false;
        }
        if (JSON.parse(this.cookieService.get('isLoggedIn')) === true) {
            return true;
        }
        return false;
    }

    public login(user: LoginModel) {
        this.httpClient.post(this.apiURL + '/login', {
            user
            }).subscribe((response: any) => {
                this.cookieService.set('isLoggedIn', 'true');
                this.cookieService.set('user', JSON.stringify(response));
                this.router.navigate(['/dashboard']);
            }
        );
    }

    public logout() {
        this.cookieService.set('isLoggedIn', 'false');
        this.cookieService.delete('user');
        this.router.navigate(['/login']);
    }
}