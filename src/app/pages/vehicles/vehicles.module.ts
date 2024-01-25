import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { VehicleItemListComponent } from './vehicle-item-list/vehicle-item-list.component';
import { VehiclesPage } from './vehicles.page';
import { VehiclesPageRoutingModule } from './vehicles-routing.module';

@NgModule({
    imports: [
        SharedModule,
        VehiclesPageRoutingModule
    ],
    declarations: [
        VehiclesPage,
        VehicleItemListComponent
    ]
})
export class VehiclesPageModule { }
