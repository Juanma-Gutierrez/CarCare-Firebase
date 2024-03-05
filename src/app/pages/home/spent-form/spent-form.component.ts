import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Provider } from 'src/app/core/interfaces/Provider';
import { Spent } from 'src/app/core/interfaces/Spent';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';
import { generateId } from 'src/app/core/services/utils.service';

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
            console.log(_spent.spentId)
            this.form.controls['spentId'].setValue(_spent.spentId);
            this.form.controls['date'].setValue(_spent.date);
            this.form.controls['amount'].setValue(_spent.amount);
            this.form.controls['providerId'].setValue(_spent.providerId);
            this.form.controls['providerName'].setValue(_spent.providerName);
            this.form.controls['observations'].setValue(_spent.observations);
        }
    }

    @Input() providers: Provider[] = [];
    public providerName?: String;

    constructor(
        private _modal: ModalController,
        private formBuilder: FormBuilder,
        private localDataSvc: LocalDataService,
    ) {
        console.log(this._vehicle)
        this.form = this.formBuilder.group({
            amount: [0, Validators.required],
            date: [this.today.toISOString(), Validators.required],
            observations: [''],
            providerId: [''],
            providerName: ['', Validators.required],
            spentId: [generateId()],
            vehicle: [this._vehicle]
        });
    }

    ngOnInit() {
        this.providerName = this.spent?.providerName;
    }

    getVehicle(): number {
        return this._vehicle
    }

    onSelection(event: any) {
        const provider: Provider = event.detail.value;
        this.selectedProvider = provider;
        this.form.controls['providerName'].setValue(provider.name);
        this.form.controls['providerId'].setValue(provider.providerId);
        this.form.markAsDirty();
    }

    onCancel() {
        this._modal.dismiss(null, 'cancel');
    }

    onSubmit() {
        this._modal.dismiss(this.form.value, 'ok');
    }

    onDelete() {
        this._modal.dismiss(this.form.value, 'delete');
    }
}