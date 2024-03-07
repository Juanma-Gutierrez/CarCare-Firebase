import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/core/services/custom-translate.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomePageRoutingModule } from '../home/home-routing.module';
import { AdminPageRoutingModule } from './admin-routing.module';
import { AdminPage } from './admin.page';
import { UserListItemComponent } from './user-list-item/user-list-item.component';


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
        UserListItemComponent,
    ]
})
export class AdminPageModule { }

