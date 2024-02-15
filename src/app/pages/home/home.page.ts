import { ApiService } from 'src/app/core/services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StrapiProvider } from 'src/app/core/services/api/strapi/interfaces/strapi-providers';
import { Provider } from 'src/app/core/interfaces/Provider';
import { ProvidersService } from 'src/app/core/services/api/providers.service';
import { Spent } from 'src/app/core/interfaces/Spent';
import { SpentFormComponent } from './spent-form/spent-form.component';
import { SpentsService } from 'src/app/core/services/api/spents.service';
import { StrapiSpent } from 'src/app/core/services/api/strapi/interfaces/strapi-spents';
import { User } from 'src/app/core/interfaces/User';
import { VehicleFormComponent } from './vehicle-form/vehicle-formcomponent';
import { VehiclesService } from 'src/app/core/services/api/vehicles.service';
import { FirebaseService } from 'src/app/core/services/api/firebase/firebase.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { FBUser, FBVehiclePreview } from 'src/app/core/services/api/firebase/interfaces/FBUser';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';
import { FBVehicle } from 'src/app/core/services/api/firebase/interfaces/FBVehicle';
import { FirebaseMappingService } from 'src/app/core/services/api/firebase/firebase-mapping.service';
import { DocumentReference } from 'firebase/firestore';


