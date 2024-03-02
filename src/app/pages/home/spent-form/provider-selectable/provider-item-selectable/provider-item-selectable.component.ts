import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Provider } from 'src/app/core/interfaces/Provider';

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
    get provider(): Provider | undefined {
        return this._provider;
    }

    constructor() { }

    ngOnInit() { }

    onProviderClicked() {
        this.clicked.emit(this._provider);
    }
}
