import { Component, Input, OnInit } from '@angular/core';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';

@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicles.page.html',
    styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {

    /**
     * Constructor de la página de vehículos.
     * @constructor
     * @param {ApiService} apiSvc - Servicio de API para obtener información del usuario.
     */
    constructor(
        public localDataSvc: LocalDataService,
    ) { }

    /**
     * Método invocado al inicializar la página.
     * Subscribe al observable del usuario y obtiene la lista de vehículos si el usuario está autenticado.
     * @method ngOnInit
     * @return {void}
     */
    ngOnInit() { this.localDataSvc.user$.subscribe() }
}
