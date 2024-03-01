import { Injectable, OnInit } from '@angular/core';
import { LocalDataService } from './api/local-data.service';
import { SUCCESS, BOTTOM, DANGER, TOP, UtilsService } from './utils.service';
import { FirebaseMappingService } from './api/firebase/firebase-mapping.service';
import { FirebaseService } from './api/firebase/firebase.service';
import { DocumentReference } from 'firebase/firestore';
import { User, VehiclePreview } from '../interfaces/User';

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
        var localDataSvc = new LocalDataService();
        switch (info.role) {
            case 'ok': {
                var user = this.localDataSvc.getUser().value;
                // Genera un id para el vehículo
                var vehicleId = this.utilsSvc.generateId();
                var vehicle = this.firebaseMappingSvc.mapFBVehicle(info.data, vehicleId, user?.uuid!);
                // Genera el documento del vehículo y recibe un documentReference para actualizar al user
                try {
                    var ref = await this.firebaseSvc.createDocumentWithId("vehicles", vehicle, vehicleId);
                    this.updateUser(info.data, ref);
                    this.utilsSvc.showToast(this.utilsSvc.getTransMsg("newVehicleOk"), SUCCESS, BOTTOM);
                } catch (e) {
                    console.error(e);
                    this.utilsSvc.showToast(this.utilsSvc.getTransMsg("newVehicleError"), DANGER, TOP);
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
        var user = this.localDataSvc.getUser().value!! // Carga el usuario
        var vehiclesList = user.vehicles; // Carga la lista de vehículos
        vehiclesList.push(vehiclePreview); // Añade el nuevo vehículo preview
        await this.firebaseSvc.updateDocument("user", user.uuid, user)
    }

    editVehicle(info: any, vehicle: VehiclePreview) {
        switch (info.role) {
            case 'ok': {
                var user: User = this.localDataSvc.getUser().value!
                try {
                    // Actualiza la lista de vehiculos preview
                    var vehiclesListUpdated: VehiclePreview[] = this.updateVehicleInUserCollection(info.data, vehicle.vehicleId);
                    var userUpdated: User = this.firebaseMappingSvc.mapUserWithVehicles(user, vehiclesListUpdated);
                    // Actualiza el documento del usuario
                    this.firebaseSvc.updateDocument("user", user.uuid, userUpdated);
                    // Actualiza el documento del vehículo
                    this.firebaseSvc.updateDocument("vehicles", info.data['vehicleId'], info.data);
                    this.utilsSvc.showToast(this.utilsSvc.getTransMsg("editVehicleOk"), SUCCESS, BOTTOM);
                } catch (e) {
                    console.error(e);
                    this.utilsSvc.showToast(this.utilsSvc.getTransMsg("editVehicleError"), DANGER, TOP);
                }
                break;
            }
            case 'delete': {
                try {
                    // eliminar el documento del vehículo
                    this.firebaseSvc.deleteDocument("vehicles", vehicle.vehicleId);
                    // Eliminar el vehículo del array del usuario
                    this.deleteVehiclePreview(vehicle.vehicleId);
                    this.utilsSvc.showToast(this.utilsSvc.getTransMsg("deleteVehicleOk"), SUCCESS, BOTTOM);
                } catch (e) {
                    console.error(e);
                    this.utilsSvc.showToast(this.utilsSvc.getTransMsg("deleteVehicleError"), DANGER, TOP);
                }
            }
                break;
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
                vehiclesFiltered.push(vehicle)
            }
        })
        return vehiclesFiltered
    }
}
