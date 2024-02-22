import { ApiService } from 'src/app/core/services/api/api.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Vehicle } from 'src/app/core/interfaces/Vehicle';

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

    /**
     * Constructor del componente.
     * @param {ModalController} _modal - Controlador de modal de Ionic.
     * @param {FormBuilder} formBuilder - Constructor de formularios reactivos.
     */
    constructor(
        private _modal: ModalController,
        private formBuilder: FormBuilder,
        private apiSvc: ApiService,
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

    /**
     * Método del ciclo de vida llamado al inicializar el componente.
     */
    ngOnInit() { }

    /**
     * Cierra el formulario sin realizar cambios.
     */
    onCancel() {
        this._modal.dismiss(null, 'cancel');
    }

    /**
     * Envía los datos del formulario al cerrarse correctamente.
     */
    onSubmit() {
        this._modal.dismiss(this.form.value, 'ok');
    }

    /**
     * Maneja la eliminación de un vehículo.
     */
    onDelete() {
        this._modal.dismiss(this.form.value, 'delete');
    }
}
