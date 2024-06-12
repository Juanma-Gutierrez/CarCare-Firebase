import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';

/**
 * NgModule for the login page.
 * This module imports SharedModule, which provides common components, directives, and pipes.
 * It also imports LoginPageRoutingModule to define the routes for the login page.
 * The module declares the LoginFormComponent and LoginPage components.
 */
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
