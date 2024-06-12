import { Injectable } from '@angular/core';

import { Provider } from '../interfaces/Provider';
import { Spent } from '../interfaces/Spent';
import { Vehicle } from '../interfaces/Vehicle';
import { FirebaseMappingService } from './api/firebase/firebase-mapping.service';
import { FirebaseService } from './api/firebase/FirebaseService';
import { LocalDataService } from './api/local-data.service';
import { MyToast, PROVIDER, VEHICLE } from './const.service';
import { UtilsService } from './utils.service';

/**
 * Represents a service for managing providers.
 */
@Injectable({
    providedIn: 'root'
})
export class ProviderService {
    /**
     * Creates an instance of ProviderService.
     * @param utilsSvc - The utility service for common functions.
     * @param firebaseMappingSvc - The service for mapping Firebase data.
     * @param firebaseSvc - The Firebase service for data operations.
     * @param localDataSvc - The service for managing local data.
     */
    constructor(
        private utilsSvc: UtilsService,
        private firebaseMappingSvc: FirebaseMappingService,
        private firebaseSvc: FirebaseService,
        private localDataSvc: LocalDataService,
    ) { }

    /**
     * Creates a new provider based on the provided information.
     * @param info - An object containing details about the provider creation.
     *   - `role`: The role of the provider (e.g., 'ok').
     *   - `data`: Additional data related to the provider.
     * @returns A promise that resolves when the provider creation is complete.
     */
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

    /**
     * Edits or deletes a provider based on the provided information and the specified provider.
     * @param info - An object containing details about the action (e.g., 'ok' for editing, 'delete' for deletion).
     * @param provider - The provider to be edited or deleted.
     * @returns A promise that resolves when the edit or delete operation is complete.
     */
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

    /**
     * Edits a provider in the list of providers.
     * @param {Provider[] | null} providersList - The list of providers.
     * @param {any} info - Additional information for the edit operation.
     * @param {Provider} provider - The provider to be edited.
     * @returns {void}
     */
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

    /**
     * Deletes a provider from the list of providers.
     * @param {Provider[] | null} providersList - The list of providers.
     * @param {any} info - Additional information related to the delete operation.
     * @returns {void}
     */
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


