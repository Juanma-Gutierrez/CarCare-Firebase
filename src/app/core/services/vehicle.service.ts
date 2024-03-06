import { Injectable, OnInit } from '@angular/core';
import { LocalDataService } from './api/local-data.service';
import { FirebaseMappingService } from './api/firebase/firebase-mapping.service';
import { FirebaseService } from './api/firebase/FirebaseService';
import { DocumentReference } from 'firebase/firestore';
import { User, VehiclePreview } from '../interfaces/User';
import { UtilsService, generateId } from './utils.service';
import { MyToast, USER, VEHICLE } from './const.service';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {

    constructor(
        private utilsSvc: UtilsService,
        private firebaseMappingSvc: FirebaseMappingService,
        private firebaseSvc: FirebaseService,
        private localDataSvc: LocalDataService,
    ) { }

    async createVehicle(info: any) {
        switch (info.role) {
            case 'ok': {
                const confirm = await this.utilsSvc.showConfirm("message.vehicles.confirmCreation");
                if (confirm) {
                    var user = this.localDataSvc.getUser().value;
                    var vehicleId = generateId();
                    var vehicle = this.firebaseMappingSvc.mapFBVehicle(info.data, vehicleId, user?.userId!, []);
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

    async updateUser(data: any, ref: DocumentReference) {
        var vehiclePreview: VehiclePreview = {
            available: data.available,
            brand: data.brand,
            created: data.created,
            category: data.category,
            model: data.model,
            plate: data.plate,
            ref: ref,
            registrationDate: data.registrationDate,
            vehicleId: ref.id,
        }
        var user = this.localDataSvc.getUser().value!!
        var vehiclesList = user.vehicles;
        vehiclesList.push(vehiclePreview);
        vehiclesList = this.sortVehiclesByDate(vehiclesList);
        user.vehicles = vehiclesList;
        await this.firebaseSvc.updateDocument(USER, user.userId, user);
    }

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

    async deleteVehiclePreview(id: String) {
        var user = this.localDataSvc.getUser().value!!
        var vehiclesList = user.vehicles;
        vehiclesList = vehiclesList.filter(vehicle => { return vehicle.vehicleId != id })
        user.vehicles = vehiclesList;
        await this.firebaseSvc.updateDocument(USER, user.userId, user)
    }


    updateVehicleInUserCollection(vehicleUpdated: any, vehicleId: string): VehiclePreview[] {
        var vehiclesList = this.localDataSvc.getUser().value?.vehicles!
        var vehiclesFiltered: VehiclePreview[] = []
        vehiclesList?.map(vehicle => {
            if (vehicle.vehicleId == vehicleId) {
                var vehiclePreview: VehiclePreview = {
                    available: vehicleUpdated.available,
                    brand: vehicleUpdated.brand,
                    created: vehicleUpdated.created,
                    category: vehicleUpdated.category,
                    model: vehicleUpdated.model,
                    plate: vehicleUpdated.plate,
                    ref: vehicle.ref,
                    registrationDate: vehicleUpdated.registrationDate,
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

    sortVehiclesByDate(list: VehiclePreview[]): VehiclePreview[] {
        var listOrdered = list.sort((a, b) => {
            const dateA = new Date(a.registrationDate).getTime();
            const dateB = new Date(b.registrationDate).getTime();
            return dateB - dateA;
        });
        return listOrdered;
    }
}
