import { AuthService } from 'src/app/core/services/api/auth.service';
import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { FirebaseService } from 'src/app/core/services/api/firebase/firebase.service';
import { User } from 'src/app/core/interfaces/User';
import { FirebaseAuthService } from 'src/app/core/services/api/firebase/firebase-auth.service';

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
        private authSvc: AuthService
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
        Preferences.set({
            key: 'userName',
            value: JSON.stringify(_data.email)
        })
        this.authSvc.register(_data).subscribe({
            next: (data) => {
                console.info("Data en registro: ", data);
            },
            error: (err) => {
                console.error("Error on register", err)
            }
        });
    }
}


