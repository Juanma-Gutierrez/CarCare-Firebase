import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Spent } from 'src/app/core/interfaces/Spent';
import { Vehicle } from 'src/app/core/interfaces/Vehicle';
import { categoriesArray } from 'src/app/core/services/api/category-repository';
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
    categories: string[] = categoriesArray;
    isLoading = false;
    category: string = "";
    brands: string[] = [];
    models: string[] = [];
    isFirstLoadingBrand = true;
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
                this.form.controls['category'].setValue(_vehicle.category);
                this.form.controls['created'].setValue(convertDateToLongIsoFormatDate(_vehicle.created));
                this.form.controls['imageURL'].setValue(_vehicle.imageURL);
                this.form.controls['model'].setValue(_vehicle.model);
                this.form.controls['plate'].setValue(_vehicle.plate);
                this.form.controls['registrationDate'].setValue(convertDateToLongIsoFormatDate(_vehicle.registrationDate));
                this.form.controls['spents'].setValue(spentsList);
                this.form.controls['vehicleId'].setValue(_vehicle.vehicleId);
                this.form.markAsPristine();
            })
            this.category = _vehicle.category + "s"
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
        private http: HttpClient,

    ) {
        this.form = this.formBuilder.group({
            available: [true],
            brand: ['', Validators.required],
            category: ['', Validators.required],
            created: [new Date().toISOString()],
            imageURL: [''],
            model: ['', Validators.required],
            plate: ['', Validators.required],
            registrationDate: [new Date().toISOString()],
            spents: [],
            vehicleId: ['']
        })

        this.form.controls['category'].valueChanges.subscribe(category => {
            if (category) {
                this.category = category + "s";
                this.fetchBrands(this.form.controls['category'].value + "s");
                if (!this.isFirstLoadingBrand) {
                    this.form.controls['brand'].setValue("");
                    this.form.controls['model'].disable();
                    this.form.controls['model'].setValue("");
                } else {
                    this.isFirstLoadingBrand = false;
                }
            }
        })

        this.form.controls['brand'].valueChanges.subscribe(brand => {
            if (brand) {
                this.fetchModels(this.category, brand);
            }
        })
    }


    /**
     * Initializes the VehicleFormComponent.
     */
    ngOnInit() {
        if (this.mode == "New") {
            this.form.controls['brand'].disable();
            this.form.controls['model'].disable();
        }
    }

    fetchBrands(category: string) {
        this.isLoading = true;
        let url = 'https://jumang.pythonanywhere.com/api/' + category + '/brands'
        this.http.get<any>(url)
            .subscribe(response => {
                this.isLoading = false;
                this.form.controls['brand'].enable();
                this.brands = response.brands.sort((a: string, b: string) => a.localeCompare(b));

            }, error => {
                console.error('Error fetching brands:', error);
            });
    }

    fetchModels(category: string, brand: string) {
        this.isLoading = true;
        let url = 'https://jumang.pythonanywhere.com/api/' + category + '/models/' + brand
        this.http.get<any>(url)
            .subscribe(response => {
                this.isLoading = false;
                this.form.controls['model'].enable();
                this.models = response.models.sort((a: string, b: string) => a.localeCompare(b));
            }, error => {
                console.error('Error fetching models:', error);
            });
    }

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
