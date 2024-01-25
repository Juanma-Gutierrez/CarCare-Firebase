import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthService } from "../services/api/auth.service";

/**
 * El AuthGuard implementa la interfaz CanActivate de Angular.
 * Se encarga de controlar si un usuario puede acceder a una ruta protegida o no.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    /**
 * Constructor del AuthGuard.
 * @param auth - Servicio de autenticación que proporciona métodos para verificar el estado de inicio de sesión.
 * @param router - Servicio de enrutador de Angular utilizado para navegar a otras rutas.
 */
    constructor(
        private auth: AuthService,
        private router: Router) { }

    /**
    * Método canActivate, requerido por la interfaz CanActivate.
    * Comprueba si el usuario está autenticado antes de permitir el acceso a una ruta protegida.
    * @param route - La instantánea de la ruta activada.
    * @param state - El estado actual de la ruta.
    * @returns Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
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
