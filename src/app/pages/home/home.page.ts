import { Component, OnInit } from '@angular/core';
import { DocumentData, DocumentReference } from 'firebase/firestore';
import { FirebaseDocument, FirebaseService } from 'src/app/core/services/api/firebase/firebase.service';
import { FirebaseMappingService } from 'src/app/core/services/api/firebase/firebase-mapping.service';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';
import { ModalController } from '@ionic/angular';
import { Provider } from 'src/app/core/interfaces/Provider';
import { Spent } from 'src/app/core/interfaces/Spent';
import { SpentFormComponent } from './spent-form/spent-form.component';
import { SpentService } from 'src/app/core/services/spent.service';
import { Vehicle } from 'src/app/core/interfaces/Vehicle';
import { VehicleFormComponent } from './vehicle-form/vehicle-formcomponent';
import { VehiclePreview } from 'src/app/core/interfaces/User';
import { VehicleService } from 'src/app/core/services/vehicle.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public filterAvailableVehicle = true;
    public selectedVehicle: FirebaseDocument | null = null;
    public providers: Provider[] = [];

    constructor(
        private firebaseSvc: FirebaseService,
        private modal: ModalController,
        private vehicleSvc: VehicleService,
        public localDataSvc: LocalDataService,
        public spentsSvc: SpentService,
    ) { }

    ngOnInit(): void {
        // Carga los proveedores del usuario al inicio
        var user = this.localDataSvc.getUser().value;
        this.firebaseSvc.subscribeToDocument("providers", user!.uuid, this.localDataSvc.getProviders(), (data) => {
            return data['providers']
        });
    }

    selectionChanged(event: CustomEvent) {
        switch (event.detail.value) {
            case "available": this.filterAvailableVehicle = true;
                break;
            case "all": this.filterAvailableVehicle = false;
                break;
        }
    }

    // ***************************** VEHICLES *****************************
    public async onVehicleItemClicked(vehiclePreview: VehiclePreview) {
        var vehicle = await this.firebaseSvc.getDocumentByRef(vehiclePreview.ref)
        if (vehicle.id) this.firebaseSvc.subscribeToDocument("vehicles", vehicle.id, this.localDataSvc.getVehicle());
        this.selectedVehicle = vehicle
        this.localDataSvc.vehicle$.subscribe(vehicle => {
            this.localDataSvc.setSpents(vehicle?.spents!)
            this.spentsSvc.calculateNumberOfSpents(vehicle?.spents!)
            this.spentsSvc.calculateTotalSpents(vehicle?.spents!)
            // TODO VER POSIBILIDAD DE METERLE GRÁFICAS EN EL MÓDULO DE ADMIN
        })
    }

    onNewVehicle() {
        var onDismiss = async (info: any) => {
            this.vehicleSvc.createVehicle(info);
        }
        this.presentFormVehicles(null, onDismiss);
    }


    public async onEditVehicleClicked(vehicle: VehiclePreview) {
        var onDismiss = (info: any) => {
            this.vehicleSvc.editVehicle(info, vehicle);
            if (info.role == "delete") {
                // Limpia la pantalla de gastos
                this.cleanSpentsData();
            }
        }
        this.presentFormVehicles(vehicle, onDismiss);
    }

    cleanSpentsData() {
        this.localDataSvc.setSpents([]);
        this.spentsSvc.updateTotalSpentsAmount(0);
        this.spentsSvc.updateTotalSpentsNumber(0);
        this.localDataSvc.setVehicle(null);
        this.selectedVehicle = null;
    }

    async presentFormVehicles(data: VehiclePreview | null, onDismiss: (result: any) => void) {
        const modal = await this.modal.create({
            component: VehicleFormComponent,
            componentProps: {
                vehicle: data
            },
            cssClass: "modal-w50 modal-h"
        });
        modal.present();
        modal.onDidDismiss().then(result => {
            if (result && result.data) {
                onDismiss(result);
            }
        });
    }

    // ***************************** SPENTS *****************************
    createSpent(vehicleSelected: DocumentData) {
        var onDismiss = async (info: any) => {
            this.spentsSvc.createSpent(info, vehicleSelected);
        }
        this.presentFormSpents(null, vehicleSelected['id'], onDismiss);
    }

    public async onEditSpentClicked(spent: Spent) {
        var vehicle: Vehicle = this.localDataSvc.getVehicle().value!;
        var onDismiss = (info: any) => {
            this.spentsSvc.editSpent(info, vehicle);
        }
        this.presentFormSpents(spent, vehicle!.vehicleId, onDismiss);
    }

    async presentFormSpents(data: Spent | null, _vehicleId: string, onDismiss: (result: any) => void) {
        var providers: Provider[] | null = []
        this.localDataSvc.providers$.subscribe(providerList => {
            providers = providerList
        })
        const modal = await this.modal.create({
            component: SpentFormComponent,
            componentProps: {
                spent: data,
                vehicleId: _vehicleId,
                providers: providers,
            },
            cssClass: "modal-w50"
        });
        modal.present();
        modal.onDidDismiss().then(result => {
            if (result && result.data) {
                onDismiss(result);
            }
        });
    }
}




