import { AuthService } from 'src/app/core/services/api/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/core/services/utils.service';
import { UserCredentials } from 'src/app/core/interfaces/User-credentials';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    /**
     * Constructor del componente.
     * @constructor
     * @param {AuthService} auth - Servicio de autenticación para gestionar el estado de la autenticación.
     * @param {Router} router - Instancia del enrutador de Angular para navegar entre las páginas.
     * @param {UtilsService} utilSvc - Servicio interno para manejar la interfaz de usuario y mostrar mensajes.
     */
    constructor(
        private auth: AuthService,
        private router: Router,
        private utilSvc: UtilsService,
    ) { }

    ngOnInit() { }

    /**
    * Llama al servicio de autenticación para realizar el inicio de sesión con
    * las credenciales pasadas y navega a home si el login es exitoso.
    * @param {UserCredentials} credentials - Las credenciales del usuario.
    */
    onLogin(credentials: UserCredentials) {
        this.auth.login(credentials).subscribe({
            next: data => {
                this.router.navigate(['welcome'])
            },
            error: err => {
                this.utilSvc.showToast("Error en los datos introducidos", "danger", "top")
            }
        });
    }
}
