import { Injectable } from '@angular/core';
import { DocumentReference } from 'firebase/firestore';
import { User, VehiclePreview } from '../interfaces/User';
import { FirebaseService } from './api/firebase/FirebaseService';
import { FirebaseMappingService } from './api/firebase/firebase-mapping.service';
import { LocalDataService } from './api/local-data.service';
import { MyToast, USER, VEHICLE } from './const.service';
import { UtilsService, convertDateToLongIsoFormatDate, generateId } from './utils.service';
import { Vehicle } from '../interfaces/Vehicle';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {

    /**
     * Constructs a new VehicleService.
     * @param {UtilsService} utilsSvc - The utility service for miscellaneous functions.
     * @param {FirebaseMappingService} firebaseMappingSvc - The service for mapping Firebase data.
     * @param {FirebaseService} firebaseSvc - The service for Firebase operations.
     * @param {LocalDataService} localDataSvc - The service for local data operations.
     */
    constructor(
        private utilsSvc: UtilsService,
        private firebaseMappingSvc: FirebaseMappingService,
        private firebaseSvc: FirebaseService,
        private localDataSvc: LocalDataService,
    ) { }

    /**
     * Asynchronously creates a new vehicle.
     * @param {any} info - Information about the creation action.
     */
    async createVehicle(info: any) {
        switch (info.role) {
            case 'ok': {
                const confirm = await this.utilsSvc.showConfirm("message.vehicles.confirmCreation");
                if (confirm) {
                    var user = this.localDataSvc.getUser().value;
                    var vehicleId = generateId();
                    var vehicle = this.firebaseMappingSvc.mapVehicle(info.data, vehicleId, user?.userId!, []);
                    try {
                        var ref = await this.firebaseSvc.createDocumentWithId(VEHICLE, vehicle, vehicleId);
                        this.updateUser(info.data, ref);
                        await this.utilsSvc.showToast("message.vehicles.newVehicleOk", MyToast.Color.SUCCESS, MyToast.Position.BOTTOM);
                    } catch (e) {
                        console.error(e);
                        await this.utilsSvc.showToast("message.vehicles.newVehicleError", MyToast.Color.DANGER, MyToast.Position.TOP);
                    }
                } else {
                    await this.utilsSvc.showToast("message.confirm.actionCancel", MyToast.Color.DANGER, MyToast.Position.BOTTOM);
                }
                break;
            }
            default: {
                console.error("No debería entrar: createVehicle");
            }
        }
    }

    /**
     * Asynchronously updates the user's information with a new vehicle.
     * @param {any} data - The data of the new vehicle.
     * @param {DocumentReference} ref - The reference to the document of the new vehicle.
     */
    async updateUser(data: any, ref: DocumentReference) {
        var vehiclePreview: VehiclePreview = {
            available: data.available,
            brand: data.brand,
            created: convertDateToLongIsoFormatDate(data.created),
            category: data.category,
            model: data.model,
            plate: data.plate,
            ref: ref,
            registrationDate: convertDateToLongIsoFormatDate(data.registrationDate),
            vehicleId: ref.id,
        }
        var user = this.localDataSvc.getUser().value!!
        var vehiclesList = user.vehicles;
        vehiclesList.push(vehiclePreview);
        vehiclesList = this.sortVehiclesByDate(vehiclesList);
        user.vehicles = vehiclesList;
        await this.firebaseSvc.updateDocument(USER, user.userId, user);
    }

    /**
     * Asynchronously edits a vehicle.
     * @param {any} info - Information about the edit action.
     * @param {VehiclePreview} vehicle - The vehicle object to be edited.
     */
    async editVehicle(info: any, vehicle: VehiclePreview) {
        switch (info.role) {
            case 'ok': {
                const confirm = await this.utilsSvc.showConfirm("message.vehicles.confirmEdit");
                if (confirm) {
                    var user: User = this.localDataSvc.getUser().value!
                    try {
                        var vehiclesListUpdated: VehiclePreview[] = this.updateVehicleInUserCollection(info.data, vehicle.vehicleId);
                        var userUpdated: User = this.firebaseMappingSvc.mapUserWithVehicles(user, vehiclesListUpdated);
                        await this.firebaseSvc.updateDocument(USER, user.userId, userUpdated);
                        info.data["registrationDate"] = convertDateToLongIsoFormatDate(info.data["registrationDate"])
                        await this.firebaseSvc.updateDocument(VEHICLE, info.data['vehicleId'], info.data);
                        await this.utilsSvc.showToast("message.vehicles.editVehicleOk", MyToast.Color.SUCCESS, MyToast.Position.BOTTOM);
                    } catch (e) {
                        console.error(e);
                        await this.utilsSvc.showToast("message.vehicles.editVehicleError", MyToast.Color.DANGER, MyToast.Position.TOP);
                    }
                } else {
                    await this.utilsSvc.showToast("message.confirm.actionCancel", MyToast.Color.DANGER, MyToast.Position.BOTTOM);
                }
                break;
            }
            case 'delete': {
                const confirm = await this.utilsSvc.showConfirm("message.vehicles.confirmDelete");
                if (confirm) {
                    try {
                        await this.firebaseSvc.deleteDocument(VEHICLE, vehicle.vehicleId);
                        await this.deleteVehiclePreview(vehicle.vehicleId);
                        await this.utilsSvc.showToast("message.vehicles.deleteVehicleOk", MyToast.Color.SUCCESS, MyToast.Position.BOTTOM);
                    } catch (e) {
                        console.error(e);
                        await this.utilsSvc.showToast("message.vehicles.deleteVehicleError", MyToast.Color.DANGER, MyToast.Position.TOP);
                    }
                } else {
                    await this.utilsSvc.showToast("message.confirm.actionCancel", MyToast.Color.DANGER, MyToast.Position.BOTTOM);
                }
                break;
            }
            default: {
                console.error("No debería entrar: editVehicle");
            }
        }
    }

    /**
     * Asynchronously deletes a vehicle preview.
     * @param {String} id - The ID of the vehicle to be deleted.
     */
    async deleteVehiclePreview(id: String) {
        var user = this.localDataSvc.getUser().value!!
        var vehiclesList = user.vehicles;
        vehiclesList = vehiclesList.filter(vehicle => { return vehicle.vehicleId != id })
        user.vehicles = vehiclesList;
        await this.firebaseSvc.updateDocument(USER, user.userId, user)
    }

    /**
     * Updates a vehicle in the user's collection.
     * @param {any} vehicleUpdated - The updated vehicle data.
     * @param {string} vehicleId - The ID of the vehicle to be updated.
     * @returns {VehiclePreview[]} - The updated list of vehicle previews.
     */
    updateVehicleInUserCollection(vehicleUpdated: any, vehicleId: string): VehiclePreview[] {
        var vehiclesList = this.localDataSvc.getUser().value?.vehicles!
        var vehiclesFiltered: VehiclePreview[] = []
        vehiclesList?.map(vehicle => {
            if (vehicle.vehicleId == vehicleId) {
                var vehiclePreview: VehiclePreview = {
                    available: vehicleUpdated.available,
                    brand: vehicleUpdated.brand,
                    created: convertDateToLongIsoFormatDate(vehicleUpdated.created),
                    category: vehicleUpdated.category,
                    model: vehicleUpdated.model,
                    plate: vehicleUpdated.plate,
                    ref: vehicle.ref,
                    registrationDate: convertDateToLongIsoFormatDate(vehicleUpdated.registrationDate),
                    vehicleId: vehicleUpdated.vehicleId,
                }
                vehiclesFiltered.push(vehiclePreview);
            } else {
                vehiclesFiltered.push(vehicle);
            }
        })
        vehiclesFiltered = this.sortVehiclesByDate(vehiclesFiltered);
        return vehiclesFiltered;
    }

    /**
     * Sorts an array of vehicle previews by registration date in descending order.
     * @param {VehiclePreview[]} list - The array of vehicle previews to be sorted.
     * @returns {VehiclePreview[]} - The sorted array of vehicle previews.
     */
    sortVehiclesByDate(list: VehiclePreview[]): VehiclePreview[] {
        var listOrdered = list.sort((a, b) => {
            const dateA = new Date(a.registrationDate).getTime();
            const dateB = new Date(b.registrationDate).getTime();
            return dateB - dateA;
        });
        return listOrdered;
    }
}
