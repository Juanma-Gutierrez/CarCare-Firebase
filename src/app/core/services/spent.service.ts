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

/**
 * Service for managing spent-related data.
 * @class SpentService
 * @constructor
 * @param {UtilsService} utilsSvc - The utility service.
 * @param {FirebaseMappingService} firebaseMappingSvc - Service for mapping Firebase data.
 * @param {FirebaseService} firebaseSvc - The Firebase service.
 * @param {LocalDataService} localDataSvc - Service for local data management.
 * @param {CustomTranslateService} translateSvc - Custom translation service.
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
        private translateSvc: CustomTranslateService,
    ) { }

    /**
     * Creates a new spent entry based on provided information.
     * @param {any} info - Additional information related to the spent creation.
     * @param {DocumentData} vehicleSelectsed - The selected vehicle for which the spent entry is being created.
     * @returns {void}
     */
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

    /**
     * Asynchronously edits a spent item.
     * @param {any} info - Information about the edit action.
     * @param {Vehicle} vehicle - The vehicle object to which the spent item belongs.
     */
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

    /**
     * Sorts an array of spent items by date in descending order.
     * @param {Spent[]} list - The array of spent items to be sorted.
     * @returns {Spent[]} - The sorted array of spent items.
     */
    sortSpentsByDate(list: Spent[]): Spent[] {
        var listOrdered = list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        return listOrdered;
    }

    /**
     * Asynchronously adds a spent item to the array of spent items associated with a vehicle.
     * @param {Vehicle} vehicle - The vehicle object to which the spent item will be added.
     * @param {Spent} spent - The spent item to be added.
     * @returns {Promise<any>} - A promise that resolves to the updated vehicle object with the added spent item.
     */
    async addSpentToSpentsArray(vehicle: Vehicle, spent: Spent): Promise<any> {
        var vehicleWithSpents: Vehicle = this.firebaseMappingSvc.mapVehicleWithSpents(vehicle, vehicle.spents!)
        vehicleWithSpents.spents!.push(spent);
        this.sortSpentsByDate(vehicleWithSpents.spents!);
        return vehicleWithSpents
    }

    /**
     * Calculates the total amount of spent items.
     * @param {Spent[]} spents - The array of spent items.
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
     * Calculates the number of spent items.
     * @param {Spent[] | undefined} spents - The array of spent items or undefined if no spent items are available.
     */
    calculateNumberOfSpents(spents: Spent[] | undefined) {
        if (spents != undefined)
            this._totalSpentsNumber.next(spents.length);
    }

    /**
     * Updates the total amount of spent items.
     * @param {number} amount - The new total amount of spent items.
     */
    updateTotalSpentsAmount(amount: number): void {
        this._totalSpentsAmount.next(amount);
    }

    /**
     * Updates the number of spent items.
     * @param {number} number - The new number of spent items.
     */
    updateTotalSpentsNumber(number: number): void {
        this._totalSpentsNumber.next(number);
    }
}

