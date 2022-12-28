import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesModule } from './services/services.module';
import { SharedModule } from './components/_shared/shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IsLoggedInGuard } from './guards/isLoggedIn.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServicesModule,
    SharedModule
  ],
  providers: [
    IsLoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
