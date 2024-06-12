import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VehiclesPage } from './vehicles.page';

/**
 * Routes for the VehiclesPage module.
 */
const routes: Routes = [
    {
        path: '',
        component: VehiclesPage
    }
];

/**
 * NgModule that declares the routing configuration for the VehiclesPage module.
 */
@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule],
})
export class VehiclesPageRoutingModule { }
