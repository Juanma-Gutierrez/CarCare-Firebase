import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';

/**
 * Routing module for the home page.
 * Specifies the routes for navigating to the home page.
 */
const routes: Routes = [
    {
        path: '',
        component: HomePage,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomePageRoutingModule { }
