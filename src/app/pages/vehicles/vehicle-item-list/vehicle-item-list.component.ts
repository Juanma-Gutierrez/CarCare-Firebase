import { Component, Input, OnInit } from '@angular/core';
import { FBVehiclePreview } from 'src/app/core/services/api/firebase/interfaces/FBUser';

@Component({
    selector: 'app-vehicle-item-list',
    templateUrl: './vehicle-item-list.component.html',
    styleUrls: ['./vehicle-item-list.component.scss'],
})
export class VehicleItemListComponent implements OnInit{
    @Input() vehicle?: FBVehiclePreview
    public category: string = ""

    constructor(
    ) { }
    ngOnInit(): void {
        this.category
    }

}
