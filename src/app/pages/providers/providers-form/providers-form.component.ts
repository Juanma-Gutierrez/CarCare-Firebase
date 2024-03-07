import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Provider } from 'src/app/core/interfaces/Provider';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';
import { CATEGORIES } from 'src/app/core/services/const.service';
import { generateId } from 'src/app/core/services/utils.service';

/**
 * Providers form component
 */
@Component({
    selector: 'app-providers-form',
    templateUrl: './providers-form.component.html',
    styleUrls: ['./providers-form.component.scss'],
})
export class ProvidersFormComponent implements OnInit {
    public categories = CATEGORIES;

    form: FormGroup;
    mode: 'New' | 'Edit' = 'New';
    @Input() set provider(_provider: Provider | null) {
        if (_provider) {
            this.mode = 'Edit';
            this.form.controls['category'].setValue(_provider.category);
            this.form.controls['created'].setValue(_provider.created);
            this.form.controls['name'].setValue(_provider.name);
            this.form.controls['phone'].setValue(_provider.phone);
            this.form.controls['providerId'].setValue(_provider.providerId);
        }
    }

    /**
     * Constructs the form for adding or editing a provider.
     * @param {ModalController} _modal - The modal controller for managing the modal.
     * @param {FormBuilder} formBuilder - The form builder service for building the form.
     * @param {LocalDataService} localDataSvc - The service for managing local data.
     * @returns {void}
     * @constructor
     */
    constructor(
        private _modal: ModalController,
        private formBuilder: FormBuilder,
        private localDataSvc: LocalDataService,
    ) {
        var user = this.localDataSvc.getUser().value;
        var userId = user?.userId;
        this.form = this.formBuilder.group({
            providerId: [generateId()],
            name: ['', Validators.required],
            category: ['', Validators.required],
            phone: [''],
            userId: [userId],
            created: [new Date().toISOString()],
        })
    }

    /**
     * Initializes the component on initialization.
     * @returns {void}
     */
    ngOnInit() { }

    /**
     * Cancels the form operation and dismisses the modal.
     * @returns {void}
     */
    onCancel() {
        this._modal.dismiss(null, 'cancel');
    }

    /**
     * Submits the form data and dismisses the modal.
     * @returns {void}
     */
    onSubmit() {
        this._modal.dismiss(this.form.value, 'ok');
    }

    /**
     * Deletes the provider and dismisses the modal.
     * @returns {void}
     */
    onDelete() {
        this._modal.dismiss(this.form.value, 'delete');
    }
}
