import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesModule } from './services/services.module';
import { SharedModule } from './components/_shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IsLoggedInGuard } from './guards/isLoggedIn.guard';
import localePlPl from '@angular/common/locales/pl';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { TicketsSellingProcessComponent } from './components/tickets-selling-process/tickets-selling-process.component';

registerLocaleData(localePlPl);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MoviesListComponent,
    TicketsSellingProcessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServicesModule,
    SharedModule
  ],
  providers: [
    IsLoggedInGuard,
    { provide: LOCALE_ID, useValue: 'pl-PL'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
