import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Provider } from 'src/app/core/interfaces/Provider';

/**
 * Component for displaying a selectable provider item.
 */
@Component({
    selector: 'app-provider-item-selectable',
    templateUrl: './provider-item-selectable.component.html',
    styleUrls: ['./provider-item-selectable.component.scss'],
})
export class ProviderItemSelectableComponent implements OnInit {

    private _provider: Provider | undefined;
    @Input('provider') set provider(_provider: Provider | undefined) {
        this._provider = _provider;
    }
    @Output('clicked') clicked = new EventEmitter();

    /**
     * Retrieves the provider item currently set.
     */
    get provider(): Provider | undefined {
        return this._provider;
    }

    constructor() { }


    ngOnInit() { }

    /**
     * Event handler for when a provider item is clicked.
     * Emits the clicked event with the current provider item.
     */
    onProviderClicked() {
        this.clicked.emit(this._provider);
    }
}
