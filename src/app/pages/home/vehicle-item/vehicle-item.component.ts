import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VehiclePreview } from 'src/app/core/interfaces/User';
import { UtilsService } from 'src/app/core/services/utils.service';

/**
 * Component for displaying a vehicle item.
 */
@Component({
    selector: 'app-vehicle',
    templateUrl: './vehicle-item.component.html',
    styleUrls: ['./vehicle-item.component.scss'],
})
export class VehicleItemComponent implements OnInit {
    @Input() vehicle?: VehiclePreview;
    @Output() onVehicleItemClicked: EventEmitter<void> = new EventEmitter<void>();
    @Output() onEditVehicleClicked: EventEmitter<void> = new EventEmitter<void>();
    url: string = "";

    constructor(
        private utilSvc: UtilsService
    ) { }

    /**
     * Initializes the VehicleItemComponent.
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


    /**
     * Event handler for when the edit vehicle button is clicked.
     * @param {any} event - The click event.
     */
    onEditVehicleClick(event: any) {
        this.onEditVehicleClicked.emit();
        event.stopPropagation();
    }

    /**
     * Event handler for when the vehicle item is clicked.
     * @param {any} event - The click event.
     */
    onVehicleItemClick(event: any) {
        this.onVehicleItemClicked.emit();
        event.stopPropagation();
    }
}
