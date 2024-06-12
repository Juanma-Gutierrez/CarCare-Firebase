import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPage } from './login.page';

/**
 * Routing module for the login page.
 * This module defines routes for the login page and specifies
 * that the LoginPage component should be loaded when the
 * root route is accessed.
 */
const routes: Routes = [
    {
        path: '',
        component: LoginPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LoginPageRoutingModule { }
