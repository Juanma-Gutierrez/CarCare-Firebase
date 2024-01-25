import { NgModule } from '@angular/core';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RegisterPage } from './register.page';
import { RegisterPageRoutingModule } from './register-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

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
