import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPage } from './register.page';
import { PasswordStrengthComponent } from './register-form/password-strength/password-strength.component';
import { SharedModule } from 'src/app/shared/shared.module';

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
