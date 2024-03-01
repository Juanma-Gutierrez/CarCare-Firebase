import { AuthService } from 'src/app/core/services/api/auth.service';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    /**
     * Constructor de la página de registro.
     * @constructor
     * @param {AuthService} authSvc - Servicio de autenticación para realizar operaciones de registro.
     */
    constructor(
        private authSvc: AuthService,
        private utilsSvc: UtilsService,
    ) { }

    ngOnInit() {
    }

    /**
     * Método invocado al enviar el formulario de registro.
     * Realiza el registro del usuario y almacena el nombre de usuario en las preferencias.
     * @method onRegisterFormSubmit
     * @param {any} data - Datos del formulario de registro.
     * @return {void}
     */
    onRegisterFormSubmit(data: any) {
        let _data: any = { ...data };
        delete _data.confirm;
        console.log("cl."," registerform:", "onRegisterFormSubmit:",data.email)
        this.utilsSvc.saveLocalStorageUser(data.email);
        this.authSvc.register(_data).subscribe({
            next: (data) => {
                console.info("Data en registro: ", data);
            },
            error: (err) => {
                console.error("Error on register", err);
            }
        });
    }
}


