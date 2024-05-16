import { Injectable } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Spent } from '../interfaces/Spent';
import { Vehicle } from '../interfaces/Vehicle';
import { FirebaseService } from './api/firebase/FirebaseService';
import { FirebaseMappingService } from './api/firebase/firebase-mapping.service';
import { LocalDataService } from './api/local-data.service';
import { MyToast, VEHICLE } from './const.service';
import { CustomTranslateService } from './custom-translate.service';
import { UtilsService, convertDateToLongIsoFormatDate } from './utils.service';

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
                const confirm = await this.utilsSvc.showConfirm("message.spents.confirmCreation");
                if (confirm) {
                    try {
                        var spent = this.firebaseMappingSvc.mapSpent(info.data)
                        var vehicleWithSpents = await this.addSpentToSpentsArray(vehicleSelected, spent)
                        await this.firebaseSvc.updateDocument(VEHICLE, vehicleSelected?.vehicleId!, vehicleWithSpents)
                        await this.utilsSvc.showToast("message.spents.newSpentOk", MyToast.Color.SUCCESS, MyToast.Position.BOTTOM);
                    } catch (e) {
                        console.error(e);
                        await this.utilsSvc.showToast("message.spents.newSpentError", MyToast.Color.DANGER, MyToast.Position.TOP);
                    }
                } else {
                    await this.utilsSvc.showToast("message.confirm.actionCancel", MyToast.Color.DANGER, MyToast.Position.BOTTOM);
                }
                break;
            }
            default: {
                console.error("No debería entrar: createSpent");
            }
        }
    }

    async editSpent(info: any, vehicle: Vehicle) {
        var spent = info.data;
        spent.created = convertDateToLongIsoFormatDate(spent.created)
        spent.date = convertDateToLongIsoFormatDate(spent.date)
        var spentsList = this.localDataSvc.getVehicle().value?.spents;
        switch (info.role) {
            case 'ok': {
                const confirm = await this.utilsSvc.showConfirm("message.spents.confirmEdit");
                if (confirm) {
                    var spentsListUpdated: Spent[] = spentsList?.map(_spent => {
                        return (spent.spentId == _spent.spentId) ? spent : _spent
                    })!
                    this.sortSpentsByDate(spentsListUpdated);
                    vehicle.spents = spentsListUpdated;
                    try {
                        await this.firebaseSvc.updateDocument(VEHICLE, vehicle.vehicleId, vehicle);
                        await this.utilsSvc.showToast("message.spents.editSpentOk", MyToast.Color.SUCCESS, MyToast.Position.BOTTOM);
                    } catch (e) {
                        console.error(e);
                        await this.utilsSvc.showToast("message.spents.editSpentError", MyToast.Color.DANGER, MyToast.Position.TOP);
                    }
                } else {
                    await this.utilsSvc.showToast("message.confirm.actionCancel", MyToast.Color.DANGER, MyToast.Position.BOTTOM);
                }
                break;
            }
            case 'delete': {
                const confirm = await this.utilsSvc.showConfirm("message.spents.confirmDelete");
                if (confirm) {
                    try {
                        spentsList = this.localDataSvc.getSpents().value.filter(_spent => {
                            return spent.spentId != _spent.spentId;
                        });
                        var vehicleUpdated = this.firebaseMappingSvc.mapVehicleWithSpents(vehicle!, spentsList);
                        await this.firebaseSvc.updateDocument(VEHICLE, vehicleUpdated.vehicleId, vehicleUpdated);
                        await this.utilsSvc.showToast("message.spents.deleteSpentOk", MyToast.Color.SUCCESS, MyToast.Position.BOTTOM);
                    } catch (e) {
                        console.error(e);
                        await this.utilsSvc.showToast("message.spents.deleteSpentError", MyToast.Color.DANGER, MyToast.Position.TOP);
                    }
                } else {
                    await this.utilsSvc.showToast("message.confirm.actionCancel", MyToast.Color.DANGER, MyToast.Position.BOTTOM);
                }
                break;
            }
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

