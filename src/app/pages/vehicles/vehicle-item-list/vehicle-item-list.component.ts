import { Component, Input, OnInit } from '@angular/core';
import { VehiclePreview } from 'src/app/core/interfaces/User';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';
import { UtilsService } from 'src/app/core/services/utils.service';

/**
 * Component to display a single vehicle item in a list.
 */
@Component({
    selector: 'app-vehicle-item-list',
    templateUrl: './vehicle-item-list.component.html',
    styleUrls: ['./vehicle-item-list.component.scss'],
})
export class VehicleItemListComponent implements OnInit {
    @Input() vehicle: VehiclePreview | null = null;
    url: string = "";
    category: string = "";
    icon:string = "";

    constructor(
        private utilSvc: UtilsService,
        private translateSvc: CustomTranslateService,
    ) { }

    /**
     * Lifecycle hook called after component initialization.
     */
    ngOnInit() {
        this.getImageFromVehicle();
        this.getCategoryFromVehicle();
    }
    getCategoryFromVehicle() {
        if (this.vehicle != null) {
            this.category = "vehicles.vehicleItem." + this.vehicle.category;
            this.icon = "assets/icon/icon-" + this.vehicle.category + ".png";
        }
    }

    getImageFromVehicle() {
        this.utilSvc.getURLFromVehicle(this.vehicle!!).then(url => this.url = url);
    }

    getPlaceholderCategory(): string {
        return this.utilSvc.getPlaceholderCategory(this.vehicle!!);
    }

}
