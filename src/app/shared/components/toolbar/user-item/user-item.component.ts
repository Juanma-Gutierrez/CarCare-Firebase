import { ApiService } from 'src/app/core/services/api/api.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { User } from 'src/app/core/interfaces/User';

@Component({
    selector: 'app-user-item',
    templateUrl: './user-item.component.html',
    styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {
    @Output() logoutClicked: EventEmitter<void> = new EventEmitter<void>()
    @Input() user: User | null = null

    @Input() languages: string[] = ["es", "en"];
    @Input() languageSelected: string = "es";

    /**
     * Constructor del componente de elemento de usuario.
     * @constructor
     * @param {PopoverController} popoverController - Controlador de popover para cerrar el popover después de hacer clic.
     * @param {ApiService} apiSvc - Servicio de API para interactuar con la información del usuario.
     */
    constructor(
        private popoverController: PopoverController,
        public apiSvc: ApiService
    ) { }

    ngOnInit(): void { }

    /**
     * Manejador de eventos para el clic en el botón de cierre de sesión.
     * Cierra el popover y emite el evento de cierre de sesión.
     * @method logoutClick
     * @param {Event} event - Objeto de evento de clic.
     * @return {void}
     */
    logoutClick(event: Event) {
        this.popoverController.dismiss();
        this.logoutClicked.emit()
    }
}
