import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Provider } from 'src/app/core/interfaces/Provider';
import { Spent } from 'src/app/core/interfaces/Spent';

@Component({
    selector: 'app-spent-form',
    templateUrl: './spent-form.component.html',
    styleUrls: ['./spent-form.component.scss'],
})
export class SpentFormComponent implements OnInit {

    today: Date = new Date()
    form: FormGroup;
    mode: 'New' | 'Edit' = 'New';
    selectedProvider?: string;

    private _vehicle: number = -1;
    @Input() set vehicleId(vehiclePassed: number) {
        this._vehicle = vehiclePassed; { }
        this.form.controls['vehicle'].setValue(this._vehicle);
    };
    @Input() set spent(_spent: Spent | null) {
        if (_spent) {
            console.log(_spent)
            this.mode = 'Edit';
            this.form.controls['id'].setValue(_spent.id);
            this.form.controls['date'].setValue(_spent.date);
            this.form.controls['amount'].setValue(_spent.amount.toPrecision());
            this.form.controls['provider'].setValue(_spent.provider);
            this.form.controls['providerName'].setValue(_spent.providerName);
            this.form.controls['vehicle'].setValue(_spent.vehicle);
            this.form.controls['observations'].setValue(_spent.observations);
            this.selectedProvider = _spent.providerName;
            console.log(this.selectedProvider);
        }
    }

    @Input() providers: Provider[] = [];
    public providerName?: String;

    constructor(
        private _modal: ModalController,
        private formBuilder: FormBuilder,
    ) {
        this.form = this.formBuilder.group({
            id: [null],
            date: [this.today.toISOString(), Validators.required],
            amount: ['', Validators.required],
            provider: [0, Validators.required],
            providerName: ['', Validators.required],
            vehicle: [this._vehicle],
            observations: ['']
        });
    }

    /**
     * Método del ciclo de vida llamado al inicializar el componente.
     */
    ngOnInit() {
        this.providerName = this.spent?.providerName;
    }

    /**
     * Obtiene el identificador del vehículo.
     * @returns {number} - Identificador del vehículo.
     */
    getVehicle(): number {
        return this._vehicle
    }

    /**
     * Maneja la selección de un proveedor.
     * @param {any} event - Evento de selección.
     */
    onSelection(event: any) {
        const provider = event.detail.value;
        this.selectedProvider = provider;
        console.log(this.selectedProvider)
        this.form.controls['providerName'].setValue(provider?.name);
        this.form.controls['provider'].setValue(provider?.id);
        this.form.markAsDirty();
    }

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
     * Maneja la eliminación de un gasto.
     */
    onDelete() {
        this._modal.dismiss(this.form.value, 'delete');
    }

}