import { BehaviorSubject, Observable, map, take, tap } from 'rxjs';
import { DataService } from './api/data.service';
import { Injectable } from '@angular/core';
import { MappingService } from './api/mapping.service';
import { Spent } from '../interfaces/Spent';
import { DocumentData } from 'firebase/firestore';
import { UtilsService } from './utils.service';
import { FirebaseMappingService } from './api/firebase/firebase-mapping.service';
import { FirebaseService } from './api/firebase/firebase.service';
import { LocalDataService } from './api/local-data.service';
import { Vehicle } from '../interfaces/Vehicle';


/**
 * Servicio que gestiona las operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
 * para los gastos (Spent).
 */
@Injectable({
    providedIn: 'root'
})
export class SpentService {

    private _totalSpentsAmount = new BehaviorSubject<number>(0);
    public totalSpentsAmount$: Observable<number> = this._totalSpentsAmount.asObservable();
    private _totalSpentsNumber = new BehaviorSubject<number>(0);
    public totalSpentsNumber$: Observable<number> = this._totalSpentsNumber.asObservable();

    constructor(
        private utilsSvc: UtilsService,
        private firebaseMappingSvc: FirebaseMappingService,
        private firebaseSvc: FirebaseService,
        private localDataSvc: LocalDataService,
    ) { }

    async createSpent(info: any, vehicleSelected: DocumentData) {
        switch (info.role) {
            case 'ok': {
                try {
                    var spent = this.firebaseMappingSvc.mapFBSpent(info.data)
                    var vehicleWithSpents = await this.addSpentToSpentsArray(vehicleSelected, spent)
                    await this.firebaseSvc.updateDocument("vehicles", vehicleSelected['id']!!, vehicleWithSpents)
                    this.utilsSvc.showToast(this.utilsSvc.getTransMsg("newSpentOk"), "secondary", "bottom");
                } catch (e) {
                    console.error(e);
                    this.utilsSvc.showToast(this.utilsSvc.getTransMsg("newSpentError"), "danger", "top");
                }
                break;
            }
            default: {
                console.error("No debería entrar: createSpent");
            }
        }
    }

    async addSpentToSpentsArray(vehicle: DocumentData, spent: Spent): Promise<any> {
        var data = vehicle['data']
        var vehicleWithSpents: Vehicle = {
            available: data['available'],
            brand: data['brand'],
            category: data['category'],
            model: data['model'],
            plate: data['plate'],
            registrationDate: data['registrationDate'],
            spents: data['spents'],
            userId: data['userId'],
            vehicleId: data['vehicleId']
        }
        data['spents'].push(spent);
        return vehicleWithSpents
    }

    calculateTotalSpents(spents: Spent[]) {
        var totalAmount = 0
        if (spents != undefined) {
            for (const spent of spents) {
                totalAmount += spent.amount;
            }
            this._totalSpentsAmount.next(totalAmount);
        }
    }

    calculateNumberOfSpents(spents: Spent[] | undefined) {
        if (spents != undefined)
            this._totalSpentsNumber.next(spents.length);
    }

    updateTotalSpentsAmount(amount: number): void {
        this._totalSpentsAmount.next(amount);
    }

    updateTotalSpentsNumber(number: number): void {
        this._totalSpentsNumber.next(number);
    }
}

