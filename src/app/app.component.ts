import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';
import { CustomTranslateService } from './core/services/custom-translate.service';
import { User } from './core/interfaces/User';
import { LocalDataService } from './core/services/api/local-data.service';
import { Router } from '@angular/router';

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


    languageChanged(event: CustomEvent) {
        const lang = event.detail.value
        this.lang = lang;
        this.translate.use(this.lang);
    }
}
