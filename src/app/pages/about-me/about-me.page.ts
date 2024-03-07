import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Page component for displaying information about the user.
 */
@Component({
    selector: 'app-about-me',
    templateUrl: './about-me.page.html',
    styleUrls: ['./about-me.page.scss'],
})
export class AboutMePage {

    constructor(
        private router: Router
    ) { }

    navToHome() {
        this.router.navigate(["/home"]);
    }
}
