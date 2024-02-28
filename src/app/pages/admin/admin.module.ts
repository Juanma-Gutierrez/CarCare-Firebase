import { AdminPage } from './admin.page';
import { AdminPageRoutingModule } from './admin-routing.module';
import { HomePageRoutingModule } from '../home/home-routing.module';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/core/services/custom-translate.service';


@NgModule({
    imports: [
        AdminPageRoutingModule,
        SharedModule,
        HomePageRoutingModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
    ],
    declarations: [
        AdminPage,
    ]
})
export class AdminPageModule { }

