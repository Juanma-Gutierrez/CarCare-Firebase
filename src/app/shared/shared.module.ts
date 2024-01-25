import { ButtonDirective } from './directives/button-directive.directive';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { ItemDirective } from './directives/item-directive.directive';
import { NgModule } from '@angular/core';
import { NumberFormatPipe } from './pipes/number-format.pipe';
import { RouterModule } from '@angular/router';
import { SelectedCardDirective } from './directives/selectable-card.directive';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { UpperCamelCasePipe } from './pipes/upper-camel-case.pipe';
import { UserItemComponent } from './components/toolbar/user-item/user-item.component';
import { createTranslateLoader } from '../core/services/custom-translate.service';

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
        CommonModule,
        FormsModule,
        HttpClientModule,
        IonicModule,
        ReactiveFormsModule,
        RouterModule,
        TranslateModule,
        //Pipes
        NumberFormatPipe,
        UpperCamelCasePipe,
    ]
})
export class SharedModule { }
