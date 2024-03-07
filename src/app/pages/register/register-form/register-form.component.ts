import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { USER_ROLE } from 'src/app/core/services/const.service';
import { PasswordValidation } from 'src/app/core/validators/PasswordValidation';

/**
 * Component for the registration form.
 */
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
     * Constructor to initialize the form.
     * @param {FormBuilder} formBuilder - The form builder service.
     */
    constructor(
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            confirm: ['', [Validators.required, PasswordValidation.passwordProto('confirm')]],
            email: ['', [Validators.required, Validators.email]],
            name: ['', [Validators.required]],
            password: ['', [Validators.required, PasswordValidation.passwordProto('password')]],
            role: [USER_ROLE],
            surname: ['', [Validators.required]],
            username: ['', [Validators.required]],
            created: [new Date().toISOString()],
        }, { validator: [PasswordValidation.passwordMatch('password', 'confirm')] });
    }

    /**
     * Lifecycle hook called after component initialization.
     */
    ngOnInit() { }

    /**
     * Emits the form data on submission.
     */
    onSubmit() {
        this.onsubmit.emit(this.form?.value);
    }

    /**
     * Checks if a form control has errors.
     * @param {string} controlName - The name of the control.
     * @returns {boolean | undefined} - Indicates if the control has errors.
     */
    hasError(controlName: string): boolean | undefined {
        return this.form?.get(controlName)?.invalid;
    }

    /**
     * Checks if a form control has been touched.
     * @param {string} controlName - The name of the control.
     * @returns {boolean | undefined} - Indicates if the control has been touched.
     */
    hasTouched(controlName: string): boolean | undefined {
        return this.form?.get(controlName)?.touched;
    }
}
