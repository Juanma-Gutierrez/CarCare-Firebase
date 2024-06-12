import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomePage } from './welcome.page';

/**
 * Routes configuration for the WelcomePage component.
 */
const routes: Routes = [
    {
        path: '',
        component: WelcomePage
    }
];

/**
 * NgModule for the WelcomePageRoutingModule.
 * Declares the routes for navigating to the WelcomePage component.
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WelcomePageRoutingModule { }
