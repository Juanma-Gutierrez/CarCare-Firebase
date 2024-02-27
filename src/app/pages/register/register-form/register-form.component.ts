import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from 'src/app/core/validators/PasswordValidation';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
    userPassword?: string;
    form: FormGroup | null = null;
    @Output() onsubmit = new EventEmitter<any>();

    /**
     * Constructor del componente de formulario de registro.
     * @constructor
     * @param {FormBuilder} formBuilder - Constructor de formularios para crear instancias de FormGroup.
     */
    constructor(
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            surname: ['', [Validators.required]],
            username: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, PasswordValidation.passwordProto('password')]],
            confirm: ['', [Validators.required, PasswordValidation.passwordProto('confirm')]]
        }, { validator: [PasswordValidation.passwordMatch('password', 'confirm')] });
    }

    ngOnInit() { }

    /**
     * Método invocado al enviar el formulario de registro. Emite los datos del formulario a través del evento `onsubmit`.
     * @method onSubmit
     * @return {void}
     */
    onSubmit() {
        this.onsubmit.emit(this.form?.value);
    }

    /**
     * Verifica si un control del formulario tiene errores de validación.
     * @method hasError
     * @param {string} controlName - Nombre del control del formulario.
     * @return {boolean | undefined} - Devuelve `true` si hay errores de validación, de lo contrario, `undefined`.
     */
    hasError(controlName: string): boolean | undefined {
        return this.form?.get(controlName)?.invalid;
    }

    /**
     * Verifica si un control del formulario ha sido tocado.
     * @method hasTouched
     * @param {string} controlName - Nombre del control del formulario.
     * @return {boolean | undefined} - Devuelve `true` si el control ha sido tocado, de lo contrario, `undefined`.
     */
    hasTouched(controlName: string): boolean | undefined {
        return this.form?.get(controlName)?.touched;
    }
}
