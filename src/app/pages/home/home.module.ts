import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/core/services/custom-translate.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import {
    ProviderItemSelectableComponent,
} from './spent-form/provider-selectable/provider-item-selectable/provider-item-selectable.component';
import { ProviderSelectableComponent } from './spent-form/provider-selectable/provider-selectable.component';
import { SpentFormComponent } from './spent-form/spent-form.component';
import { SpentItemComponent } from './spent-item/spent-item.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-formcomponent';
import { VehicleItemComponent } from './vehicle-item/vehicle-item.component';

/**
 * NgModule for the home page.
 * Imports SharedModule for shared module functionality.
 * Imports HomePageRoutingModule for routing configuration.
 * Imports TranslateModule for translation support.
 * Declares and exports components used in the home page.
 */
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
