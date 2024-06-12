import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutMePage } from './about-me.page';

/**
 * Routes for navigating to the About Me page.
 */
const routes: Routes = [
    {
        path: '',
        component: AboutMePage
    }
];

/**
 * Module for routing to the About Me page.
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AboutMePageRoutingModule { }