type PaginatedSpents = Spent[]
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public filterAvailableVehicle = true;
    private user: FBUser | null = null;
    public selectedVehicle: FBVehicle | undefined;
    public providers: Provider[] = [];

    constructor(
        private modal: ModalController,
        private utilSvc: UtilsService,
        public apiSvc: ApiService,
        public vehiclesSvc: VehiclesService,
        public spentsSvc: SpentsService,
        public providersSvc: ProvidersService,
        private firebaseSvc: FirebaseService,
        private firebaseMappingSvc: FirebaseMappingService,
        public localDataSvc: LocalDataService,
    ) { }

    /**
     * Método del ciclo de vida llamado al inicializar la página de inicio.
     * @method ngOnInit
     * @returns {void}
     */
    ngOnInit(): void { }

    /**
 * Maneja el cambio en la selección de filtros de vehículos.
 * @param {CustomEvent} event - Evento de cambio en la selección.
 * @return {void}
 */
    selectionChanged(event: CustomEvent) {
        switch (event.detail.value) {
            case "available": this.filterAvailableVehicle = true;
                break;
            case "all": this.filterAvailableVehicle = false;
                break;
        }
    }

    // ***************************** VEHICLES *****************************
    /**
     * Obtiene y carga los vehículos del propietario con el identificador proporcionado.
     * @async
     * @param {number} ownerId - Identificador del propietario.
     * @return {Promise<void>} - Promesa que se resuelve cuando se completan las operaciones.
     */
    /*     async getVehicles(ownerId: number) {
            console.log("getVehicles");
            this.vehiclesSvc.getAll(ownerId).subscribe();
        } */
    /**
     * Recarga la lista de vehículos del usuario proporcionado.
     * @method reloadVehicles
     * @param {User | null} user - Objeto de usuario o nulo.
     * @return {void}
     */
    /*     reloadVehicles(user: User | null) {
            if (user?.id)
                this.vehiclesSvc.getAll(user.id).subscribe();
        } */

    /**
     * Maneja el evento de clic en un elemento de vehículo.
     * Actualiza la lista de gastos y estadísticas relacionadas con el vehículo seleccionado.
     * @async
     * @method onVehicleItemClicked
     * @param {FBVehiclePreview} vehiclePreview - Objeto de vehículo seleccionado.
     */
    public async onVehicleItemClicked(vehiclePreview: FBVehiclePreview) {
        var vehicle = await this.firebaseSvc.getDocumentByRef(vehiclePreview.ref)
        if (vehicle.id) this.firebaseSvc.subscribeToDocument("vehicles", vehicle.id, this.localDataSvc.getVehicle());
        this.localDataSvc.vehicle$.subscribe(vehicle => {
            this.localDataSvc.setSpents(vehicle?.spents!)
            this.spentsSvc.calculateNumberOfSpents(vehicle?.spents!)
            this.spentsSvc.calculateTotalSpents(vehicle?.spents!)
            // TODO VER POSIBILIDAD DE METERLE GRÁFICAS O ALGO SIMILAR
        })
    }

    /**
     * Maneja la creación de un nuevo vehículo.
     * Abre un formulario para introducir los detalles del nuevo vehículo y realiza las operaciones correspondientes.
     * @method onNewVehicle
     * @return {void}
     */
    onNewVehicle() {
        var onDismiss = async (info: any) => {
            console.log(info)
            switch (info.role) {
                case 'ok': {
                    var vehicle = this.firebaseMappingSvc.mapFBVehicle(info.data)
                    var ref = await this.firebaseSvc.createDocument("vehicle", vehicle)
                    this.updateUser(info, ref)
                    break;
                }
                default: {
                    console.error("No debería entrar");
                }
            }
        }
        this.presentFormVehicles(null, onDismiss);
    }


    async updateUser(info: any, ref: DocumentReference) {
        var vehiclePreview: FBVehiclePreview = {
            available: info.data.available,
            brand: info.data.brand,
            category: info.data.category,
            id: ref.id,
            model: info.data.model,
            plate: info.data.plate,
            ref: ref,
            registrationDate: info.data.registrationDate,
        }
        var user = this.localDataSvc.getUser().value!! // Carga el usuario
        var vehiclesList = user.vehicles; // Carga la lista de vehículos
        vehiclesList.push(vehiclePreview); // Añade el nuevo vehículo preview
        await this.firebaseSvc.updateDocument("user", user.id!!, user)
    }





    /**
     * Maneja el evento de clic en "Editar" para un vehículo.
     * Abre un formulario prellenado con los detalles del vehículo y realiza las operaciones correspondientes.
     * @method onEditVehicleClicked
     * @param {FBVehicle} vehicle - Objeto de vehículo a editar.
     * @return {void}
     */
    public async onEditVehicleClicked(vehicle: FBVehiclePreview) {
        /*         var onDismiss = (info: any) => {
                    switch (info.role) {
                        case 'ok': {
                            this.vehiclesSvc.updateVehicle(info.data).subscribe(async user => {
                                this.utilSvc.showToast("Vehículo actualizado", "success", "bottom")
                                this.reloadVehicles(this.user);
                            })
                        }
                            break;
                        case 'delete': {
                            this.vehiclesSvc.deleteVehicle(info.data).subscribe(async user => {
                                this.utilSvc.showToast("Vehículo eliminado", "success", "bottom")
                                this.reloadVehicles(this.user);
                            })
                        }
                            break;
                        default: {
                            console.error("No debería entrar");
                        }
                    }
                }
                this.presentFormVehicles(vehicle, onDismiss); */
    }

    /**
     * Presenta un formulario para la gestión de vehículos.
     * @async
     * @method presentFormVehicles
     * @param {FBVehiclePreview | null} data - Datos del vehículo para prellenar el formulario (puede ser nulo para un nuevo vehículo).
     * @param {(result: any) => void} onDismiss - Función que se llama cuando se cierra el formulario, proporcionando el resultado.
     * @return {Promise<void>} - Promesa que se resuelve cuando se ha presentado el formulario.
     */
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

    /**
     * Obtiene y actualiza la lista de gastos asociados al vehículo seleccionado.
     * @async
     * @method getSpents
     * @return {Promise<void>} - Promesa que se resuelve cuando se completan las operaciones.
     */
    async getSpents() {
        console.log("Entra en getSpents");
        /*     if (this.selectedVehicle?.id) {
                this.spentsSvc.getAll(this.selectedVehicle?.id).subscribe(s => {
                    for (var i = 0; i < s.data.length; i++) {
                        var temp = s.data[i];
                        var newSpent: Spent = {
                            id: temp.id,
                            date: temp.date,
                            amount: temp.amount,
                            provider: temp.provider.data.id,
                            vehicle: temp.vehicle.data.id
                        }
                        this.spentsSvc.updateSpent(newSpent)
                    }
                });
            } */
    }

    /**
     * Maneja la creación de un nuevo gasto asociado a un vehículo.
     * Abre un formulario para introducir los detalles del nuevo gasto y realiza las operaciones correspondientes.
     * @method onNewSpent
     * @param {number} vehicleId - Identificador del vehículo asociado al gasto.
     * @return {void}
     */
    onNewSpent(vehicleId: number) {
        var onDismiss = async (info: any) => {
            console.log(info)
            console.log(vehicleId)
            /*    switch (info.role) {
                   case 'ok': {
                       var vehicle = this.firebaseMappingSvc.mapFBVehicle(info.data)
                       var ref = await this.firebaseSvc.createDocument("vehicle", vehicle)
                       this.updateUser(info, ref)
                       break;
                   }
                   default: {
                       console.error("No debería entrar");
                   }
               } */
        }
        this.presentFormSpents(null, vehicleId, onDismiss);
        /*         var onDismiss = (info: any) => {
                    switch (info.role) {
                        case 'ok': {
                            this.spentsSvc.addSpent(info.data).subscribe(async user => {
                                this.utilSvc.showToast("Gasto creado correctamente", "success", "bottom")
                                if (this.user)
                                    this.reloadSpents(this.user);
                            })
                            break;
                        }
                        default: {
                            console.error("No debería entrar");
                        }
                    }
                }
                this.presentFormSpents(null, vehicleId, onDismiss); */
    }

    /**
     * Maneja el evento de clic en "Editar" para un gasto.
     * Abre un formulario prellenado con los detalles del gasto y realiza las operaciones correspondientes.
     * @method onEditSpentClicked
     * @param {StrapiSpent} spent - Objeto de gasto a editar.
     * @return {void}
     */
    public async onEditSpentClicked(spent: any) { // StrapiSpent
        console.log(spent)
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

    /**
     * Recarga la lista de vehículos y gastos del usuario proporcionado.
     * @method reloadSpents
     * @param {User} user - Objeto de usuario.
     * @return {void}
     */
    reloadSpents(user: User) {/* 
        if (user?.id) {
            this.vehiclesSvc.getAll(user.id).subscribe();
            if (this.selectedVehicle)
                this.spentsSvc.getAll(this.selectedVehicle.id).subscribe();
        } */
    }

    /**
     * Convierte un array de proveedores de Strapi a un array de proveedores genéricos.
     * @method mapToStrapiProviderToProvider
     * @param {StrapiProvider[]} strapiProviders - Array de proveedores de Strapi.
     * @returns {Provider[]} - Array de proveedores genéricos.
     */
    private mapToStrapiProviderToProvider(strapiProviders: StrapiProvider[]): Provider[] {
        return strapiProviders.map((strapiProvider: StrapiProvider) => ({
            id: strapiProvider.id,
            name: strapiProvider.name,
            category: strapiProvider.category,
            phone: strapiProvider.phone,
            users_permissions_user: strapiProvider.users_permissions_user
        }));
    }

    /**
     * Presenta un formulario para la gestión de gastos.
     * @async
     * @method presentFormSpents
     * @param {Spent | null} data - Datos del gasto para prellenar el formulario (puede ser nulo para un nuevo gasto).
     * @param {number} _vehicleId - Identificador del vehículo asociado al gasto.
     * @param {(result: any) => void} onDismiss - Función que se llama cuando se cierra el formulario, proporcionando el resultado.
     * @return {Promise<void>} - Promesa que se resuelve cuando se ha presentado el formulario.
     */
    async presentFormSpents(data: Spent | null, _vehicleId: number, onDismiss: (result: any) => void) {
        const modal = await this.modal.create({
            component: SpentFormComponent,
            componentProps: {
                spent: data,
                vehicleId: _vehicleId,
                providers: this.providers,
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



