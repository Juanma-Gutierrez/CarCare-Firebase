import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/core/services/api/firebase/FirebaseService';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';
import { ModalController } from '@ionic/angular';
import { PROVIDERS } from 'src/app/core/services/const.service';
import { Provider } from 'src/app/core/interfaces/Provider';
import { ProviderService } from 'src/app/core/services/provider.service';
import { ProvidersFormComponent } from './providers-form/providers-form.component';
import { Unsubscribe } from 'firebase/firestore';

@Injectable({
    providedIn: 'root'
})
@Component({
    selector: 'app-providers',
    templateUrl: './providers.page.html',
    styleUrls: ['./providers.page.scss'],
})
export class ProvidersPage implements OnInit, OnDestroy {
    private unsubscribes: (Unsubscribe | null)[] = []

    constructor(
        private firebaseSvc: FirebaseService,
        private modal: ModalController,
        private providerSvc: ProviderService,
        public localDataSvc: LocalDataService,
    ) { }


    async ngOnInit() {
        var user = this.localDataSvc.getUser().value;
        this.unsubscribes.push(this.firebaseSvc.subscribeToDocument(PROVIDERS, user!.userId, this.localDataSvc.getProviders(), (data) => {
            return data[PROVIDERS];
        }));
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

    ngOnDestroy(): void {
        this.unsubscribes.forEach(uns => { if (uns) uns() });
    }
}




