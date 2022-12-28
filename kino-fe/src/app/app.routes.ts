import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { IsLoggedInGuard } from "./guards/isLoggedIn.guard";

type PathMatch = "full" | "prefix" | undefined;

export class AppRoutes {
    public static getRoutes() {
        return [
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' as PathMatch },
            { path: 'dashboard', component: DashboardComponent, canActivate: [IsLoggedInGuard] },
            { path: 'login', component: LoginComponent },
        ]
    }
}