import { FirebaseMappingService } from './api/firebase/firebase-mapping.service';
import { FirebaseService } from './api/firebase/firebase.service';
import { Injectable } from '@angular/core';
import { LocalDataService } from './api/local-data.service';
import { UtilsService } from './utils.service';
import { Provider } from '../interfaces/Provider';

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
                try {
                    // var userId = this.localDataSvc.getUser().value!!.userId
                    var providersList: Provider[] = this.localDataSvc.getProviders().value!!;
                    var provider = this.firebaseMappingSvc.mapFBProvider(info.data);
                    providersList.push(provider)
                    await this.firebaseSvc.updateDocument("providers", info.data.userId, { "providers": providersList })
                    this.utilsSvc.showToast(this.utilsSvc.getTransMsg("newProviderOk"), "secondary", "bottom");
                } catch (e) {
                    console.error(e);
                    this.utilsSvc.showToast(this.utilsSvc.getTransMsg("newProviderError"), "danger", "top");
                }
            }
        }
    }
    editProvider(info: any, provider: Provider) {
        var user = this.localDataSvc.getUser().value;
        var providersList = this.localDataSvc.getProviders().value
        switch (info.role) {
            case 'ok': {
                var providersFiltered: any = {
                    providers: providersList?.map(_provider => {
                        return (_provider.providerId == provider.providerId) ? info.data : _provider
                    })
                }
                try {
                    this.firebaseSvc.updateDocument("providers", user!.uuid, providersFiltered);
                    this.utilsSvc.showToast(this.utilsSvc.getTransMsg("editProviderOk"), "secondary", "bottom");
                } catch (e) {
                    console.error(e);
                    this.utilsSvc.showToast(this.utilsSvc.getTransMsg("editProviderError"), "danger", "top");
                }
            }
                break;
            case 'delete': {
                var providersFiltered: any = {
                    providers: providersList?.filter(_provider => {
                        return _provider.providerId != info.data.providerId;
                    })
                }
                try {
                    this.firebaseSvc.updateDocument("providers", user!.uuid, providersFiltered);
                    this.utilsSvc.showToast(this.utilsSvc.getTransMsg("deleteProviderOk"), "secondary", "bottom");
                } catch (e) {
                    console.error(e);
                    this.utilsSvc.showToast(this.utilsSvc.getTransMsg("deleteProviderError"), "danger", "top");
                }
            }
                break;
            default: {
                console.error("No debería entrar: editProvider");
            }
        }
    }
}
