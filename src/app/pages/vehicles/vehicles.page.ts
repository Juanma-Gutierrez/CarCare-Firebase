import { Component, OnInit } from '@angular/core';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';
import { UtilsService } from 'src/app/core/services/utils.service';

/**
 * Component for displaying vehicles.
 */
@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicles.page.html',
    styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {

    /**
     * Constructor to inject dependencies.
     * @param localDataSvc Instance of LocalDataService.
     * @param utilsSvc Instance of UtilsService.
     */
    constructor(
        public localDataSvc: LocalDataService,
        private utilsSvc: UtilsService,
    ) { }

    /**
     * Lifecycle hook called after component initialization.
     */
    ngOnInit() { this.localDataSvc.user$.subscribe() }

    /**
     * Shares the list of vehicles.
     */
    share() {
        const vehiclesList = this.localDataSvc.getUser().value?.vehicles;
        if (vehiclesList) {
            this.utilsSvc.shareVehicles(vehiclesList);
        }
    }
}
