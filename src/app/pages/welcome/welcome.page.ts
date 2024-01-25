import { ApiService } from 'src/app/core/services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/User';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.page.html',
    styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

    private user: User | null = null;

    /**
     * Constructor de la página de bienvenida.
     * @constructor
     * @param {ApiService} apiSvc - Servicio de API para obtener información del usuario.
     * @param {Router} router - Enrutador de Angular para la navegación.
     */
    constructor(
        private apiSvc: ApiService,
        private router: Router,
    ) { }

    /**
     * Método invocado al inicializar la página.
     * Obtiene el usuario autenticado y navega a la página principal después de 3 segundos.
     * @method ngOnInit
     * @return {void}
     */
    ngOnInit() {
        this.user = this.apiSvc.getUser();
        this.apiSvc.user$.subscribe();
        setTimeout(() => {
            this.router.navigate(['/home']);
        }, 3000);
    }
}

