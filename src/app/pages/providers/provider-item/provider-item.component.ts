import { ApiService } from 'src/app/core/services/api/api.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Provider } from 'src/app/core/interfaces/Provider';
import { ProvidersService } from 'src/app/core/services/api/providers.service';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';
import { leadingComment } from '@angular/compiler';

@Component({
    selector: 'app-provider-item',
    templateUrl: './provider-item.component.html',
    styleUrls: ['./provider-item.component.scss'],
})
export class ProviderItemComponent implements OnInit {
    @Input() provider: any = null
    public providerFormatted: Provider | null = null
    // @Input() provider?: Provider
    @Output() onEditProviderClicked: EventEmitter<void> = new EventEmitter<void>();
    public categoryFormatted: string = '';

    /**
     * Constructor del componente.
     * @constructor
     * @param {ProvidersService} providerSvc - Servicio para gestionar operaciones relacionadas con proveedores.
     * @param {ApiService} apiSvc - Servicio para realizar operaciones generales de la API.
     */
    constructor(
        //public providerSvc: ProvidersService,
        public apiSvc: ApiService,
        public translate: CustomTranslateService,
    ) { }

    ngOnInit() {
        var lang = '';
        this.translate.language$.subscribe(l => {
            lang = l;
            this.translateCategory(lang);
        });
    }

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
                    console.error("No debería entrar");
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
                        console.error("No debería entrar");
                        break;
                    }
                }
            }
        }
    }

    /**
     * Maneja el evento de clic en el botón de editar proveedor.
     * Emite el evento onEditProviderClicked y detiene la propagación del evento original.
     * @method onEditProviderClick
     * @param {Event} event - Objeto de evento del clic.
     * @return {void}
     */
    public async onEditProviderClick(event: Event) {
        this.onEditProviderClicked.emit();
        event.stopPropagation();
    }
}
