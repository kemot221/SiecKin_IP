import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  remindPasswordForm!: FormGroup;
  passwordPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/;
  remindPasswordMode: boolean = false;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32), Validators.pattern(this.passwordPattern)]),
    });

    this.remindPasswordForm = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32), Validators.pattern(this.passwordPattern)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32), Validators.pattern(this.passwordPattern)])
    });
  }

  public login() {
    this.authService.login(this.loginForm.value);
  }

  public resetPassword() {
    this.authService.resetPassword(this.remindPasswordForm.value);
    this.toggleMode();
  }

  public toggleMode() {
    this.remindPasswordMode = !this.remindPasswordMode;
    this.remindPasswordForm.reset();
  }

  public validate(form: FormGroup): boolean {
    if(!form.valid) {
      return true;
    }
    if(form.value.password !== form.value.confirmPassword) {
      return true;
    }
    return false;
  }
}
