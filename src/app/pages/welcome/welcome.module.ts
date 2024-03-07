import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { WelcomePageRoutingModule } from './welcome-routing.module';
import { WelcomePage } from './welcome.page';

@NgModule({
    imports: [
        SharedModule,
        WelcomePageRoutingModule
    ],
    declarations: [WelcomePage]
})
export class WelcomePageModule { }
