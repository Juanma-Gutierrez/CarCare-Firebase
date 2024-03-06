import { Injectable } from '@angular/core';
import { Provider } from '../interfaces/Provider';
import { Spent } from '../interfaces/Spent';
import { Vehicle } from '../interfaces/Vehicle';
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
                        var provider: Provider = this.firebaseMappingSvc.mapProvider(info.data);
                        providersList.push(provider)
                        var providerToUpdate = this.firebaseMappingSvc.providerToUpdate(providersList);
                        await this.firebaseSvc.updateDocument(PROVIDER, info.data.userId, providerToUpdate)
                        await this.utilsSvc.showToast("message.providers.newProviderOk", MyToast.Color.SUCCESS, MyToast.Position.BOTTOM);
                    } catch (e) {
                        console.error(e);
                        await this.utilsSvc.showToast("message.providers.newProviderError", MyToast.Color.DANGER, MyToast.Position.TOP);
                    }
                } else {
                    await this.utilsSvc.showToast("message.confirm.actionCancel", MyToast.Color.DANGER, MyToast.Position.BOTTOM);
                }
                break;
            }
            default: {
                console.error("No debería entrar: createProvider");
            }
        }
    }
    async editOrDeleteProvider(info: any, provider: Provider) {
        var providersList = this.localDataSvc.getProviders().value
        switch (info.role) {
            case 'ok': {
                const confirm = await this.utilsSvc.showConfirm("message.providers.confirmEdit");
                if (confirm) {
                    this.editProvider(providersList, info, provider);
                } else {
                    await this.utilsSvc.showToast("message.confirm.actionCancel", MyToast.Color.DANGER, MyToast.Position.BOTTOM);
                }
                break;
            }
            case 'delete': {
                const confirm = await this.utilsSvc.showConfirm("message.providers.confirmDelete");
                if (confirm) {
                    await this.deleteProvider(providersList, info).catch(err => console.error(err));
                } else {
                    await this.utilsSvc.showToast("message.confirm.actionCancel", MyToast.Color.DANGER, MyToast.Position.BOTTOM);
                }
                break;
            }
            default: {
                console.error("No debería entrar: editProvider");
            }
        }
    }

    async editProvider(providersList: Provider[] | null, info: any, provider: Provider) {
        var user = this.localDataSvc.getUser().value;
        var providersFiltered: any = {
            providers: providersList?.map(_provider => {
                return (_provider.providerId == provider.providerId) ? info.data : _provider
            })
        }
        try {
            var vehiclesList = this.localDataSvc.getUser().value?.vehicles;
            var spentListUpdated: Spent[] = [];
            vehiclesList?.forEach(async vehiclePreview => {
                var vehicleToUpdate: Vehicle;
                await this.firebaseSvc.getDocument(VEHICLE, vehiclePreview.vehicleId).then(vehicle => {
                    spentListUpdated = []
                    var spent = vehicle.data['spents']
                    spent.forEach((s: Spent) => {
                        if (provider.providerId == s.providerId) {
                            spentListUpdated.push(this.firebaseMappingSvc.mapSpentWithProvider(s, provider, info))
                        } else {
                            spentListUpdated.push(s)
                        }
                    });
                    vehicle.data['spents'] = spentListUpdated;
                    vehicleToUpdate = this.firebaseMappingSvc.mapVehicle(vehicle.data);
                    this.firebaseSvc.updateDocument(VEHICLE, vehicle.data['vehicleId'], vehicle.data);
                })
            })
            // Actualiza el proveedor
            await this.firebaseSvc.updateDocument(PROVIDER, user!.userId, providersFiltered);
            await this.utilsSvc.showToast("message.providers.editProviderOk", MyToast.Color.SUCCESS, MyToast.Position.BOTTOM);
        } catch (e) {
            console.error(e);
            await this.utilsSvc.showToast("message.providers.editProviderError", MyToast.Color.DANGER, MyToast.Position.TOP);
        }
    }

    async deleteProvider(providersList: Provider[] | null, info: any) {
        var providersFiltered: any = {
            providers: providersList?.filter(_provider => {
                return _provider.providerId != info.data.providerId;
            })
        }
        await this.firebaseSvc.updateDocument(PROVIDER, info.data.userId, providersFiltered).catch(err => { throw new Error(err) });
        await this.utilsSvc.showToast("message.providers.deleteProviderOk", MyToast.Color.SUCCESS, MyToast.Position.BOTTOM).catch(err => { throw new Error(err) });
    }
}


