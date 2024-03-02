import { Component, OnInit } from '@angular/core';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/User';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.page.html',
    styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

    private user: User | null = null;

    constructor(
        private localDataSvc: LocalDataService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.localDataSvc.user$.subscribe(user => {
            if (user)
                this.router.navigate(['/home']);
        });
    }
}

