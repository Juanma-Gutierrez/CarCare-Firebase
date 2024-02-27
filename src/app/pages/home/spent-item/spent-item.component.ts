import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-spent-item',
    templateUrl: './spent-item.component.html',
    styleUrls: ['./spent-item.component.scss'],
})
export class SpentItemComponent implements OnInit {
    @Input() spent?: any; //StrapiSpent
    @Output() onEditSpentClicked: EventEmitter<void> = new EventEmitter<void>();

    constructor(
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
