import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './core/interfaces/User';
import { LocalDataService } from './core/services/api/local-data.service';
import { CustomTranslateService } from './core/services/custom-translate.service';

/**
 * The root component of the application.
 *
 * This component handles user authentication state, language preferences, and initial navigation.
 */
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    private isFirstTime = true;
    protected _user = new BehaviorSubject<User | undefined>(undefined);
    public user$ = this._user.asObservable();
    lang: string = "es";


    constructor(
        private localDataSvc: LocalDataService,
        private router: Router,
        public translate: CustomTranslateService,
    ) {
        this.translate.use(this.lang);
        this.localDataSvc.user$.subscribe(user => {
            if (user)
                this.router.navigate(["/welcome"])
            else if (!this.isFirstTime) {
                this.router.navigate(["/login"])
            } else {
                this.isFirstTime = false;
                this.router.navigate(["/welcome"])
            }
        })
    }

    /**
     * Handles language changes emitted by a child component.
     *
     * @param event A CustomEvent object containing the new language value.
     */
    languageChanged(event: CustomEvent) {
        const lang = event.detail.value
        this.lang = lang;
        this.translate.use(this.lang);
    }
}
