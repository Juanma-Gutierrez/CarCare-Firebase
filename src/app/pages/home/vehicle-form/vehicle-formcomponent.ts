import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/core/services/api/firebase/FirebaseService';
import { Spent } from 'src/app/core/interfaces/Spent';
import { Vehicle } from 'src/app/core/interfaces/Vehicle';
import { VEHICLE } from 'src/app/core/services/const.service';

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
                console.log(_vehicle)
                spentsList = vehicle.data['spents'];
                this.mode = 'Edit';
                this.form.controls['available'].setValue(_vehicle.available);
                this.form.controls['brand'].setValue(_vehicle.brand);
                this.form.controls['created'].setValue(_vehicle.created);
                this.form.controls['category'].setValue(_vehicle.category);
                this.form.controls['model'].setValue(_vehicle.model);
                this.form.controls['plate'].setValue(_vehicle.plate);
                this.form.controls['registrationDate'].setValue(_vehicle.registrationDate);
                this.form.controls['spents'].setValue(spentsList);
                this.form.controls['vehicleId'].setValue(_vehicle.vehicleId);
            })
        }
    }

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
