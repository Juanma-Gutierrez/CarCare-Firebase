import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProvidersPage } from './providers.page';

/**
 * Contains routing configuration for the ProvidersPage module.
 */
const routes: Routes = [
    {
        path: '',
        component: ProvidersPage
    }
];

/**
 * Represents the routing module for the ProvidersPage module.
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProvidersPageRoutingModule { }
