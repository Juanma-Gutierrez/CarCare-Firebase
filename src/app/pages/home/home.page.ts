import { ApiService } from 'src/app/core/services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { DocumentData, DocumentReference } from 'firebase/firestore';
import { FBProvider } from 'src/app/core/services/api/firebase/interfaces/FBProvider';
import { FBSpent } from 'src/app/core/services/api/firebase/interfaces/FBSpent';
import { FBUser, FBVehiclePreview } from 'src/app/core/services/api/firebase/interfaces/FBUser';
import { FirebaseDocument, FirebaseService } from 'src/app/core/services/api/firebase/firebase.service';
import { FirebaseMappingService } from 'src/app/core/services/api/firebase/firebase-mapping.service';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';
import { ModalController } from '@ionic/angular';
import { Provider } from 'src/app/core/interfaces/Provider';
import { ProvidersService } from 'src/app/core/services/api/providers.service';
import { Spent } from 'src/app/core/interfaces/Spent';
import { SpentFormComponent } from './spent-form/spent-form.component';
import { SpentsService } from 'src/app/core/services/api/spents.service';
import { VehicleFormComponent } from './vehicle-form/vehicle-formcomponent';
import { VehiclesService } from 'src/app/core/services/api/vehicles.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { FBVehicle } from 'src/app/core/services/api/firebase/interfaces/FBVehicle';

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
        private modal: ModalController,
        public apiSvc: ApiService,
        public vehiclesSvc: VehiclesService,
        public spentsSvc: SpentsService,
        public providersSvc: ProvidersService,
        private firebaseSvc: FirebaseService,
        private firebaseMappingSvc: FirebaseMappingService,
        public localDataSvc: LocalDataService,
        private utilsSvc: UtilsService
    ) { }

    ngOnInit(): void {
        // Carga los proveedores del usuario al inicio
        var user = this.localDataSvc.getUser().value;
        this.firebaseSvc.subscribeToDocument("providers", user!.uuid, this.localDataSvc.getProviders(), (data) => {
            return data['providers']
        })
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
    public async onVehicleItemClicked(vehiclePreview: FBVehiclePreview) {
        var vehicle = await this.firebaseSvc.getDocumentByRef(vehiclePreview.ref)
        if (vehicle.id) this.firebaseSvc.subscribeToDocument("vehicles", vehicle.id, this.localDataSvc.getVehicle());
        this.selectedVehicle = vehicle
        this.localDataSvc.vehicle$.subscribe(vehicle => {
            this.localDataSvc.setSpents(vehicle?.spents!)
            this.spentsSvc.calculateNumberOfSpents(vehicle?.spents!)
            this.spentsSvc.calculateTotalSpents(vehicle?.spents!)
            // TODO VER POSIBILIDAD DE METERLE GRÁFICAS O ALGO SIMILAR
        })
    }

    onNewVehicle() {
        var onDismiss = async (info: any) => {
            switch (info.role) {
                case 'ok': {
                    var user = this.localDataSvc.getUser().value
                    // Genera un id para el vehículo
                    var vehicleId = this.utilsSvc.generateId();
                    var vehicle = this.firebaseMappingSvc.mapFBVehicle(info.data, vehicleId, user?.uuid!)
                    // Genera el documento del vehículo y recibe un documentReference para actualizar al user
                    var ref = await this.firebaseSvc.createDocumentWithId("vehicles", vehicle, vehicleId)
                    this.updateUser(info.data, ref)
                    break;
                }
                default: {
                    console.error("No debería entrar");
                }
            }
        }
        this.presentFormVehicles(null, onDismiss);
    }

    async updateUser(data: any, ref: DocumentReference) {
        var vehiclePreview: FBVehiclePreview = {
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

    public async onEditVehicleClicked(vehicle: FBVehiclePreview) {
        var onDismiss = (info: any) => {
            switch (info.role) {
                case 'ok': {
                    var user: FBUser = this.localDataSvc.getUser().value!
                    try {
                        // Actualiza la lista de vehiculos preview
                        var vehiclesListUpdated: FBVehiclePreview[] = this.updateVehicleInUserCollection(info.data, vehicle.vehicleId);
                        var userUpdated: FBUser = this.firebaseMappingSvc.mapUserWithVehicles(user, vehiclesListUpdated);
                        // Actualiza el documento del usuario
                        this.firebaseSvc.updateDocument("user", user.uuid, userUpdated)
                        // Actualiza el documento del vehículo
                        this.firebaseSvc.updateDocument("vehicles", info.data['vehicleId'], info.data)
                        this.utilsSvc.showToast("Vehículo actualizado correctamente", "success", "bottom");
                    } catch (e) {
                        console.error(e)
                    }
                    break;
                }
                case 'delete': {
                    try {
                        // eliminar el documento del vehículo
                        this.firebaseSvc.deleteDocument("vehicles", vehicle.vehicleId);
                        // Eliminar el vehículo del array del usuario
                        this.deleteVehiclePreview(vehicle.vehicleId);
                        // Limpia la pantalla de gastos
                        this.cleanSpentsData();
                        this.utilsSvc.showToast("Vehículo eliminado", "success", "bottom");
                    } catch (e) {
                        console.error(e);
                    }
                }
                    break;
                default: {
                    console.error("No debería entrar");
                }
            }
        }
        this.presentFormVehicles(vehicle, onDismiss);
    }

    updateVehicleInUserCollection(vehicleUpdated: any, vehicleId: string): FBVehiclePreview[] {
        // Capturamos la lista de vehículos en un array
        var vehiclesList = this.localDataSvc.getUser().value?.vehicles!
        var vehiclesFiltered: FBVehiclePreview[] = []
        vehiclesList?.map(vehicle => {
            if (vehicle.vehicleId == vehicleId) {
                vehicleUpdated.ref = vehicle.ref;
                vehiclesFiltered.push(vehicleUpdated);
            } else {
                vehiclesFiltered.push(vehicle)
            }
        })
        return vehiclesFiltered
    }

    cleanSpentsData() {
        this.localDataSvc.setSpents([]);
        this.spentsSvc.updateTotalSpentsAmount(0);
        this.spentsSvc.updateTotalSpentsNumber(0);
        this.localDataSvc.setVehicle(null);
        this.selectedVehicle = null;
    }

    async deleteVehiclePreview(id: String) {
        var user = this.localDataSvc.getUser().value!! // Carga el usuario
        var vehiclesList = user.vehicles; // Carga la lista de vehículos
        user.vehicles = vehiclesList.filter(vehicle => vehicle.vehicleId != id)
        await this.firebaseSvc.updateDocument("user", user.uuid!!, user)
    }

    async presentFormVehicles(data: FBVehiclePreview | null, onDismiss: (result: any) => void) {
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
    onNewSpent(vehicleSelected: DocumentData) {
        var onDismiss = async (info: any) => {
            switch (info.role) {
                case 'ok': {
                    var spent = this.firebaseMappingSvc.mapFBSpent(info.data)
                    var vehicleWithSpents = await this.addSpentToSpentsArray(vehicleSelected, spent)
                    await this.firebaseSvc.updateDocument("vehicles", vehicleSelected['id']!!, vehicleWithSpents)
                    break;
                }
                default: {
                    console.error("No debería entrar");
                }
            }
        }
        this.presentFormSpents(null, vehicleSelected['id'], onDismiss);
    }

    async addSpentToSpentsArray(vehicle: DocumentData, spent: FBSpent): Promise<any> {
        var data = vehicle['data']
        var vehicleWithSpents: FBVehicle = {
            available: data['available'],
            brand: data['brand'],
            category: data['category'],
            model: data['model'],
            plate: data['plate'],
            registrationDate: data['registrationDate'],
            spents: data['spents'],
            userId: data['userId'],
            vehicleId: data['vehicleId']
        }
        data['spents'].push(spent);
        return vehicleWithSpents
    }

    public async onEditSpentClicked(spent: any) { // StrapiSpent
        /*    var onDismiss = (info: any) => {
               switch (info.role) {
                   case 'ok': {
                       this.spentsSvc.updateSpent(info.data).subscribe(async user => {
                           this.utilSvc.showToast("Gasto actualizado", "success", "bottom")
                           this.reloadSpents(this.user!);
                       })
                   }
                       break;
                   case 'delete': {
                       this.spentsSvc.deleteSpent(info.data).subscribe(async user => {
                           this.utilSvc.showToast("Gasto eliminado", "success", "bottom")
                           this.reloadSpents(this.user!);
                       })
                   }
                       break;
                   default: {
                       console.error("No debería entrar");
                   }
               }
           }
           var _spent: Spent = {
               id: spent.id,
               date: spent.date,
               amount: spent.amount,
               provider: spent.provider.data.id,
               providerName: spent.provider.data.attributes.name,
               vehicle: spent.vehicle.data.id,
               observations: spent.observations
           };
           this.presentFormSpents(_spent, _spent.vehicle, onDismiss); */
    }

    async presentFormSpents(data: Spent | null, _vehicleId: number, onDismiss: (result: any) => void) {
        var providers: FBProvider[] | null = []
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




