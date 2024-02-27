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

    async createSpent(info: any, vehicleSelectsed: DocumentData) {
        var vehicleSelected: Vehicle = this.localDataSvc.getVehicle().value!
        switch (info.role) {
            case 'ok': {
                try {
                    var spent = this.firebaseMappingSvc.mapFBSpent(info.data)
                    var vehicleWithSpents = await this.addSpentToSpentsArray(vehicleSelected, spent)
                    await this.firebaseSvc.updateDocument("vehicles", vehicleSelected?.vehicleId!, vehicleWithSpents)
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

    editSpent(info: any, spent: Spent, vehicle: Vehicle) {
        switch (info.role) {
            // TODO HACER LA EDICIÓN DE GASTOS
            case 'ok': {
                console.log("ok");
                break;
            }
            /*                    case 'ok': {
                                   this.spentsSvc.updateSpent(info.data).subscribe(async user => {
                                       this.utilSvc.showToast("Gasto actualizado", "secondary", "bottom")
                                       this.reloadSpents(this.user!);
                                   })
                               }
                                   break; */
            case 'delete': {
                try {
                    var spentsList = this.localDataSvc.getSpents().value.filter(_spent => {
                        return spent.spentId != _spent.spentId;
                    });
                    var vehicleUpdated = this.firebaseMappingSvc.mapVehicleWithSpents(vehicle!, spentsList);
                    this.firebaseSvc.updateDocument("vehicles", vehicleUpdated.vehicleId, vehicleUpdated);
                    this.utilsSvc.showToast(this.utilsSvc.getTransMsg("deleteVehicleOk"), "secondary", "bottom");
                } catch (e) {
                    console.error(e);
                    this.utilsSvc.showToast(this.utilsSvc.getTransMsg("deleteVehicleError"), "danger", "top");
                }
            }
                break;
            default: {
                console.error("No debería entrar: onEditSpentClicked");
            }
        }
    }
    async addSpentToSpentsArray(vehicle: Vehicle, spent: Spent): Promise<any> {
        var vehicleWithSpents: Vehicle = {
            available: vehicle.available,
            brand: vehicle.brand,
            category: vehicle.category,
            model: vehicle.model,
            plate: vehicle.plate,
            registrationDate: vehicle.registrationDate,
            spents: vehicle.spents,
            userId: vehicle.userId,
            vehicleId: vehicle.vehicleId
        }
        vehicleWithSpents.spents!.push(spent);
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

