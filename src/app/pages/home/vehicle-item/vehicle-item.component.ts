import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vehicle } from 'src/app/core/interfaces/Vehicle';

@Component({
    selector: 'app-vehicle',
    templateUrl: './vehicle-item.component.html',
    styleUrls: ['./vehicle-item.component.scss'],
})
export class VehicleItemComponent implements OnInit {
    @Input() vehicle?: Vehicle;
    @Output() onVehicleItemClicked: EventEmitter<void> = new EventEmitter<void>();
    @Output() onEditVehicleClicked: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    /**
     * Método del ciclo de vida llamado al inicializar el componente.
     */
    ngOnInit() { }

    /**
     * Maneja el evento de clic en editar vehículo.
     * @param {any} event - Evento de clic.
     */
    onEditVehicleClick(event: any) {
        this.onEditVehicleClicked.emit();
        event.stopPropagation();
    }

    /**
     * Maneja el evento de clic en el elemento de vehículo.
     * @param {any} event - Evento de clic.
     */
    onVehicleItemClick(event: any) {
        this.onVehicleItemClicked.emit();
        event.stopPropagation();
    }
}
