import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { MappingService } from './mapping.service';
import { PaginatedVehicles, Vehicle } from '../../interfaces/Vehicle';
import { environment } from 'src/environments/environment';

/**
 * Interfaz para operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en vehículos.
 */
interface CrudVehicles {
    getAll(ownerId: number): Observable<PaginatedVehicles>;
    addVehicle(vehicle: Vehicle): Observable<Vehicle>;
    updateVehicle(vehicle: Vehicle): Observable<Vehicle>;
    deleteVehicle(vehicle: Vehicle): Observable<Vehicle>;
}

@Injectable({
    providedIn: 'root'
})
export class VehiclesService implements CrudVehicles {
    private _vehicles: BehaviorSubject<PaginatedVehicles> = new BehaviorSubject<PaginatedVehicles>({ data: [], pagination: { page: 0, pageCount: 0, pageSize: 0, total: 0 } });
    public vehicles$: Observable<PaginatedVehicles> = this._vehicles.asObservable();

    /**
     * Constructor de la clase VehiclesService.
     * @param dataSvc Servicio de datos utilizado para operaciones de red.
     * @param mapping Servicio de mapeo utilizado para transformar datos.
     */
    constructor(
        private dataSvc: DataService,
        private mapping: MappingService,
    ) { }

    /**
     * Realiza una consulta de vehículos según un criterio de búsqueda.
     * @param q Criterio de búsqueda.
     * @return Observable que emite una lista paginada de vehículos que coinciden con el criterio.
     */
    public query(q: string): Observable<PaginatedVehicles> {
        var obs = this.dataSvc.query<any>(`${environment.BASE_URL}/api/vehicles`, {}).pipe(map(this.mapping.mapVehicles.bind(this.mapping)));
        return obs
    }

    /**
     * Obtiene todos los vehículos asociados a un usuario.
     * @param userId Identificador del usuario propietario.
     * @return Observable que emite una lista paginada de vehículos del usuario.
     */
    public getAll(userId: number): Observable<PaginatedVehicles> {
        const apiUrl = "api/vehicles?populate=users_permissions_user&filters[users_permissions_user]=" + userId;
        var obs = this.dataSvc.query<any>(apiUrl, {}).pipe(map(this.mapping.mapVehicles.bind(this.mapping)), tap(vehicles => {
            this._vehicles.next(vehicles);
        }));
        return obs;
    }

    /**
     * Agrega un nuevo vehículo.
     * @param vehicle Objeto Vehicle que representa el vehículo a agregar.
     * @return Observable que emite el objeto Vehicle agregado.
     */
    addVehicle(vehicle: Vehicle): Observable<Vehicle> {
        const endPoint = "api/vehicles";
        var _vehicle: any = {
            plate: vehicle.plate,
            brand: vehicle.brand,
            model: vehicle.model,
            registrationDate: vehicle.registrationDate,
            category: vehicle.category,
            available: vehicle.available,
            users_permissions_user: vehicle.owner
        }
        return this.dataSvc.post<Vehicle>(endPoint, _vehicle);
    }

    /**
     * Actualiza un vehículo existente.
     * @param vehicle Objeto Vehicle que representa el vehículo a actualizar.
     * @return Observable que emite el objeto Vehicle actualizado.
     */
    updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
        return this.dataSvc.put<any>(this.mapping.updateVehicleUrl(vehicle.id!), vehicle).pipe(map(this.mapping.mapVehicle.bind(this.mapping)));
    }

    /**
     * Elimina un vehículo.
     * @param vehicle Objeto Vehicle que representa el vehículo a eliminar.
     * @return Observable que emite el objeto Vehicle eliminado.
     */
    deleteVehicle(vehicle: Vehicle): Observable<Vehicle> {
        return this.dataSvc.delete<any>(this.mapping.deleteVehicleUrl(vehicle.id!)).pipe(map(this.mapping.mapVehicle.bind(this.mapping)));
    }

}
