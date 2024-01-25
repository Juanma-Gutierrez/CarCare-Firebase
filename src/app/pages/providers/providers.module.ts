import { NgModule } from '@angular/core';
import { ProviderItemComponent } from './provider-item/provider-item.component';
import { ProvidersFormComponent } from './providers-form/providers-form.component';
import { ProvidersPage } from './providers.page';
import { ProvidersPageRoutingModule } from './providers-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        ProvidersPageRoutingModule
    ],
    declarations: [
        ProvidersPage,
        ProvidersFormComponent,
        ProviderItemComponent]
})
export class ProvidersPageModule { }
