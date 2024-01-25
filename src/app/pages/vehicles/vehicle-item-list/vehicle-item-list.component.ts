import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/core/interfaces/Vehicle';

@Component({
    selector: 'app-vehicle-item-list',
    templateUrl: './vehicle-item-list.component.html',
    styleUrls: ['./vehicle-item-list.component.scss'],
})
export class VehicleItemListComponent implements OnInit {
    @Input() vehicle?: Vehicle

    constructor() { }

    ngOnInit(): void { }
}
