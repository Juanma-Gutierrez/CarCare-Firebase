import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { RegisterFormComponent } from './register-form/register-form.component';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';

/**
 * Represents the module for the RegisterPage feature.
 * This module imports SharedModule and RegisterPageRoutingModule,
 * and declares components related to the RegisterPage feature.
 */
@NgModule({
    imports: [
        SharedModule,
        RegisterPageRoutingModule,
    ],
    declarations: [
        RegisterPage,
        RegisterFormComponent,
    ]
})
export class RegisterPageModule { }
