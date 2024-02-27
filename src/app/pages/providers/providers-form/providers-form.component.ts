import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { Provider } from 'src/app/core/interfaces/Provider';

@Component({
    selector: 'app-providers-form',
    templateUrl: './providers-form.component.html',
    styleUrls: ['./providers-form.component.scss'],
})
export class ProvidersFormComponent implements OnInit {

    form: FormGroup;
    mode: 'New' | 'Edit' = 'New';
    @Input() set provider(_provider: Provider | null) {
        if (_provider) {
            this.mode = 'Edit';
            this.form.controls['providerId'].setValue(_provider.providerId);
            this.form.controls['name'].setValue(_provider.name);
            this.form.controls['category'].setValue(_provider.category);
            this.form.controls['phone'].setValue(_provider.phone);
        }
    }

    constructor(
        private _modal: ModalController,
        private formBuilder: FormBuilder,
        private localDataSvc: LocalDataService,
        private utilsSvc: UtilsService,
    ) {
        var user = this.localDataSvc.getUser().value
        var userId = user?.uuid
        this.form = this.formBuilder.group({
            providerId: [this.utilsSvc.generateId()],
            name: ['', Validators.required],
            category: ['', Validators.required],
            phone: [''],
            users_permissions_user: [userId]
        })
    }

    ngOnInit() { }

    /**
     * Maneja el evento de cancelación. Cierra el modal sin realizar cambios.
     * @method onCancel
     * @return {void}
     */
    onCancel() {
        this._modal.dismiss(null, 'cancel');
    }

    /**
     * Maneja el evento de envío del formulario. Cierra el modal y emite los datos del formulario con el evento 'ok'.
     * @method onSubmit
     * @return {void}
     */
    onSubmit() {
        this._modal.dismiss(this.form.value, 'ok');
    }

    /**
     * Maneja el evento de envío del formulario. Cierra el modal y emite los datos del formulario con el evento 'ok'.
     * @method onSubmit
     * @return {void}
     */
    onDelete() {
        this._modal.dismiss(this.form.value, 'delete');
    }
}
