import { Injectable } from '@angular/core';
import { Provider } from '../interfaces/Provider';
import { Spent } from '../interfaces/Spent';
import { FirebaseService } from './api/firebase/FirebaseService';
import { FirebaseMappingService } from './api/firebase/firebase-mapping.service';
import { LocalDataService } from './api/local-data.service';
import { MyToast, PROVIDER, VEHICLE } from './const.service';
import { UtilsService } from './utils.service';

@Injectable({
    providedIn: 'root'
})
export class ProviderService {

    constructor(
        private utilsSvc: UtilsService,
        private firebaseMappingSvc: FirebaseMappingService,
        private firebaseSvc: FirebaseService,
        private localDataSvc: LocalDataService,
    ) { }

    async createProvider(info: any) {
        switch (info.role) {
            case 'ok': {
                const confirm = await this.utilsSvc.showConfirm("message.providers.confirmCreation");
                let dasd = MyToast.Color
                if (confirm) {
                    try {
                        var providersList: Provider[] = this.localDataSvc.getProviders().value!!;
                        if (providersList == undefined) providersList = [];
                        var provider: Provider = this.firebaseMappingSvc.mapFBProvider(info.data);
                        providersList.push(provider)
                        var providerToUpdate = this.firebaseMappingSvc.providerToUpdate(providersList);
                        await this.firebaseSvc.updateDocument(PROVIDER, info.data.userId, providerToUpdate)
                        this.utilsSvc.showToast("message.providers.newProviderOk", MyToast.Color.SUCCESS, MyToast.Position.BOTTOM);
                    } catch (e) {
                        console.error(e);
                        this.utilsSvc.showToast("message.providers.newProviderError", MyToast.Color.DANGER, MyToast.Position.TOP);
                    }
                } else {
                    this.utilsSvc.showToast("message.confirm.actionCancel", MyToast.Color.DANGER, MyToast.Position.BOTTOM);
                }
                break;
            }
            default: {
                console.error("No debería entrar: createProvider");
            }
        }
    }
    async editProvider(info: any, provider: Provider) {
        var user = this.localDataSvc.getUser().value;
        var providersList = this.localDataSvc.getProviders().value
        console.log(info)
        console.log(provider)
        switch (info.role) {
            case 'ok': {
                const confirm = await this.utilsSvc.showConfirm("message.providers.confirmEdit");
                if (confirm) {
                    var providersFiltered: any = {
                        providers: providersList?.map(_provider => {
                            return (_provider.providerId == provider.providerId) ? info.data : _provider
                        })
                    }
                    try {
                        this.firebaseSvc.updateDocument(PROVIDER, user!.userId, providersFiltered);
                        this.utilsSvc.showToast("message.providers.editProviderOk", MyToast.Color.SUCCESS, MyToast.Position.BOTTOM);
                    } catch (e) {
                        console.error(e);
                        this.utilsSvc.showToast("message.providers.editProviderError", MyToast.Color.DANGER, MyToast.Position.TOP);
                    }
                } else {
                    this.utilsSvc.showToast("message.confirm.actionCancel", MyToast.Color.DANGER, MyToast.Position.BOTTOM);
                }
                break;
            }
            case 'delete': {
                var vehiclesList = this.localDataSvc.getUser().value?.vehicles;
                vehiclesList?.forEach(vehicle => {
                    this.firebaseSvc.getDocument(VEHICLE, vehicle.vehicleId).then(data => {
                        var spent = data.data['spents']
                        spent.forEach((s: Spent) => {
                            if (provider.providerId == s.providerId) {
                                //TODO Recorre todos los gastos de todos los vehículos y debe eliminar
                                // el gasto del proveedor de cada uno de los vehículos
                                // Crear función que haga la edición/borrado en función de lo que se le pase
                            }
                        });
                    })
                })
                // Elimina el documento del proveedor
                this.deleteProvider(providersList, info);
                break;
            }
            default: {
                console.error("No debería entrar: editProvider");
            }
        }
    }

    async deleteProvider(providersList: Provider[] | null, info: any) {
        const confirm = await this.utilsSvc.showConfirm("message.providers.confirmDelete");
        if (confirm) {
            var providersFiltered: any = {
                providers: providersList?.filter(_provider => {
                    return _provider.providerId != info.data.providerId;
                })
            }
            try {
                this.firebaseSvc.updateDocument(PROVIDER, info.userId, providersFiltered);
                this.utilsSvc.showToast("message.providers.deleteProviderOk", MyToast.Color.SUCCESS, MyToast.Position.BOTTOM);
            } catch (e) {
                console.error(e);
                this.utilsSvc.showToast("message.providers.deleteProviderError", MyToast.Color.DANGER, MyToast.Position.TOP);
            }
        } else {
            this.utilsSvc.showToast("message.confirm.actionCancel", MyToast.Color.DANGER, MyToast.Position.BOTTOM);
        }
    }
}


