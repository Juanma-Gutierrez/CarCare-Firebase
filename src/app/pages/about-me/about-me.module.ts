import { AboutMePage } from './about-me.page';
import { AboutMePageRoutingModule } from './about-me-routing.module';
import { CardAboutComponent } from './card-about/card-about.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

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
