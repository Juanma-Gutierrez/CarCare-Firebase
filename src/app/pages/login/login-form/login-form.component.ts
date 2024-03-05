import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentials } from 'src/app/core/interfaces/User-credentials';
import { loadLocalStorageUser, saveLocalStorageUser } from 'src/app/core/services/utils.service';

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

    ngOnInit() {
        loadLocalStorageUser().then(username => {
            this.form?.controls['username'].setValue(username)
        });
    }


    onSubmit() {
        var userName = JSON.stringify(this.form!.value.username, null, 0).replace(/"/g, '');
        saveLocalStorageUser(userName);
        this.onsubmit.emit(this.form?.value);
        this.form?.controls['password'].setValue('');
    }
}
