import { Component, Input, OnInit } from '@angular/core';
import { Provider } from 'src/app/core/interfaces/Provider';

/**
 * Component for selecting a provider.
 */
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

    /**
     * Event handler for when the selected provider changes.
     * @param {CustomEvent<any>} event - The event containing the new selected provider.
     */
    onProviderChange(event: CustomEvent<any>) {
        this.selectedProvider = event.detail.value;
    }
}
