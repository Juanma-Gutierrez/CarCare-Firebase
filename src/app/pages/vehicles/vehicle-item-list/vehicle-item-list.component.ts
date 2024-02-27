import { Component, Input, OnInit } from '@angular/core';
import { VehiclePreview } from 'src/app/core/interfaces/User';

@Component({
    selector: 'app-vehicle-item-list',
    templateUrl: './vehicle-item-list.component.html',
    styleUrls: ['./vehicle-item-list.component.scss'],
})
export class VehicleItemListComponent implements OnInit {
    @Input() vehicle: VehiclePreview | null = null

    constructor(
    ) { }
    ngOnInit(): void { }

}
