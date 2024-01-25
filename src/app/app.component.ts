import { ApiService } from './core/services/api/api.service';
import { AuthService } from './core/services/api/auth.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { CustomTranslateService } from './core/services/custom-translate.service';
import { Router } from '@angular/router';
import { User } from './core/interfaces/User';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    protected _user = new BehaviorSubject<User | undefined>(undefined);
    public user$ = this._user.asObservable();
    lang: string = "es";

    /**
     * Constructor del componente.
     * @constructor
     * @param {AuthService} authSvc - Servicio de autenticación.
     * @param {Router} router - Router de Angular.
     * @param {ApiService} apiSvc - Servicio de API.
     * @param {CustomTranslateService} translate - Servicio de traducción personalizado.
     */
    constructor(
        public authSvc: AuthService,
        private router: Router,
        private apiSvc: ApiService,
        public translate: CustomTranslateService,
    ) {
        this.translate.use(this.lang);
        // Se suscribe al observable isLogged$ del servicio AuthService.
        this.authSvc.isLogged$.subscribe(logged => {
            if (logged) {
                // Si el usuario está autenticado, navega a home.
                this.authSvc.me().subscribe(data => {
                    apiSvc.updateUser(data);
                    this.router.navigate(['/home']);
                });
            }
            else
                // Si el usuario no está autenticado, navega a welcome.
                this.router.navigate(['/welcome']);
        });
    }

    /**
     * Maneja el evento de cambio de idioma.
     * @method languageChanged
     * @param {CustomEvent} event - Evento de cambio de idioma.
     */
    languageChanged(event: CustomEvent) {
        const lang = event.detail.value
        console.log(lang)
        this.lang = lang;
        this.translate.use(this.lang);
    }

}
