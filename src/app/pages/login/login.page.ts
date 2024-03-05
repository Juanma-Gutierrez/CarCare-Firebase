import { AuthService } from 'src/app/core/services/api/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/core/interfaces/User-credentials';
import { Subscription } from 'rxjs';

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

    ngOnInit() { }

    onLogin(credentials: UserCredentials) {
        this.subscriptions.push(this.auth.login(credentials).subscribe({
            next: data => {
                console.info("data: ",data);
                this.router.navigate(['welcome']);
            },
            error: err => {
                console.error("Login error", err);
            }
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
