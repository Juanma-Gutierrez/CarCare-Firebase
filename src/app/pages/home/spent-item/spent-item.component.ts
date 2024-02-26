import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SpentsService } from 'src/app/core/services/api/spents.service';

@Component({
    selector: 'app-spent-item',
    templateUrl: './spent-item.component.html',
    styleUrls: ['./spent-item.component.scss'],
})
export class SpentItemComponent implements OnInit {
    @Input() spent?: any; //StrapiSpent
    @Output() onEditSpentClicked: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Constructor del componente.
     * @param {SpentsService} spentsSvc - Servicio para gestionar los gastos.
     */
    constructor(
        public spentsSvc: SpentsService
    ) { }

    /**
     * Método del ciclo de vida llamado al inicializar el componente.
     */
    ngOnInit() { }

    /**
     * Maneja el evento de clic en editar gasto.
     * @param {Event} event - Evento de clic.
     */
    onEditSpentClick(event: Event) {
        this.onEditSpentClicked.emit();
        event.stopPropagation();
    }
}
