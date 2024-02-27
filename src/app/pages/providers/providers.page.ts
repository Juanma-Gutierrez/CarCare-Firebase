import { Component, Injectable, OnInit } from '@angular/core';
import { FBProvider } from 'src/app/core/services/api/firebase/interfaces/FBProvider';
import { FirebaseMappingService } from 'src/app/core/services/api/firebase/firebase-mapping.service';
import { FirebaseService } from 'src/app/core/services/api/firebase/firebase.service';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';
import { ModalController } from '@ionic/angular';
import { Provider } from 'src/app/core/interfaces/Provider';
import { ProvidersFormComponent } from './providers-form/providers-form.component';
import { ProvidersService } from 'src/app/core/services/api/providers.service';
import { UtilsService } from 'src/app/core/services/utils.service';

@Injectable({
    providedIn: 'root'
})
@Component({
    selector: 'app-providers',
    templateUrl: './providers.page.html',
    styleUrls: ['./providers.page.scss'],
})
export class ProvidersPage implements OnInit {
    constructor(
        public providersSvc: ProvidersService,
        private utilsSvc: UtilsService,
        private modal: ModalController,
        private firebaseSvc: FirebaseService,
        private firebaseMappingSvc: FirebaseMappingService,
        public localDataSvc: LocalDataService
    ) { }


    async ngOnInit() {
        var user = this.localDataSvc.getUser().value;
        this.firebaseSvc.subscribeToDocument("providers", user!.userId, this.localDataSvc.getProviders(), (data) => {
            return data['providers']
        })
        //var providers: any = await this.firebaseSvc.getDocument("provider", user!.id)
        //this.localDataSvc.setProviders(providers.data.providers)
    }

    onEditProviderClicked(provider: FBProvider) {
        console.log(provider)
        var onDismiss = (info: any) => {
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
}




