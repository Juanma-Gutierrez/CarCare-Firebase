import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-list-item',
    templateUrl: './user-list-item.component.html',
    styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {
    @Input() user: any = null;
    public numCars = 0;
    public numMotorbikes = 0;
    public numVans = 0;
    public numTrucks = 0;

    constructor() { }

    ngOnInit() {
        for (var vehicle of this.user.vehicles) {
            switch (vehicle.category) {
                case "car": {
                    this.numCars++;
                    break;
                };
                case "motorbike": {
                    this.numMotorbikes++;
                    break;
                };
                case "van": {
                    this.numVans++;
                    break;
                };
                case "truck": {
                    this.numTrucks++;
                    break;
                }
            }
        };
    }
}
