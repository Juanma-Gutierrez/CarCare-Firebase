import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ProviderItemSelectableComponent } from './spent-form/provider-selectable/provider-item-selectable/provider-item-selectable.component';
import { ProviderSelectableComponent } from './spent-form/provider-selectable/provider-selectable.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SpentFormComponent } from './spent-form/spent-form.component';
import { SpentItemComponent } from './spent-item/spent-item.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { VehicleFormComponent } from './vehicle-form/vehicle-formcomponent';
import { VehicleItemComponent } from './vehicle-item/vehicle-item.component';
import { createTranslateLoader } from 'src/app/core/services/custom-translate.service';


@NgModule({
    imports: [
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
        HomePage,
        VehicleItemComponent,
        VehicleFormComponent,
        SpentItemComponent,
        SpentFormComponent,
        ProviderSelectableComponent,
        ProviderItemSelectableComponent,
    ],
    providers: []
})
export class HomePageModule { }
