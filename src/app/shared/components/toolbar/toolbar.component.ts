import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/api/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/User';
import { FBUser } from 'src/app/core/services/api/firebase/interfaces/FBUser';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
    public selectedPage = "home";
    public user: User | null = null;
    @Output() languageChanged = new EventEmitter();

    /**
     * Constructor del componente de barra de herramientas.
     * @constructor
     * @param {Router} router - Servicio de enrutamiento para navegar a otras páginas.
     * @param {AuthService} authSvc - Servicio de autenticación para gestionar la autenticación del usuario.
     * @param {ApiService} api - Servicio de API para interactuar con la información del usuario.
     * @param {CustomTranslateService} translateScv - Servicio de traducción personalizado para gestionar los idiomas.
     */
    constructor(
        private router: Router,
        public authSvc: AuthService,
        public apiSvc: ApiService,
        public translateScv: CustomTranslateService,
        public localDataSvc: LocalDataService
    ) { }


    ngOnInit(): void {
        this.apiSvc.user$.subscribe(user => {
            this.user = user;
            this.selectedPage = "welcome";
        })

        this.authSvc.user$.subscribe(user => {
            this.createLocalUser(user)
            this.user = user;
            this.selectedPage = "welcome";
        })
    }

    /**
     * Navega a la página "about-me".
     * @method navToAbout
     * @return {void}
     */
    navToAbout() {
        this.selectedPage = "aboutMe"
        this.router.navigate(['/about-me']);
    }

    /**
     * Navega a la página "home".
     * @method navToHome
     * @return {void}
     */
    navToHome() {
        this.selectedPage = "home"
        this.router.navigate(['/home']);
    }

    /**
     * Navega a la página "vehicles".
     * @method navToVehicles
     * @return {void}
     */
    navToVehicles() {
        this.selectedPage = "vehicles"
        this.router.navigate(['/vehicles']);
    }

    /**
     * Navega a la página "providers".
     * @method navToProviders
     * @return {void}
     */
    navToProviders() {
        this.selectedPage = "providers"
        this.router.navigate(['/providers']);
    }

    /**
     * Manejador de eventos para el clic en el botón de cierre de sesión.
     * Realiza el cierre de sesión y redirige al usuario a la página de inicio de sesión.
     * @method logoutClicked
     * @return {void}
     */
    logoutClicked() {
        this.authSvc.logout();
        /*
        this.authSvc.logout().subscribe(_ => {
            this.router.navigate(['/login']);
        });
        */
    }

    /**
     * Manejador de eventos para el cambio de idioma.
     * Emite un evento indicando que el idioma ha cambiado.
     * @method onLanguageChanged
     * @param {Event} event - Objeto de evento de cambio de idioma.
     * @return {void}
     */
    onLanguageChanged(event: Event) {
        this.languageChanged.emit(event);
    }


    createLocalUser(user: any) {
        if (user) {
            this.localDataSvc.updateUser(user);
        }
    }
}