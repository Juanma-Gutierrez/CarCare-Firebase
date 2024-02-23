import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FBVehicle } from 'src/app/core/services/api/firebase/interfaces/FBVehicle';

@Component({
    selector: 'app-vehicle-form',
    templateUrl: './vehicle-form.component.html',
    styleUrls: ['./vehicle-form.component.scss'],
})
export class VehicleFormComponent implements OnInit {

    form: FormGroup;
    mode: 'New' | 'Edit' = 'New';
    @Input() set vehicle(_vehicle: FBVehicle | null) {
        if (_vehicle) {
            this.mode = 'Edit';
            // this.form.controls['id'].setValue(_vehicle.id);
            this.form.controls['plate'].setValue(_vehicle.plate);
            this.form.controls['model'].setValue(_vehicle.model);
            this.form.controls['brand'].setValue(_vehicle.brand);
            this.form.controls['registrationDate'].setValue(_vehicle.registrationDate);
            this.form.controls['category'].setValue(_vehicle.category);
            this.form.controls['available'].setValue(_vehicle.available);
        }
    }

    constructor(
        private _modal: ModalController,
        private formBuilder: FormBuilder,
    ) {
        this.form = this.formBuilder.group({
            available: [true],
            brand: ['', Validators.required],
            category: ['car', Validators.required],
            model: ['', Validators.required],
            plate: ['', Validators.required],
            registrationDate: [new Date().toISOString()],
            spents:[]
        })
    }

    ngOnInit() { }

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
