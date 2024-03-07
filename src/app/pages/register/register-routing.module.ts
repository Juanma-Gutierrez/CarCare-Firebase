import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PasswordStrengthComponent } from './register-form/password-strength/password-strength.component';
import { RegisterPage } from './register.page';

const routes: Routes = [
    {
        path: '',
        component: RegisterPage
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        PasswordStrengthComponent
    ],
    exports: [
        RouterModule,
        PasswordStrengthComponent
    ],
})
export class RegisterPageRoutingModule { }
