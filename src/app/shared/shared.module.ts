import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { createTranslateLoader } from '../core/services/custom-translate.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UserItemComponent } from './components/toolbar/user-item/user-item.component';
import { ButtonDirective } from './directives/button-directive.directive';
import { ItemDirective } from './directives/item-directive.directive';
import { SelectedCardDirective } from './directives/selectable-card.directive';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { NumberFormatPipe } from './pipes/number-format.pipe';
import { UpperCamelCasePipe } from './pipes/upper-camel-case.pipe';

@NgModule({
    declarations: [
        // Components
        ToolbarComponent,
        UserItemComponent,
        // Directives
        ButtonDirective,
        ItemDirective,
        SelectedCardDirective,
        UpperCamelCasePipe,
        // Pipes
        CapitalizePipe,
        NumberFormatPipe,
        UpperCamelCasePipe,
    ],
    imports: [
        // Modules
        CommonModule,
        FormsModule,
        HttpClientModule,
        IonicModule,
        ReactiveFormsModule,
        RouterModule,
        ChartModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
    ],
    exports: [
        //Components
        ToolbarComponent,
        UserItemComponent,
        // Directives
        ButtonDirective,
        ItemDirective,
        SelectedCardDirective,
        // Modules
        ChartModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        IonicModule,
        ReactiveFormsModule,
        RouterModule,
        TranslateModule,
        //Pipes
        CapitalizePipe,
        NumberFormatPipe,
        UpperCamelCasePipe,
    ]
})
export class SharedModule { }
