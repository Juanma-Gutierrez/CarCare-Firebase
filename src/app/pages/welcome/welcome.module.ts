import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { WelcomePage } from './welcome.page';
import { WelcomePageRoutingModule } from './welcome-routing.module';

@NgModule({
    imports: [
        SharedModule,
        WelcomePageRoutingModule
    ],
    declarations: [WelcomePage]
})
export class WelcomePageModule { }
