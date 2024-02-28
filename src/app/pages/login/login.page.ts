import { AuthService } from 'src/app/core/services/api/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/core/interfaces/User-credentials';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    constructor(
        private auth: AuthService,
        private router: Router,
    ) { }

    ngOnInit() { }

    onLogin(credentials: UserCredentials) {
        this.auth.login(credentials).subscribe({
            next: data => {
                this.router.navigate(['welcome'])
            },
            error: err => {
                console.error("Login error")
            }
        });
    }
}
