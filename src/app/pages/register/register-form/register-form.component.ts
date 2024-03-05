import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { USER_ROLE } from 'src/app/core/services/const.service';
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

    ngOnInit() { }

    onSubmit() {
        this.onsubmit.emit(this.form?.value);
    }

    hasError(controlName: string): boolean | undefined {
        return this.form?.get(controlName)?.invalid;
    }

    hasTouched(controlName: string): boolean | undefined {
        return this.form?.get(controlName)?.touched;
    }
}
