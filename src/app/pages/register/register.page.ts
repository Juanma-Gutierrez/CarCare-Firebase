import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/api/auth.service';
import { saveLocalStorageUser } from 'src/app/core/services/utils.service';

/**
 * Component for the registration page.
 */
@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    private subscriptions: Subscription[] = []

    /**
     * Constructor to inject dependencies.
     * @param {AuthService} authSvc - The authentication service.
     */
    constructor(
        private authSvc: AuthService,
    ) { }

    /**
     * Lifecycle hook called after component initialization.
     */
    ngOnInit() {
    }

    /**
     * Handles the submission of the registration form.
     * @param {any} data - The form data.
     */
    onRegisterFormSubmit(data: any) {
        let _data: any = { ...data };
        delete _data.confirm;
        saveLocalStorageUser(data.email);
        this.subscriptions.push(this.authSvc.register(_data).subscribe({
            next: (data) => {
                console.info("Data en registro: ", data);
            },
            error: (err) => {
                console.error("Error on register", err);
            }
        }));
    }

    /**
     * Lifecycle hook called before component destruction.
     */
    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}


