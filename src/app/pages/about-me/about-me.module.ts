import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { AboutMePageRoutingModule } from './about-me-routing.module';
import { AboutMePage } from './about-me.page';
import { CardAboutComponent } from './card-about/card-about.component';

/**
 * Module for the About Me page.
 * Responsible for importing necessary modules, declaring components,
 * and exporting them for use in other modules.
 */
@NgModule({
    imports: [
        SharedModule,
        AboutMePageRoutingModule,
    ],
    declarations: [
        AboutMePage,
        CardAboutComponent
    ]
})
export class AboutMePageModule { }
