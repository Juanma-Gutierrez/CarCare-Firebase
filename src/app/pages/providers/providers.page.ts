import { ApiService } from 'src/app/core/services/api/api.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Provider } from 'src/app/core/interfaces/Provider';
import { ProvidersFormComponent } from './providers-form/providers-form.component';
import { ProvidersService } from 'src/app/core/services/api/providers.service';
import { User } from 'src/app/core/interfaces/User';
import { UtilsService } from 'src/app/core/services/utils.service';
import { FirebaseService } from 'src/app/core/services/api/firebase/firebase.service';
import { FirebaseMappingService } from 'src/app/core/services/api/firebase/firebase-mapping.service';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';
import { DocumentReference } from 'firebase/firestore';
import { FBProvider } from 'src/app/core/services/api/firebase/interfaces/FBProvider';


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
        public localDataSvc: LocalDataService
    ) { }

    /**
     * Método invocado al inicializar la página.
     * @method ngOnInit
     * @return {void}
     */
    async ngOnInit() {
        var user = this.localDataSvc.getUser().value;
        this.firebaseSvc.subscribeToDocument("providers", user!.userId, this.localDataSvc.getProviders(), (data) => {
            return data['providers']
        })
        //var providers: any = await this.firebaseSvc.getDocument("provider", user!.id)
        //this.localDataSvc.setProviders(providers.data.providers)
    }

    /**
     * Obtiene la lista de proveedores para un usuario específico.
     * @method getProviders
     * @param {number} userId - Identificador del usuario.
     * @return {void}
     */
    async getProviders(userId: number) {
        //  this.providersSvc.getAll(userId).subscribe();
    }

    onEditProviderClicked(provider: Provider) {
        console.log(provider)
        var onDismiss = (info: any) => {
            var user = this.localDataSvc.getUser().value;
            console.log("userId:", user!.uuid)
            switch (info.role) {
                case 'ok': {
                    console.log("edición del proveedor");
                    /*this.providersSvc.updateProvider(info.data).subscribe(async user => {
                        this.utilsSvc.showToast("Proveedor actualizado", "success", "bottom")
                        // this.reloadProviders(this.user);
                    })
                    */
                }
                    break;
                case 'delete': {
                    var providersList = this.localDataSvc.getProviders().value
                    var providersFiltered = {
                        providers: providersList?.filter(provider => {
                            return provider.providerId != info.data.providerId;
                        })
                    }
                    try {
                        this.firebaseSvc.updateDocument("providers", user!.uuid, providersFiltered);
                        this.utilsSvc.showToast(this.utilsSvc.getTransMsg("deleteProviderOk"), "secondary", "bottom");
                    } catch (e) {
                        console.error(e);
                        this.utilsSvc.showToast(this.utilsSvc.getTransMsg("deleteProviderError"), "danger", "top");
                    }
                    /*
                    this.providersSvc.deleteProvider(info.data).subscribe(async user => {
                        this.utilsSvc.showToast("Proveedor eliminado", "success", "bottom")
                        // this.reloadProviders(this.user);
                    })*/
                }
                    break;
                default: {
                    console.error("No debería entrar");
                }
            }
        }
        this.presentForm(provider, onDismiss);
    }


    onNewProvider() {
        var onDismiss = async (info: any) => {
            switch (info.role) {
                case 'ok': {
                    try {
                        var userId = this.localDataSvc.getUser().value!!.userId
                        var providersList: FBProvider[] = this.localDataSvc.getProviders().value!!;
                        var provider = this.firebaseMappingSvc.mapFBProvider(info.data);
                        providersList.push(provider)
                        await this.firebaseSvc.updateDocument("providers", userId, { "providers": providersList })
                        this.localDataSvc.setProviders(providersList)
                        this.utilsSvc.showToast(this.utilsSvc.getTransMsg("newProviderOk"), "secondary", "bottom");
                    } catch (e) {
                        console.log(e);
                        this.utilsSvc.showToast(this.utilsSvc.getTransMsg("newProviderError"), "danger", "top");
                    }
                }
            }
        }
        this.presentForm(null, onDismiss);
    }

    async updateProvider(info: any, ref: DocumentReference) {
        var provider: FBProvider = {
            providerId: info.data.providerId,
            category: info.data.category,
            name: info.data.name,
            phone: info.data.phone
        }
        var user = this.localDataSvc.getUser().value!! // Carga el usuario
        var providers = this.localDataSvc.getProviders().value!!;
        var providersList = providers;
        // providersList.push(provider);
        await this.firebaseSvc.updateDocument("user", user.uuid!!, user);
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




