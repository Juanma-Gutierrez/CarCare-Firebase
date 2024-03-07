import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';

@NgModule({
    imports: [
        SharedModule,
        LoginPageRoutingModule
    ],
    declarations: [
        LoginFormComponent,
        LoginPage]
})
export class LoginPageModule { }
