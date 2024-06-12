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
    icon: string = "";

    constructor(
        private utilSvc: UtilsService,
        private translateSvc: CustomTranslateService,
    ) { }

    /**
     * Lifecycle hook called after component initialization.
     * Retrieves the image URL and category information of the vehicle.
     */
    ngOnInit() {
        this.getImageFromVehicle();
        this.getCategoryFromVehicle();
    }

    /**
     * Retrieves the category information of the vehicle.
     * Sets the category and icon based on the vehicle's category.
     */
    getCategoryFromVehicle() {
        if (this.vehicle != null) {
            this.category = "vehicles.vehicleItem." + this.vehicle.category;
            this.icon = "assets/icon/icon-" + this.vehicle.category + ".png";
        }
    }

    /**
     * Retrieves the image URL of the vehicle.
     * Sets the URL to display the vehicle's image.
     */
    getImageFromVehicle() {
        this.utilSvc.getURLFromVehicle(this.vehicle!!).then(url => this.url = url);
    }

    /**
     * Gets the placeholder category for the vehicle.
     * @returns The placeholder category image URL.
     */
    getPlaceholderCategory(): string {
        return this.utilSvc.getPlaceholderCategory(this.vehicle!!);
    }
}
