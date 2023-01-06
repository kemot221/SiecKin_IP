import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { LoginModel } from "../models/login.model";
import { CookieService } from "ngx-cookie-service";
import { ResetPasswordModel } from "../models/resetPassword.model";
import { SERVER_URL } from "../consts/const";

@Injectable()
export class AuthService {
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
        this.httpClient.post(SERVER_URL + '/login', {
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
        window.location.reload();
    }

    public resetPassword(resetData: ResetPasswordModel) {
        this.httpClient.post(SERVER_URL + '/reset-password', {
            resetData
            }).subscribe();
    }
}