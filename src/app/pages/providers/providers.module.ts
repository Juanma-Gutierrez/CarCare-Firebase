import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProviderItemComponent } from './provider-item/provider-item.component';
import { ProvidersFormComponent } from './providers-form/providers-form.component';
import { ProvidersPageRoutingModule } from './providers-routing.module';
import { ProvidersPage } from './providers.page';

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
