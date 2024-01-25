import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api/api.service';
import { VehiclesService } from 'src/app/core/services/api/vehicles.service';

@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicles.page.html',
    styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {

    /**
     * Constructor de la página de vehículos.
     * @constructor
     * @param {VehiclesService} vehiclesSvc - Servicio de vehículos para realizar operaciones de obtención.
     * @param {ApiService} apiSvc - Servicio de API para obtener información del usuario.
     */
    constructor(
        public vehiclesSvc: VehiclesService,
        public apiSvc: ApiService,
    ) { }

    /**
     * Método invocado al inicializar la página.
     * Subscribe al observable del usuario y obtiene la lista de vehículos si el usuario está autenticado.
     * @method ngOnInit
     * @return {void}
     */
    ngOnInit() {
        this.apiSvc.user$.subscribe(user => {
            if (user?.id)
                this.getVehicles(user.id);
        })
    }


    /**
     * Método para obtener la lista de vehículos para un usuario específico.
     * @method getVehicles
     * @param {number} userId - ID del usuario para el cual se obtienen los vehículos.
     * @return {void}
     */
    async getVehicles(userId: number) {
        this.vehiclesSvc.getAll(userId).subscribe();
    }
}
