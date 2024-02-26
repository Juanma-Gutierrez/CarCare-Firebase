import { BehaviorSubject, Observable, map, take, tap } from 'rxjs';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { MappingService } from './mapping.service';
import { PaginatedSpents } from './strapi/interfaces/strapi-spents';
import { Spent } from '../../interfaces/Spent';
import { FBSpent } from './firebase/interfaces/FBSpent';

/**
 * Interfaz que define las operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
 * para los gastos (Spent).
 */
interface CrudSpents {
    getAll(ownerId: number): Observable<PaginatedSpents>;
    addSpent(spent: Spent): Observable<Spent>;
    updateSpent(spent: Spent): Observable<Spent>;
    deleteSpent(spent: Spent): Observable<Spent>;
}

/**
 * Servicio que gestiona las operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
 * para los gastos (Spent).
 */
@Injectable({
    providedIn: 'root'
})
export class SpentsService implements CrudSpents {
    private _spents: BehaviorSubject<PaginatedSpents> = new BehaviorSubject<PaginatedSpents>({ data: [], pagination: { page: 0, pageCount: 0, pageSize: 0, total: 0 } });
    public spents$: Observable<PaginatedSpents> = this._spents.asObservable();
    private _totalSpentsAmount = new BehaviorSubject<number>(0);
    public totalSpentsAmount$: Observable<number> = this._totalSpentsAmount.asObservable();
    private _totalSpentsNumber = new BehaviorSubject<number>(0);
    public totalSpentsNumber$: Observable<number> = this._totalSpentsNumber.asObservable();

    /**
     * Constructor de la clase SpentsService.
     * @param dataSvc Servicio de datos para operaciones CRUD.
     * @param mapping Servicio de mapeo para transformaciones de datos.
     */
    constructor(
        private dataSvc: DataService,
        private mapping: MappingService,
    ) { }

    /**
     * Obtiene todos los gastos asociados a un vehículo.
     * @param vehicleId Identificador del vehículo.
     * @returns Observable que emite la lista paginada de gastos.
     */
    getAll(vehicleId: number): Observable<PaginatedSpents> {
        // Filtra los gastos del vehículo registrado
        const apiUrl = "api/spents?populate=*&filters[vehicle][id]=" + vehicleId;
        var obs = this.dataSvc.query<any>(apiUrl, {}).pipe(tap(response => {
            this._spents.next(response)
        }))
        return obs;
    }

    /**
     * Calcula el monto total gastado sumando los montos de todas las transacciones.
     * Utiliza el flujo de datos de gastos (spents$) y emite el resultado a través de un BehaviorSubject (_totalSpentsAmount).
     */
    calculateTotalSpents(spents: FBSpent[]) {
        var totalAmount = 0
        if (spents != undefined) {
            for (const spent of spents) {
                totalAmount += spent.amount;
            }
            this._totalSpentsAmount.next(totalAmount);
        }
    }

    /**
     * Calcula el número total de transacciones.
     * Utiliza el flujo de datos de gastos (spents$) y emite el resultado a través de un BehaviorSubject (_totalSpentsNumber).
     */
    calculateNumberOfSpents(spents: FBSpent[] | undefined) {
        if (spents != undefined)
            this._totalSpentsNumber.next(spents.length);
    }

    /**
     * Agrega una transacción de gasto.
     * @param spent Objeto Spent que representa la transacción a agregar.
     * @return Observable que emite el objeto Spent agregado.
     */
    addSpent(spent: Spent): Observable<Spent> {
        const endPoint = "api/spents";
        var _spent: any = {
            date: spent.date,
            amount: spent.amount,
            provider: spent.provider,
            vehicle: spent.vehicle,
            observations: spent.observations
        }
        return this.dataSvc.post<Spent>(endPoint, _spent);
    }

    /**
     * Actualiza una transacción de gasto existente.
     * @param spent Objeto Spent que representa la transacción a actualizar.
     * @return Observable que emite el objeto Spent actualizado.
     */
    updateSpent(spent: Spent): Observable<Spent> {
        const endPoint = `api/spents/${spent.id}`;
        return this.dataSvc.put<Spent>(endPoint, spent);
    }

    /**
     * Elimina una transacción de gasto.
     * @param spent Objeto Spent que representa la transacción a eliminar.
     * @return Observable que emite el objeto Spent eliminado.
     */
    deleteSpent(spent: Spent): Observable<Spent> {
        return this.dataSvc.delete<any>(this.mapping.deleteSpentUrl(spent.id!)).pipe(map(this.mapping.mapSpent.bind(this.mapping)));
    }

    /**
     * Actualiza el monto total de gastos con un nuevo valor.
     * @param amount Nuevo valor del monto total de gastos.
     */
    updateTotalSpentsAmount(amount: number): void {
        this._totalSpentsAmount.next(amount);
    }

    /**
     * Actualiza el número total de transacciones con un nuevo valor.
     * @param number Nuevo valor del número total de transacciones.
     */
    updateTotalSpentsNumber(number: number): void {
        this._totalSpentsNumber.next(number);
    }


}

