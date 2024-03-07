import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { VehicleItemListComponent } from './vehicle-item-list/vehicle-item-list.component';
import { VehiclesPageRoutingModule } from './vehicles-routing.module';
import { VehiclesPage } from './vehicles.page';

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
