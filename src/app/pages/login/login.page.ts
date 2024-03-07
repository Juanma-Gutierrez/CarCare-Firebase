import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserCredentials } from 'src/app/core/interfaces/User-credentials';
import { AuthService } from 'src/app/core/services/api/auth.service';

/**
 * Represents a login page component.
 * This component provides a user interface for logging in.
 */
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = []

    constructor(
        private auth: AuthService,
        private router: Router,
    ) { }

    /**
     * Initializes the login page component.
     */
    ngOnInit() { }

    /**
     * Logs in the user using the provided credentials.
     * @param {UserCredentials} credentials The user credentials for logging in.
     * @returns {void}
     */
    onLogin(credentials: UserCredentials) {
        this.subscriptions.push(this.auth.login(credentials).subscribe({
            next: data => {
                console.info("data: ", data);
                this.router.navigate(['welcome']);
            },
            error: err => {
                console.error("Login error", err);
            }
        }));
    }

    /**
     * Unsubscribes from all subscriptions to prevent memory leaks when the component is destroyed.
     * @returns {void}
     */
    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
