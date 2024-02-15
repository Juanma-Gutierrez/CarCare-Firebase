import { ApiService } from 'src/app/core/services/api/api.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Provider } from 'src/app/core/interfaces/Provider';
import { ProvidersFormComponent } from './providers-form/providers-form.component';
import { ProvidersService } from 'src/app/core/services/api/providers.service';
import { StrapiProvider } from 'src/app/core/services/api/strapi/interfaces/strapi-providers';
import { User } from 'src/app/core/interfaces/User';
import { UtilsService } from 'src/app/core/services/utils.service';
import { FirebaseService } from 'src/app/core/services/api/firebase/firebase.service';
import { FirebaseMappingService } from 'src/app/core/services/api/firebase/firebase-mapping.service';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';


@Injectable({
    providedIn: 'root'
})
@Component({
    selector: 'app-providers',
    templateUrl: './providers.page.html',
    styleUrls: ['./providers.page.scss'],
})
export class ProvidersPage implements OnInit {
    // public user: User | null = null;

    /**
     * Constructor de la página de proveedores.
     * @constructor
     * @param {ApiService} apiSvc - Servicio para realizar operaciones generales de la API.
     * @param {ProvidersService} providersSvc - Servicio para gestionar operaciones relacionadas con proveedores.
     * @param {UtilsService} utilsSvc - Servicio interno para manejar la interfaz de usuario y mostrar mensajes.
     * @param {ModalController} modal - Controlador del modal para gestionar el estado del modal.
     */
    constructor(
        private apiSvc: ApiService,
        public providersSvc: ProvidersService,
        private utilsSvc: UtilsService,
        private modal: ModalController,
        private firebaseSvc: FirebaseService,
        private firebaseMappingSvc: FirebaseMappingService,
        private localDataSvc: LocalDataService
    ) { }

    /**
     * Método invocado al inicializar la página.
     * @method ngOnInit
     * @return {void}
     */
    ngOnInit() {
        /*         this.user = this.apiSvc.getUser();
                this.apiSvc.user$.subscribe(user => {
                    if (user?.id)
                        this.getProviders(user.id);
                }) */
        var user = this.localDataSvc.getUser().value
        this.firebaseSvc.subscribeToDocument("providers", user!.id, this.localDataSvc.getProviders());
    }




    /**
     * Obtiene la lista de proveedores para un usuario específico.
     * @method getProviders
     * @param {number} userId - Identificador del usuario.
     * @return {void}
     */
    async getProviders(userId: number) {
        this.providersSvc.getAll(userId).subscribe();
    }

    /**
     * Maneja el evento de clic en el botón de editar proveedor.
     * @method onEditProviderClicked
     * @param {Provider} provider - Proveedor que se va a editar.
     * @return {void}
     */
    onEditProviderClicked(provider: Provider) {
        var onDismiss = (info: any) => {
            switch (info.role) {
                case 'ok': {
                    this.providersSvc.updateProvider(info.data).subscribe(async user => {
                        this.utilsSvc.showToast("Proveedor actualizado", "success", "bottom")
                        // this.reloadProviders(this.user);
                    })
                }
                    break;
                case 'delete': {
                    this.providersSvc.deleteProvider(info.data).subscribe(async user => {
                        this.utilsSvc.showToast("Proveedor eliminado", "success", "bottom")
                        // this.reloadProviders(this.user);
                    })
                }
                    break;
                default: {
                    console.error("No debería entrar");
                }
            }
        }
        var newProvider: StrapiProvider = {
            name: provider.name,
            phone: provider.phone,
            category: provider.category
        }
        this.presentForm(provider, onDismiss);
    }

    /**
     * Maneja el evento de clic en el botón de nuevo proveedor.
     * @method onNewProvider
     * @return {void}
     */
    onNewProvider() {
        var onDismiss = async (info: any) => {
            switch (info.role) {
                case 'ok': {
                    var user = this.localDataSvc.getUser().value!!
                    var providers = this.localDataSvc.getProviders().value
                    console.log(providers)
                    if (!providers)
                        providers = []
                    var provider = this.firebaseMappingSvc.mapFBProvider(info.data);
                    console.log("PROVIDER: ", provider)
                    // TODO está fallando aquí, da error el .push, dice que no es una función de providers
                    providers.push(provider)
                    var providersToSave = { "providers": providers }
                    try {
                        const providersSnaphot = await this.firebaseSvc.getDocument("providers", user.id!!)
                        if (providersSnaphot) {
                            console.log("update document")
                            await this.firebaseSvc.updateDocument("providers", user.id!!, providersToSave)
                        }
                    }
                    catch {
                        console.log("create document")
                        await this.firebaseSvc.createDocumentWithId("providers", providersToSave, user.id!!)
                    }
                    break;
                }
                default: {
                    console.error("No debería entrar");
                }
            }

            /*
                    var user = this.localDataSvc.getUser().value!! // Carga el usuario
        var vehiclesList = user.vehicles; // Carga la lista de vehículos
        vehiclesList.push(vehiclePreview); // Añade el nuevo vehículo preview
        await this.firebaseSvc.updateDocument("user", user.id!!, user)
            */
        }
        this.presentForm(null, onDismiss);
        /*     onNewVehicle() {
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
            } */


    }

    /**
     * Muestra un formulario modal para la creación o edición de proveedores.
     * @method presentForm
     * @param {Provider | null} data - Datos del proveedor para editar (si es null, se creará un nuevo proveedor).
     * @param {(result: any) => void} onDismiss - Función que se ejecuta al cerrar el formulario modal.
     * @return {Promise<void>}
     */
    async presentForm(data: Provider | null, onDismiss: (result: any) => void) {
        const modal = await this.modal.create({
            component: ProvidersFormComponent,
            componentProps: {
                provider: data
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
     * Recarga la lista de proveedores para el usuario actual.
     * @method reloadProviders
     * @param {User | null} user - Usuario para el cual recargar la lista de proveedores.
     * @return {void}
     */
    reloadProviders(user: User | null) {
        if (user?.id)
            this.providersSvc.getAll(user.id).subscribe();
    }
}




