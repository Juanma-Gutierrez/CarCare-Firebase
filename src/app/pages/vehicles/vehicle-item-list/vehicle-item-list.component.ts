import { Component, Input, OnInit } from '@angular/core';
import { VehiclePreview } from 'src/app/core/interfaces/User';
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
    @Input() vehicle: VehiclePreview | null = null
    url: string = ""

    constructor(
        private utilSvc: UtilsService
    ) { }

    /**
     * Lifecycle hook called after component initialization.
     */
    ngOnInit() {
        this.getImageFromVehicle()
    }

    getImageFromVehicle() {
        this.utilSvc.getURLFromVehicle(this.vehicle!!).then(url => this.url = url)
    }

    getPlaceholderCategory(): string {
        return this.utilSvc.getPlaceholderCategory(this.vehicle!!)
    }

}
