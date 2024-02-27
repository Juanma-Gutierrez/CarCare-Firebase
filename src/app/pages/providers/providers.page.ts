import { Component, Injectable, OnInit } from '@angular/core';
import { Provider } from 'src/app/core/interfaces/Provider';
import { FirebaseMappingService } from 'src/app/core/services/api/firebase/firebase-mapping.service';
import { FirebaseService } from 'src/app/core/services/api/firebase/firebase.service';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';
import { ModalController } from '@ionic/angular';
import { ProvidersFormComponent } from './providers-form/providers-form.component';
import { UtilsService } from 'src/app/core/services/utils.service';
import { ProviderService } from 'src/app/core/services/provider.service';

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
        private firebaseMappingSvc: FirebaseMappingService,
        private firebaseSvc: FirebaseService,
        private modal: ModalController,
        private providerSvc: ProviderService,
        private utilsSvc: UtilsService,
        public localDataSvc: LocalDataService,
    ) { }


    async ngOnInit() {
        var user = this.localDataSvc.getUser().value;
        this.firebaseSvc.subscribeToDocument("providers", user!.userId, this.localDataSvc.getProviders(), (data) => {
            return data['providers']
        })
    }

    onEditProviderClicked(provider: Provider) {
        var onDismiss = (info: any) => {
            this.providerSvc.editProvider(info, provider);
        }
        this.presentForm(provider, onDismiss);
    }

    onCreateProviderClicked() {
        var onDismiss = async (info: any) => {
            this.providerSvc.createProvider(info);
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




