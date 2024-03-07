import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Provider } from 'src/app/core/interfaces/Provider';
import { ApiService } from 'src/app/core/services/api/api.service';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';

/**
 * Represents a component to display provider information.
 */
@Component({
    selector: 'app-provider-item',
    templateUrl: './provider-item.component.html',
    styleUrls: ['./provider-item.component.scss'],
})
export class ProviderItemComponent implements OnInit {
    @Input() provider: any = null
    public providerFormatted: Provider | null = null
    @Output() onEditProviderClicked: EventEmitter<void> = new EventEmitter<void>();
    public categoryFormatted: string = '';

    /**
     * Initializes the component.
     * @constructor
     * @param {ApiService} apiSvc - The ApiService instance.
     * @param {CustomTranslateService} translate - The CustomTranslateService instance.
     */
    constructor(
        public apiSvc: ApiService,
        public translate: CustomTranslateService,
    ) { }

    /**
     * Initializes the component and subscribes to the language change to translate the category.
     * @returns {void}
     * @public
     */
    ngOnInit() {
        var lang = '';
        this.translate.language$.subscribe(l => {
            lang = l;
            this.translateCategory(lang);
        });
    }

    /**
     * Translates the category based on the provided language.
     * @param {string} lang - The language code.
     * @returns {void}
     * @public
     */
    translateCategory(lang: string) {
        if (lang == 'en') {
            switch (this.provider?.category) {
                case ("workshop"):
                    this.categoryFormatted = "Workshop";
                    break;
                case ("towTruck"):
                    this.categoryFormatted = "Tow truck";
                    break;
                case ("other"):
                    this.categoryFormatted = "Others";
                    break;
                case ("ITV"):
                    this.categoryFormatted = "ITV";
                    break;
                case ("insuranceCompany"):
                    this.categoryFormatted = "Insurance Company";
                    break;
                case ("gasStation"):
                    this.categoryFormatted = "Gas station";
                    break;
                default: {
                    console.error("No debería entrar:translateCategoryEN");
                    break;
                }
            }
        } else {
            if (lang == 'es') {
                switch (this.provider?.category) {
                    case ("workshop"):
                        this.categoryFormatted = "Taller";
                        break;
                    case ("towTruck"):
                        this.categoryFormatted = "Grúa";
                        break;
                    case ("other"):
                        this.categoryFormatted = "Otros";
                        break;
                    case ("ITV"):
                        this.categoryFormatted = "ITV";
                        break;
                    case ("insuranceCompany"):
                        this.categoryFormatted = "Compañía de seguros";
                        break;
                    case ("gasStation"):
                        this.categoryFormatted = "Gasolinera";
                        break;
                    default: {
                        console.error("No debería entrar: translateCategoryES");
                        break;
                    }
                }
            }
        }
    }

/**
 * Handles the click event for editing the provider and emits an event.
 * @param {Event} event - The click event.
 * @returns {void}
 * @public
 */
    public async onEditProviderClick(event: Event) {
        this.onEditProviderClicked.emit();
        event.stopPropagation();
    }
}
