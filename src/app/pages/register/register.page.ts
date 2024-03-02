import { AuthService } from 'src/app/core/services/api/auth.service';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    constructor(
        private authSvc: AuthService,
        private utilsSvc: UtilsService,
    ) { }

    ngOnInit() {
    }

    onRegisterFormSubmit(data: any) {
        let _data: any = { ...data };
        delete _data.confirm;
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


