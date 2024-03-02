import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VehiclePreview } from 'src/app/core/interfaces/User';

@Component({
    selector: 'app-vehicle',
    templateUrl: './vehicle-item.component.html',
    styleUrls: ['./vehicle-item.component.scss'],
})
export class VehicleItemComponent implements OnInit {
    @Input() vehicle?: VehiclePreview;
    @Output() onVehicleItemClicked: EventEmitter<void> = new EventEmitter<void>();
    @Output() onEditVehicleClicked: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    ngOnInit() { }

    onEditVehicleClick(event: any) {
        this.onEditVehicleClicked.emit();
        event.stopPropagation();
    }

    onVehicleItemClick(event: any) {
        this.onVehicleItemClicked.emit();
        event.stopPropagation();
    }
}
