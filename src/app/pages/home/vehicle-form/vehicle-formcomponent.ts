import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Spent } from 'src/app/core/interfaces/Spent';
import { Vehicle } from 'src/app/core/interfaces/Vehicle';
import { FirebaseService } from 'src/app/core/services/api/firebase/FirebaseService';
import { VEHICLE } from 'src/app/core/services/const.service';
import { convertDateToLongIsoFormatDate } from 'src/app/core/services/utils.service';

/**
 * Component for managing a vehicle form.
 */
@Component({
    selector: 'app-vehicle-form',
    templateUrl: './vehicle-form.component.html',
    styleUrls: ['./vehicle-form.component.scss'],
})
export class VehicleFormComponent implements OnInit {
    form: FormGroup;
    mode: 'New' | 'Edit' = 'New';
    @Input() set vehicle(_vehicle: Vehicle | null) {
        if (_vehicle) {
            var spentsList: Spent[] = []
            this.firebaseSvc.getDocument(VEHICLE, _vehicle!.vehicleId).then(vehicle => {
                spentsList = vehicle.data['spents'];
                this.mode = 'Edit';
                this.form.controls['available'].setValue(_vehicle.available);
                this.form.controls['brand'].setValue(_vehicle.brand);
                this.form.controls['created'].setValue(convertDateToLongIsoFormatDate(_vehicle.created));
                this.form.controls['category'].setValue(_vehicle.category);
                this.form.controls['model'].setValue(_vehicle.model);
                this.form.controls['plate'].setValue(_vehicle.plate);
                this.form.controls['registrationDate'].setValue(convertDateToLongIsoFormatDate(_vehicle.registrationDate));
                this.form.controls['spents'].setValue(spentsList);
                this.form.controls['vehicleId'].setValue(_vehicle.vehicleId);
            })
        }
    }

    /**
     * Constructs a new VehicleFormComponent.
     * @param {ModalController} _modal - The modal controller for managing modals.
     * @param {FormBuilder} formBuilder - The form builder for building the form.
     * @param {FirebaseService} firebaseSvc - The service for Firebase operations.
     */
    constructor(
        private _modal: ModalController,
        private formBuilder: FormBuilder,
        private firebaseSvc: FirebaseService,
    ) {
        this.form = this.formBuilder.group({
            available: [true],
            brand: ['', Validators.required],
            created: [new Date().toISOString()],
            category: ['car', Validators.required],
            model: ['', Validators.required],
            plate: ['', Validators.required],
            registrationDate: [new Date().toISOString()],
            spents: [],
            vehicleId: ['']
        })
    }

    /**
     * Initializes the VehicleFormComponent.
     */
    ngOnInit() { }

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
