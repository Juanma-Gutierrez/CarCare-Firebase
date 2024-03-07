import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/User';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';

/**
 * Component for displaying the welcome page.
 */
@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.page.html',
    styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

    private user: User | null = null;

    /**
     * Constructor to inject dependencies.
     * @param localDataSvc Instance of LocalDataService.
     * @param router Instance of Router.
     */
    constructor(
        private localDataSvc: LocalDataService,
        private router: Router,
    ) { }

    /**
     * Lifecycle hook called after component initialization.
     */
    ngOnInit() {
        this.localDataSvc.user$.subscribe(user => {
            if (user)
                this.router.navigate(['/home']);
        });
    }
}

