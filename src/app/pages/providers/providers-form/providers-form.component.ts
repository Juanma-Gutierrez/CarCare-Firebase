import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';
import { generateId } from 'src/app/core/services/utils.service';
import { Provider } from 'src/app/core/interfaces/Provider';
import { CATEGORIES } from 'src/app/core/services/const.service';


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
