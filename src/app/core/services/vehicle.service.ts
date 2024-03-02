import { Injectable, OnInit } from '@angular/core';
import { LocalDataService } from './api/local-data.service';
import { SUCCESS, BOTTOM, DANGER, TOP, UtilsService } from './utils.service';
import { FirebaseMappingService } from './api/firebase/firebase-mapping.service';
import { FirebaseService } from './api/firebase/firebase.service';
import { DocumentReference } from 'firebase/firestore';
import { User, VehiclePreview } from '../interfaces/User';
import { CustomTranslateService } from './custom-translate.service';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {

    constructor(
        private utilsSvc: UtilsService,
        private firebaseMappingSvc: FirebaseMappingService,
        private firebaseSvc: FirebaseService,
        private localDataSvc: LocalDataService,
        private translateSvc: CustomTranslateService,
    ) { }

    async createVehicle(info: any) {
        var localDataSvc = new LocalDataService();
        switch (info.role) {
            case 'ok': {
                var user = this.localDataSvc.getUser().value;
                var vehicleId = this.utilsSvc.generateId();
                var vehicle = this.firebaseMappingSvc.mapFBVehicle(info.data, vehicleId, user?.uuid!);
                try {
                    var ref = await this.firebaseSvc.createDocumentWithId("vehicles", vehicle, vehicleId);
                    this.updateUser(info.data, ref);
                    this.utilsSvc.showToast("message.vehicles.newVehicleOk", SUCCESS, BOTTOM);
                } catch (e) {
                    console.error(e);
                    this.utilsSvc.showToast("message.vehicles.newVehicleError", DANGER, TOP);
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
        await this.firebaseSvc.updateDocument("user", user.uuid, user);
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
                        this.firebaseSvc.updateDocument("user", user.uuid, userUpdated);
                        this.firebaseSvc.updateDocument("vehicles", info.data['vehicleId'], info.data);
                        this.utilsSvc.showToast("message.vehicles.editVehicleOk", SUCCESS, BOTTOM);
                    } catch (e) {
                        console.error(e);
                        this.utilsSvc.showToast("message.vehicles.editVehicleError", DANGER, TOP);
                    }
                }
                break;
            }
            case 'delete': {
                const confirm = await this.utilsSvc.showConfirm("message.vehicles.confirmDelete");
                if (confirm) {
                    try {
                        this.firebaseSvc.deleteDocument("vehicles", vehicle.vehicleId);
                        this.deleteVehiclePreview(vehicle.vehicleId);
                        this.utilsSvc.showToast("message.vehicles.deleteVehicleOk", SUCCESS, BOTTOM);
                    } catch (e) {
                        console.error(e);
                        this.utilsSvc.showToast("message.vehicles.deleteVehicleError", DANGER, TOP);
                    }
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
        await this.firebaseSvc.updateDocument("user", user.uuid!!, user)
    }


    updateVehicleInUserCollection(vehicleUpdated: any, vehicleId: string): VehiclePreview[] {
        var vehiclesList = this.localDataSvc.getUser().value?.vehicles!
        var vehiclesFiltered: VehiclePreview[] = []
        vehiclesList?.map(vehicle => {
            if (vehicle.vehicleId == vehicleId) {
                var vehiclePreview: VehiclePreview = {
                    available: vehicleUpdated.available,
                    brand: vehicleUpdated.brand,
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
