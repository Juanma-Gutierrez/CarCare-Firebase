import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DocumentData, Unsubscribe } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { LogType, OperationLog } from 'src/app/core/interfaces/ItemLog';
import { Provider } from 'src/app/core/interfaces/Provider';
import { Spent } from 'src/app/core/interfaces/Spent';
import { VehiclePreview } from 'src/app/core/interfaces/User';
import { Vehicle } from 'src/app/core/interfaces/Vehicle';
import { FirebaseDocument } from 'src/app/core/services/api/firebase/firebase.service';
import { FirebaseService } from 'src/app/core/services/api/firebase/FirebaseService';
import { Mapping } from 'src/app/core/services/api/firebase/mapping';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';
import { LOG_CONTENT, MyToast, VEHICLE } from 'src/app/core/services/const.service';
import { SpentService } from 'src/app/core/services/spent.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { VehicleService } from 'src/app/core/services/vehicle.service';

import { SpentFormComponent } from './spent-form/spent-form.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-formcomponent';

/**
 * Initializes the HomePage component.
 */
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
    public selectedVehicle: FirebaseDocument | null = null;
    public providers: Provider[] = [];
    public filterAvailableVehicle = true;
    private unsubscribes: (Unsubscribe | null)[] = []
    private subscriptions: Subscription[] = []

    /**
     * Creates an instance of the HomePage component.
     * @param {FirebaseService} firebaseSvc - The Firebase service.
     * @param {ModalController} modal - The modal controller service.
     * @param {Router} router - The router service.
     * @param {UtilsService} utilsSvc - The utilities service.
     * @param {VehicleService} vehicleSvc - The vehicle service.
     * @param {LocalDataService} localDataSvc - The local data service.
     * @param {SpentService} spentsSvc - The spent service.
     */
    constructor(
        private firebaseSvc: FirebaseService,
        private modal: ModalController,
        private router: Router,
        private utilsSvc: UtilsService,
        private vehicleSvc: VehicleService,
        public localDataSvc: LocalDataService,
        public spentsSvc: SpentService,
    ) { }

    /**
     * Initializes the HomePage component.
     */
    ngOnInit(): void {
        var user = this.localDataSvc.getUser().value;
        this.firebaseSvc.subscribeToDocument("provider", user!.userId, this.localDataSvc.getProviders(), (data) => {
            return (data['providers']);
        });
    }

    /**
     * Handles the selection change event.
     * @param {CustomEvent} event - The custom event containing the selection value.
     */
    selectionChanged(event: CustomEvent) {
        switch (event.detail.value) {
            case "available": this.filterAvailableVehicle = true;
                break;
            case "all": this.filterAvailableVehicle = false;
                break;
        }
    }

    /**
     * Handles the click event when a vehicle item is clicked.
     * @param {VehiclePreview} vehiclePreview - The vehicle preview object.
     */
    public async onVehicleItemClicked(vehiclePreview: VehiclePreview) {
        var vehicle = await this.firebaseSvc.getDocumentByRef(vehiclePreview.ref)
        if (vehicle.id) this.unsubscribes.push(this.firebaseSvc.subscribeToDocument(VEHICLE, vehicle.id, this.localDataSvc.getVehicle()));
        this.selectedVehicle = vehicle
        this.subscriptions.push(this.localDataSvc.vehicle$.subscribe(vehicle => {
            this.localDataSvc.setSpents(vehicle?.spents!)
            this.spentsSvc.calculateNumberOfSpents(vehicle?.spents!)
            this.spentsSvc.calculateTotalSpents(vehicle?.spents!)
        }))
    }

    /**
     * Handles the click event when creating a new vehicle.
     */
    onNewVehicle() {
        var onDismiss = async (info: any) => {
            try {
                const itemLog = new Mapping(this.localDataSvc).generateItemLog(
                    LOG_CONTENT.VEHICLE_CREATION_SUCCESSFULLY,
                    OperationLog.VEHICLE,
                    LogType.INFO
                )
                this.firebaseSvc.fbSaveLog(itemLog);
                this.vehicleSvc.createVehicle(info);
            } catch (e: any) {
                console.log("Error: ", e.message)
                const itemLog = new Mapping(this.localDataSvc).generateItemLog(
                    LOG_CONTENT.VEHICLE_CREATION_ERROR,
                    OperationLog.VEHICLE,
                    LogType.ERROR
                )
                this.firebaseSvc.fbSaveLog(itemLog);
            }
        }
        this.presentFormVehicles(null, onDismiss);
    }

    /**
     * Handles the click event when editing a vehicle.
     * @param {VehiclePreview} vehicle - The vehicle object to edit.
     */
    public async onEditVehicleClicked(vehicle: VehiclePreview) {
        var onDismiss = (info: any) => {
            const content_successful = info.role == "delete" ? LOG_CONTENT.VEHICLE_DELETION_SUCCESSFULLY : LOG_CONTENT.VEHICLE_EDITION_SUCCESSFULLY
            const content_error = info.role == "delete" ? LOG_CONTENT.VEHICLE_DELETION_ERROR : LOG_CONTENT.VEHICLE_EDITION_ERROR
            try {
                const itemLog = new Mapping(this.localDataSvc).generateItemLog(
                    content_successful,
                    OperationLog.VEHICLE,
                    LogType.INFO
                )
                this.firebaseSvc.fbSaveLog(itemLog);
                this.vehicleSvc.editVehicle(info, vehicle);
            } catch (e: any) {
                console.log("Error: ", e.message)
                const itemLog = new Mapping(this.localDataSvc).generateItemLog(
                    content_error,
                    OperationLog.VEHICLE,
                    LogType.ERROR
                )
                this.firebaseSvc.fbSaveLog(itemLog);
            }
            if (info.role == "delete") {
                this.cleanSpentsData();
            }
        }
        this.presentFormVehicles(vehicle, onDismiss);
    }

    /**
     * Cleans the spents data.
     */
    cleanSpentsData() {
        this.localDataSvc.setSpents([]);
        this.spentsSvc.updateTotalSpentsAmount(0);
        this.spentsSvc.updateTotalSpentsNumber(0);
        this.localDataSvc.setVehicle(null);
        this.selectedVehicle = null;
    }

    /**
     * Presents the vehicle form modal.
     * @param {VehiclePreview | null} data - The vehicle data to populate the form.
     * @param {Function} onDismiss - The function to call on modal dismiss.
     */
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

    /**
     * Creates a new spent for the selected vehicle.
     * @param {DocumentData} vehicleSelected - The selected vehicle.
     */
    async createSpent(vehicleSelected: DocumentData) {
        if (this.localDataSvc.getProviders().value?.length == 0) {
            await this.utilsSvc.showToast("message.providers.noneProvider", MyToast.Color.DANGER, MyToast.Position.TOP);
            this.router.navigate(['/providers']);
        } else {
            var onDismiss = async (info: any) => {
                try {
                    const itemLog = new Mapping(this.localDataSvc).generateItemLog(
                        LOG_CONTENT.SPENT_CREATION_SUCCESSFULLY,
                        OperationLog.SPENT,
                        LogType.INFO
                    )
                    this.firebaseSvc.fbSaveLog(itemLog);
                    this.spentsSvc.createSpent(info, vehicleSelected);
                } catch (e: any) {
                    console.log("Error: ", e.message)
                    const itemLog = new Mapping(this.localDataSvc).generateItemLog(
                        LOG_CONTENT.SPENT_CREATION_ERROR,
                        OperationLog.SPENT,
                        LogType.ERROR
                    )
                    this.firebaseSvc.fbSaveLog(itemLog);
                }
            }
            this.presentFormSpents(null, vehicleSelected['id'], onDismiss);
        }
    }

    /**
     * Handles the click event when editing a spent.
     * @param {Spent} spent - The spent object to edit.
     */
    public async onEditSpentClicked(spent: Spent) {
        var vehicle: Vehicle = this.localDataSvc.getVehicle().value!;
        var onDismiss = (info: any) => {
            const content_successful = info.role == "delete" ? LOG_CONTENT.SPENT_DELETION_SUCCESSFULLY : LOG_CONTENT.SPENT_EDITION_SUCCESSFULLY
            const content_error = info.role == "delete" ? LOG_CONTENT.SPENT_DELETION_ERROR : LOG_CONTENT.SPENT_EDITION_ERROR
            try {
                const itemLog = new Mapping(this.localDataSvc).generateItemLog(
                    content_successful,
                    OperationLog.SPENT,
                    LogType.INFO
                )
                this.firebaseSvc.fbSaveLog(itemLog);
                this.spentsSvc.editSpent(info, vehicle);
            } catch (e: any) {
                console.log("Error: ", e.message)
                const itemLog = new Mapping(this.localDataSvc).generateItemLog(
                    content_error,
                    OperationLog.SPENT,
                    LogType.ERROR
                )
                this.firebaseSvc.fbSaveLog(itemLog);
            }
        }
        this.presentFormSpents(spent, vehicle!.vehicleId, onDismiss);
    }

    /**
     * Presents the spent form modal.
     * @param {Spent | null} data - The spent data to populate the form.
     * @param {string} _vehicleId - The ID of the vehicle associated with the spent.
     * @param {Function} onDismiss - The function to call on modal dismiss.
     */
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

    /**
     * Unsubscribes from Firebase and other subscriptions to prevent memory leaks.
     */
    ngOnDestroy(): void {
        this.unsubscribes.forEach(uns => { if (uns) uns() });
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}




