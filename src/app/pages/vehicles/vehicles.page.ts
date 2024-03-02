import { Component, Input, OnInit } from '@angular/core';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';

@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicles.page.html',
    styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {

    constructor(
        public localDataSvc: LocalDataService,
    ) { }

    ngOnInit() { this.localDataSvc.user$.subscribe() }
}
