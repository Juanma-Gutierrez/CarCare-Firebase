import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Provider } from 'src/app/core/interfaces/Provider';
import { Spent } from 'src/app/core/interfaces/Spent';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';
import { generateId } from 'src/app/core/services/utils.service';

/**
 * Component for managing a spent form.
 */
@Component({
    selector: 'app-spent-form',
    templateUrl: './spent-form.component.html',
    styleUrls: ['./spent-form.component.scss'],
})
export class SpentFormComponent implements OnInit {

    today: Date = new Date()
    form: FormGroup;
    mode: 'New' | 'Edit' = 'New';
    public selectedProvider: Provider | undefined = undefined;
    private _vehicle: number = -1;
    @Input() set vehicleId(vehiclePassed: number) {
        this._vehicle = vehiclePassed; { }
        this.form.controls['vehicle'].setValue(this._vehicle);
    };
    @Input() set spent(_spent: Spent | null) {
        var selectedProvTemp = this.localDataSvc.getProviders().value!.find(p => p.providerId == _spent?.providerId);
        if (selectedProvTemp != undefined)
            this.selectedProvider = selectedProvTemp;
        if (_spent) {
            this.mode = 'Edit';
            this.form.controls['amount'].setValue(_spent.amount);
            this.form.controls['created'].setValue(_spent.created);
            this.form.controls['date'].setValue(_spent.date);
            this.form.controls['observations'].setValue(_spent.observations);
            this.form.controls['providerId'].setValue(_spent.providerId);
            this.form.controls['providerName'].setValue(_spent.providerName);
            this.form.controls['spentId'].setValue(_spent.spentId);
        }
    }

    @Input() providers: Provider[] = [];
    public providerName?: String;

    /**
     * Constructs a new SpentFormComponent.
     * @param {ModalController} _modal - The modal controller for managing modals.
     * @param {FormBuilder} formBuilder - The form builder for building the form.
     * @param {LocalDataService} localDataSvc - The service for local data operations.
     */
    constructor(
        private _modal: ModalController,
        private formBuilder: FormBuilder,
        private localDataSvc: LocalDataService,
    ) {
        this.form = this.formBuilder.group({
            amount: [0, Validators.required],
            created: [new Date().toISOString()],
            date: [this.today.toISOString(), Validators.required],
            observations: [''],
            providerId: [''],
            providerName: ['', Validators.required],
            spentId: [generateId()],
            vehicle: [this._vehicle]
        });
    }

    /**
     * Initializes the SpentFormComponent.
     */
    ngOnInit() {
        this.providerName = this.spent?.providerName;
    }

    /**
     * Retrieves the vehicle ID.
     * @returns {number} - The vehicle ID.
     */
    getVehicle(): number {
        return this._vehicle
    }

    /**
     * Event handler for when a provider is selected.
     * @param {any} event - The event containing the selected provider.
     */
    onSelection(event: any) {
        const provider: Provider = event.detail.value;
        this.selectedProvider = provider;
        this.form.controls['providerName'].setValue(provider.name);
        this.form.controls['providerId'].setValue(provider.providerId);
        this.form.markAsDirty();
    }

    /**
     * Dismisses the modal with a cancellation result.
     */
    onCancel() {
        this._modal.dismiss(null, 'cancel');
    }

    /**
     * Submits the form and dismisses the modal with an ok result.
     */
    onSubmit() {
        this._modal.dismiss(this.form.value, 'ok');
    }

    /**
     * Dismisses the modal with a delete result.
     */
    onDelete() {
        this._modal.dismiss(this.form.value, 'delete');
    }
}