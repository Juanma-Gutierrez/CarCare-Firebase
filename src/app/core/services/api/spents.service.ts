import { BehaviorSubject, Observable, map, take, tap } from 'rxjs';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { MappingService } from './mapping.service';
import { Spent } from '../../interfaces/Spent';

/**
 * Servicio que gestiona las operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
 * para los gastos (Spent).
 */
@Injectable({
    providedIn: 'root'
})
export class SpentsService {
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
     * Calcula el monto total gastado sumando los montos de todas las transacciones.
     * Utiliza el flujo de datos de gastos (spents$) y emite el resultado a través de un BehaviorSubject (_totalSpentsAmount).
     */
    calculateTotalSpents(spents: Spent[]) {
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
    calculateNumberOfSpents(spents: Spent[] | undefined) {
        if (spents != undefined)
            this._totalSpentsNumber.next(spents.length);
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

