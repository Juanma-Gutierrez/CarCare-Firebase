import { ApiService } from './core/services/api/api.service';
import { AuthService } from './core/services/api/auth.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { CustomTranslateService } from './core/services/custom-translate.service';
import { Router } from '@angular/router';
import { User } from './core/interfaces/User';
import { LocalDataService } from './core/services/api/local-data.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    private isFirstTime = true;
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
        private localDataSvc: LocalDataService,
        private router: Router,
        // private apiSvc: ApiService,
        public translate: CustomTranslateService,
    ) {
        this.translate.use(this.lang);
/*         this.localDataSvc.user$.subscribe(user => {
            if (user)
                this.router.navigate(["/welcome"])
            else
                this.router.navigate(["/login"])
        }) */


     this.localDataSvc.user$.subscribe(user => {
                if (user)
                    this.router.navigate(["/welcome"])
                else if (!this.isFirstTime) {
                    this.router.navigate(["/login"])
                } else {
                    this.isFirstTime = false;
                    this.router.navigate(["/welcome"])
                }
            }) 
    }

    /**
     * Maneja el evento de cambio de idioma.
     * @method languageChanged
     * @param {CustomEvent} event - Evento de cambio de idioma.
     */
    languageChanged(event: CustomEvent) {
        const lang = event.detail.value
        this.lang = lang;
        this.translate.use(this.lang);
    }

}
