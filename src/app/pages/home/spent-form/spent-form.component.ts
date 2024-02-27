import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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
    selectedProvider?: string;

    private _vehicle: number = -1;
    @Input() set vehicleId(vehiclePassed: number) {
        this._vehicle = vehiclePassed; { }
        this.form.controls['vehicle'].setValue(this._vehicle);
    };
    @Input() set spent(_spent: Spent | null) {
        if (_spent) {
            this.mode = 'Edit';
            this.form.controls['spentId'].setValue(_spent.spentId);
            this.form.controls['date'].setValue(_spent.date);
            this.form.controls['amount'].setValue(_spent.amount.toPrecision());
            this.form.controls['provider'].setValue(_spent.provider);
            this.form.controls['providerName'].setValue(_spent.providerName);
            this.form.controls['observations'].setValue(_spent.observations);
            this.selectedProvider = _spent.providerName;
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
            provider: [''],
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