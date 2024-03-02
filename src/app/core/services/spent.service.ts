import { BehaviorSubject, Observable } from 'rxjs';
import { DocumentData } from 'firebase/firestore';
import { FirebaseMappingService } from './api/firebase/firebase-mapping.service';
import { FirebaseService } from './api/firebase/firebase.service';
import { Injectable } from '@angular/core';
import { LocalDataService } from './api/local-data.service';
import { Spent } from '../interfaces/Spent';
import { SUCCESS, BOTTOM, DANGER, TOP, UtilsService } from './utils.service';
import { Vehicle } from '../interfaces/Vehicle';
import { CustomTranslateService } from './custom-translate.service';

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
        private translateSvc: CustomTranslateService,
    ) { }

    async createSpent(info: any, vehicleSelectsed: DocumentData) {
        var vehicleSelected: Vehicle = this.localDataSvc.getVehicle().value!
        switch (info.role) {
            case 'ok': {
                try {
                    var spent = this.firebaseMappingSvc.mapFBSpent(info.data)
                    var vehicleWithSpents = await this.addSpentToSpentsArray(vehicleSelected, spent)
                    await this.firebaseSvc.updateDocument("vehicles", vehicleSelected?.vehicleId!, vehicleWithSpents)
                    this.utilsSvc.showToast("message.spents.newSpentOk", SUCCESS, BOTTOM);
                } catch (e) {
                    console.error(e);
                    this.utilsSvc.showToast("message.spents.newSpentError", DANGER, TOP);
                }
                break;
            }
            default: {
                console.error("No debería entrar: createSpent");
            }
        }
    }

    editSpent(info: any, vehicle: Vehicle) {
        var spent = info.data;
        var spentsList = this.localDataSvc.getVehicle().value?.spents;
        switch (info.role) {
            case 'ok': {
                var spentsListUpdated: Spent[] = spentsList?.map(_spent => {
                    return (spent.spentId == _spent.spentId) ? spent : _spent
                })!
                this.sortSpentsByDate(spentsListUpdated);
                vehicle.spents = spentsListUpdated;
                try {
                    this.firebaseSvc.updateDocument("vehicles", vehicle.vehicleId, vehicle);
                    this.utilsSvc.showToast("message.spents.editSpentOk", SUCCESS, BOTTOM);
                } catch (e) {
                    console.error(e);
                    this.utilsSvc.showToast("message.spents.editSpentError", DANGER, TOP);
                }
                break;
            }
            case 'delete': {
                try {
                    spentsList = this.localDataSvc.getSpents().value.filter(_spent => {
                        return spent.spentId != _spent.spentId;
                    });
                    var vehicleUpdated = this.firebaseMappingSvc.mapVehicleWithSpents(vehicle!, spentsList);
                    this.firebaseSvc.updateDocument("vehicles", vehicleUpdated.vehicleId, vehicleUpdated);
                    this.utilsSvc.showToast("message.spents.deleteSpentOk", SUCCESS, BOTTOM);
                } catch (e) {
                    console.error(e);
                    this.utilsSvc.showToast("message.spents.deleteSpentError", DANGER, TOP);
                }
            }
                break;
            default: {
                console.error("No debería entrar: onEditSpentClicked");
            }
        }
    }

    sortSpentsByDate(list: Spent[]): Spent[] {
        var listOrdered = list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        return listOrdered;
    }

    async addSpentToSpentsArray(vehicle: Vehicle, spent: Spent): Promise<any> {
        var vehicleWithSpents: Vehicle = this.firebaseMappingSvc.mapVehicleWithSpents(vehicle, vehicle.spents!)
        vehicleWithSpents.spents!.push(spent);
        this.sortSpentsByDate(vehicleWithSpents.spents!);
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

