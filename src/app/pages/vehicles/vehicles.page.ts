import { Component, Input, OnInit } from '@angular/core';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicles.page.html',
    styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {

    constructor(
        public localDataSvc: LocalDataService,
        private utilsSvc: UtilsService,
    ) { }

    ngOnInit() { this.localDataSvc.user$.subscribe() }

    share() {
        console.log("entra en share");
        const vehiclesList = this.localDataSvc.getUser().value?.vehicles;
        console.log(vehiclesList);
        if (vehiclesList) {
            this.utilsSvc.shareVehicles(vehiclesList);
        }
    }
}
