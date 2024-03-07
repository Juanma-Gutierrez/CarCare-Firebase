import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthService } from "../services/api/auth.service";

/**
 * Injectable service that guards routes to only allow access to authenticated users.
 * @param auth The AuthService instance for authentication.
 * @param router The Router instance for navigation.
 */

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    /**
     * Constructs an instance of the class.
     * @param auth The authentication service used for user login, registration, and other related operations.
     * @param router The Angular router service for navigation.
     */
    constructor(
        private auth: AuthService,
        private router: Router
    ) { }

    /**
     * Determines whether the route can be activated.
     * @param route The route to be activated.
     * @param state The current router state.
     * @return An Observable<boolean | UrlTree>, a Promise<boolean | UrlTree>, or a boolean | UrlTree representing whether the route can be activated.
     */
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.auth.isLogged$.pipe(tap(logged => {
            if (!logged)
                this.router.navigate(['/login']);
        }));
    }
}
