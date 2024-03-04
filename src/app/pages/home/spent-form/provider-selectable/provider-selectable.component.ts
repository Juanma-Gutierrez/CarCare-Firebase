import { Component, Input, OnInit } from '@angular/core';
import { Provider } from 'src/app/core/interfaces/Provider';

@Component({
    selector: 'app-provider-selectable',
    templateUrl: './provider-selectable.component.html',
    styleUrls: ['./provider-selectable.component.scss'],
})
export class ProviderSelectableComponent implements OnInit {

    disabled: boolean = true;

    @Input() providers: Provider[] = [];
    @Input() selectedProvider?: string;

    constructor() { }

    ngOnInit() {
        console.log(this.selectedProvider)
    }
}
