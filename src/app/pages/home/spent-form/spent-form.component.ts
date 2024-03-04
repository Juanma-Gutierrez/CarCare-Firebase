import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Provider } from 'src/app/core/interfaces/Provider';
import { Spent } from 'src/app/core/interfaces/Spent';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
    selector: 'app-spent-form',
    templateUrl: './spent-form.component.html',
    styleUrls: ['./spent-form.component.scss'],
})
export class SpentFormComponent implements OnInit {

    today: Date = new Date()
    form: FormGroup;
    mode: 'New' | 'Edit' = 'New';
    public selectedProvider: string | undefined = undefined;


    private _vehicle: number = -1;
    @Input() set vehicleId(vehiclePassed: number) {
        this._vehicle = vehiclePassed; { }
        this.form.controls['vehicle'].setValue(this._vehicle);
    };
    @Input() set spent(_spent: Spent | null) {
        this.selectedProvider = _spent?.providerName!
        if (_spent) {
            this.mode = 'Edit';
            console.log(_spent.spentId)
            this.form.controls['spentId'].setValue(_spent.spentId);
            this.form.controls['date'].setValue(_spent.date);
            this.form.controls['amount'].setValue(_spent.amount);
            this.form.controls['provider'].setValue(_spent.providerName);
            this.form.controls['providerName'].setValue(_spent.providerName);
            this.form.controls['observations'].setValue(_spent.observations);
        }
    }

    @Input() providers: Provider[] = [];
    public providerName?: String;

    constructor(
        private _modal: ModalController,
        private formBuilder: FormBuilder,
        private utilsSvc: UtilsService,
    ) {
        this.form = this.formBuilder.group({
            spentId: [this.utilsSvc.generateId()],
            date: [this.today.toISOString(), Validators.required],
            amount: [0, Validators.required],
            provider: ['', Validators.required],
            providerName: ['', Validators.required],
            vehicle: [this._vehicle],
            observations: ['']
        });
    }

    ngOnInit() {
        this.providerName = this.spent?.providerName;
    }


    getVehicle(): number {
        return this._vehicle
    }


    onSelection(event: any) {
        const providerName = event.detail.value;
        this.selectedProvider = providerName;
        this.form.controls['providerName'].setValue(providerName);
        this.form.controls['provider'].setValue(providerName);
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