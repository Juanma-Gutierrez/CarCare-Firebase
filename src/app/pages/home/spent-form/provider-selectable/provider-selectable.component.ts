import { Component, Input, OnInit } from '@angular/core';
import { Provider } from 'src/app/core/interfaces/Provider';

@Component({
    selector: 'app-provider-selectable',
    templateUrl: './provider-selectable.component.html',
    styleUrls: ['./provider-selectable.component.scss'],
})
export class ProviderSelectableComponent implements OnInit {
    @Input() providers: Provider[] = [];
    @Input() selectedProvider?: Provider;

    constructor() { }

    ngOnInit() { }

    onProviderChange(event: CustomEvent<any>) {
        this.selectedProvider = event.detail.value;
    }
}
