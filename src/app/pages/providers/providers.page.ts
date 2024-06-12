import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Unsubscribe } from 'firebase/firestore';
import { LogType, OperationLog } from 'src/app/core/interfaces/ItemLog';
import { Provider } from 'src/app/core/interfaces/Provider';
import { FirebaseService } from 'src/app/core/services/api/firebase/FirebaseService';
import { Mapping } from 'src/app/core/services/api/firebase/mapping';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';
import { LOG_CONTENT, PROVIDER } from 'src/app/core/services/const.service';
import { ProviderService } from 'src/app/core/services/provider.service';

import { ProvidersFormComponent } from './providers-form/providers-form.component';

/**
 * Providers page component
 */
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

    /**
     * Constructs the ProvidersPage component.
     * @constructor
     * @param {FirebaseService} firebaseSvc - The Firebase service for database operations.
     * @param {ModalController} modal - The modal controller service for displaying modals.
     * @param {ProviderService} providerSvc - The provider service for provider-related operations.
     * @param {LocalDataService} localDataSvc - The local data service for accessing local data.
     */
    constructor(
        private firebaseSvc: FirebaseService,
        private modal: ModalController,
        private providerSvc: ProviderService,
        public localDataSvc: LocalDataService,
    ) { }

    /**
     * Initializes the ProvidersPage component.
     * Subscribes to the provider document in Firebase database.
     * @async
     * @returns {Promise<void>}
     */
    async ngOnInit() {
        var user = this.localDataSvc.getUser().value;
        this.unsubscribes.push(this.firebaseSvc.subscribeToDocument(PROVIDER, user!.userId, this.localDataSvc.getProviders(), (data) => {
            return data['providers'];
        }));
    }

    /**
     * Handles the event when the create provider button is clicked.
     * Opens a modal form for creating a new provider.
     * @returns {void}
     */
    onCreateProviderClicked() {
        var onDismiss = async (info: any) => {
            try {
                const itemLog = new Mapping(this.localDataSvc).generateItemLog(
                    LOG_CONTENT.PROVIDER_CREATION_SUCCESSFULLY,
                    OperationLog.PROVIDER,
                    LogType.INFO
                )
                this.firebaseSvc.fbSaveLog(itemLog);
                this.providerSvc.createProvider(info);
            } catch (e: any) {
                console.log("Error: ", e.message)
                const itemLog = new Mapping(this.localDataSvc).generateItemLog(
                    LOG_CONTENT.PROVIDER_CREATION_ERROR,
                    OperationLog.PROVIDER,
                    LogType.ERROR
                )
                this.firebaseSvc.fbSaveLog(itemLog);
            }
        }
        this.presentForm(null, onDismiss);
    }

    /**
     * Handles the event when the edit provider button is clicked.
     * Opens a modal form for editing the provider.
     * @param {Provider} provider - The provider to be edited.
     * @returns {void}
     */
    onEditProviderClicked(provider: Provider) {
        var onDismiss = (info: any) => {
            const content_successful = info.role == "delete" ? LOG_CONTENT.PROVIDER_DELETION_SUCCESSFULLY : LOG_CONTENT.PROVIDER_EDITION_SUCCESSFULLY
            const content_error = info.role == "delete" ? LOG_CONTENT.PROVIDER_DELETION_ERROR : LOG_CONTENT.PROVIDER_EDITION_ERROR
            try {
                const itemLog = new Mapping(this.localDataSvc).generateItemLog(
                    content_successful,
                    OperationLog.PROVIDER,
                    LogType.INFO
                )
                this.firebaseSvc.fbSaveLog(itemLog);
                this.providerSvc.editOrDeleteProvider(info, provider);
            } catch (e: any) {
                console.log("Error: ", e.message)
                const itemLog = new Mapping(this.localDataSvc).generateItemLog(
                    content_error,
                    OperationLog.PROVIDER,
                    LogType.ERROR
                )
                this.firebaseSvc.fbSaveLog(itemLog);
            }
        }
        this.presentForm(provider, onDismiss);
    }

    /**
     * Presents a modal form for creating or editing a provider.
     * @async
     * @param {Provider | null} data - The provider data to populate the form with (null for new provider).
     * @param {(result: any) => void} onDismiss - The callback function to handle the modal dismiss event.
     * @returns {Promise<void>}
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
     * Cleans up subscriptions when the component is destroyed.
     * Unsubscribes from Firebase document subscription.
     * @returns {void}
     */
    ngOnDestroy(): void {
        this.unsubscribes.forEach(uns => { if (uns) uns() });
    }
}




