import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentials } from 'src/app/core/interfaces/User-credentials';
import { loadLocalStorageUser, saveLocalStorageUser } from 'src/app/core/services/utils.service';

/**
 * Represents a login form component.
 * This component allows users to input their username and password to log in.
 */
@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
    @Input('username') set username(value: string) {
        this.form?.controls['username'].setValue(value);
    }
    @Output() onsubmit = new EventEmitter<UserCredentials>();
    form: FormGroup | null = null;

    constructor(
        private formBuilder: FormBuilder,
    ) {
        this.form = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    /**
     * Initializes the login form component.
     * Loads the username from local storage and sets it as the initial value of the username input field.
     */
    ngOnInit() {
        loadLocalStorageUser().then(username => {
            this.form?.controls['username'].setValue(username)
        });
    }

    /**
     * Handles form submission.
     * Emits user credentials if the form is valid.
     */
    onSubmit() {
        var userName = JSON.stringify(this.form!.value.username, null, 0).replace(/"/g, '');
        saveLocalStorageUser(userName);
        this.onsubmit.emit(this.form?.value);
        this.form?.controls['password'].setValue('');
    }
}
