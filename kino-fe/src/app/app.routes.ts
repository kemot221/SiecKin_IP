import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { MoviesListComponent } from "./components/movies-list/movies-list.component";
import { IsLoggedInGuard } from "./guards/isLoggedIn.guard";
import { TicketsSellingProcessComponent } from "./components/tickets-selling-process/tickets-selling-process.component";

type PathMatch = "full" | "prefix" | undefined;

export class AppRoutes {
    public static getRoutes() {
        return [
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' as PathMatch },
            { path: 'dashboard', component: DashboardComponent, canActivate: [IsLoggedInGuard] },
            { path: 'login', component: LoginComponent },
            { path: 'tickets-selling/movies', component: MoviesListComponent, canActivate: [IsLoggedInGuard] },
            { path: 'tickets-selling/movies/showing/:showing_id', component: TicketsSellingProcessComponent }
        ]
    }
}