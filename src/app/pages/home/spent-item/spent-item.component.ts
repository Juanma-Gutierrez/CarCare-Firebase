import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Spent } from 'src/app/core/interfaces/Spent';

@Component({
    selector: 'app-spent-item',
    templateUrl: './spent-item.component.html',
    styleUrls: ['./spent-item.component.scss'],
})
export class SpentItemComponent implements OnInit {
    @Input() spent!:Spent;
    @Output() onEditSpentClicked: EventEmitter<void> = new EventEmitter<void>();

    constructor(
    ) { }

    ngOnInit() { }

    onEditSpentClick(event: Event) {
        this.onEditSpentClicked.emit();
        event.stopPropagation();
    }
}
