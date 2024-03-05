import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/api/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/User';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
    public selectedPage = "home";
    public user: User | null = null;
    @Output() languageChanged = new EventEmitter();

    constructor(
        private router: Router,
        public authSvc: AuthService,
        public apiSvc: ApiService,
        public translateScv: CustomTranslateService,
        public localDataSvc: LocalDataService
    ) { }

    ngOnInit(): void {
        this.localDataSvc.user$.subscribe(user => {
            this.user = user;
            this.selectedPage = "home";
        })
    }

    navToAbout() {
        this.selectedPage = "aboutMe";
        this.router.navigate(['/about-me']);
    }

    navToHome() {
        this.selectedPage = "home";
        this.router.navigate(['/home']);
    }

    navToVehicles() {
        this.selectedPage = "vehicles";
        this.router.navigate(['/vehicles']);
    }

    navToProviders() {
        this.selectedPage = "providers";
        this.router.navigate(['/providers']);
    }

    navToAdmin() {
        this.selectedPage = "admin";
        this.router.navigate(['/admin']);
    }

    logoutClicked() {
        this.authSvc.logout();
    }

    onLanguageChanged(event: Event) {
        this.languageChanged.emit(event);
    }
}