import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentials } from 'src/app/core/interfaces/User-credentials';
import { UtilsService } from 'src/app/core/services/utils.service';

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
        private utilsSvc: UtilsService,
    ) {
        this.form = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        this.utilsSvc.loadLocalStorageUser().then(username => {
            this.form?.controls['username'].setValue(username)
        });
    }


    onSubmit() {
        var userName = JSON.stringify(this.form!.value.username)
        console.log("username en onSubmit:", userName)
        this.utilsSvc.saveLocalStorageUser(userName)
        this.onsubmit.emit(this.form?.value);
        this.form?.controls['password'].setValue('');
    }
}
