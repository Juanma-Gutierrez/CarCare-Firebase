import { FirebaseMappingService } from './api/firebase/firebase-mapping.service';
import { FirebaseService } from './api/firebase/firebase.service';
import { Injectable } from '@angular/core';
import { LocalDataService } from './api/local-data.service';
import { SUCCESS, BOTTOM, DANGER, TOP, UtilsService } from './utils.service';
import { Provider } from '../interfaces/Provider';
import { CustomTranslateService } from './custom-translate.service';

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
                if (confirm) {
                    try {
                        var providersList: Provider[] = this.localDataSvc.getProviders().value!!;
                        var provider = this.firebaseMappingSvc.mapFBProvider(info.data);
                        providersList.push(provider)
                        await this.firebaseSvc.updateDocument("providers", info.data.userId, { "providers": providersList })
                        this.utilsSvc.showToast("message.providers.newProviderOk", SUCCESS, BOTTOM);
                    } catch (e) {
                        console.error(e);
                        this.utilsSvc.showToast("message.providers.newProviderError", DANGER, TOP);
                    }
                } else {
                    this.utilsSvc.showToast("message.confirm.actionCancel", DANGER, BOTTOM);
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
                        this.firebaseSvc.updateDocument("providers", user!.uuid, providersFiltered);
                        this.utilsSvc.showToast("message.providers.editProviderOk", SUCCESS, BOTTOM);
                    } catch (e) {
                        console.error(e);
                        this.utilsSvc.showToast("message.providers.editProviderError", DANGER, TOP);
                    }
                } else {
                    this.utilsSvc.showToast("message.confirm.actionCancel", DANGER, BOTTOM);
                }
                break;
            }
            case 'delete': {
                const confirm = await this.utilsSvc.showConfirm("message.providers.confirmDelete");
                if (confirm) {
                    var providersFiltered: any = {
                        providers: providersList?.filter(_provider => {
                            return _provider.providerId != info.data.providerId;
                        })
                    }
                    try {
                        this.firebaseSvc.updateDocument("providers", user!.uuid, providersFiltered);
                        this.utilsSvc.showToast("message.providers.deleteProviderOk", SUCCESS, BOTTOM);
                    } catch (e) {
                        console.error(e);
                        this.utilsSvc.showToast("message.providers.deleteProviderError", DANGER, TOP);
                    }
                } else {
                    this.utilsSvc.showToast("message.confirm.actionCancel", DANGER, BOTTOM);
                }
                break;
            }
            default: {
                console.error("No debería entrar: editProvider");
            }
        }
    }
}
