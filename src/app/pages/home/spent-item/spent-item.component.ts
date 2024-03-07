import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Spent } from 'src/app/core/interfaces/Spent';

/**
 * Component for displaying a spent item.
 */
@Component({
    selector: 'app-spent-item',
    templateUrl: './spent-item.component.html',
    styleUrls: ['./spent-item.component.scss'],
})
export class SpentItemComponent implements OnInit {
    @Input() spent!: Spent;
    @Output() onEditSpentClicked: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Initializes the SpentItemComponent.
     */
    constructor() { }

    ngOnInit() { }

    /**
     * Event handler for when the edit spent button is clicked.
     * @param {Event} event - The click event.
     */
    onEditSpentClick(event: Event) {
        this.onEditSpentClicked.emit();
        event.stopPropagation();
    }
}
