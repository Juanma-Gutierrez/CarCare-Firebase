import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/User';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/api/auth.service';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';

/**
 * Component representing the toolbar.
 */
@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
    public selectedPage = "home";
    public user: User | null = null;
    @Output() languageChanged = new EventEmitter();

    /**
     * Constructor to inject dependencies.
     * @param router Instance of Router.
     * @param authSvc Instance of AuthService.
     * @param apiSvc Instance of ApiService.
     * @param translateScv Instance of CustomTranslateService.
     * @param localDataSvc Instance of LocalDataService.
     */
    constructor(
        private router: Router,
        public authSvc: AuthService,
        public apiSvc: ApiService,
        public translateScv: CustomTranslateService,
        public localDataSvc: LocalDataService
    ) { }

    /**
     * Lifecycle hook called after component initialization.
     */
    ngOnInit(): void {
        this.localDataSvc.user$.subscribe(user => {
            this.user = user;
            this.selectedPage = "home";
        })
    }

    /**
     * Navigates to the About page.
     */
    navToAbout() {
        this.selectedPage = "aboutMe";
        this.router.navigate(['/about-me']);
    }

    /**
     * Navigates to the Home page.
     */
    navToHome() {
        this.selectedPage = "home";
        this.router.navigate(['/home']);
    }

    /**
     * Navigates to the Vehicles page.
     */
    navToVehicles() {
        this.selectedPage = "vehicles";
        this.router.navigate(['/vehicles']);
    }

    /**
     * Navigates to the Providers page.
     */
    navToProviders() {
        this.selectedPage = "providers";
        this.router.navigate(['/providers']);
    }

    /**
     * Navigates to the Admin page.
     */
    navToAdmin() {
        this.selectedPage = "admin";
        this.router.navigate(['/admin']);
    }

    /**
     * Handles the logout action.
     */
    logoutClicked() {
        this.authSvc.logout();
    }

    /**
     * Handles the language change event.
     * @param event The event object.
     */
    onLanguageChanged(event: Event) {
        this.languageChanged.emit(event);
    }
}