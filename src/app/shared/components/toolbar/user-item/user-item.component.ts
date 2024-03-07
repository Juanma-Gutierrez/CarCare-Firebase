import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ApiService } from 'src/app/core/services/api/api.service';

/**
 * Component representing a user item.
 */
@Component({
    selector: 'app-user-item',
    templateUrl: './user-item.component.html',
    styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {
    @Output() logoutClicked: EventEmitter<void> = new EventEmitter<void>()
    @Input() user: any | null = null // User
    @Input() languages: string[] = ["es", "en"];
    @Input() languageSelected: string = "es";

    /**
     * Constructor to inject dependencies.
     * @param popoverController Instance of PopoverController.
     * @param apiSvc Instance of ApiService.
     */
    constructor(
        private popoverController: PopoverController,
        public apiSvc: ApiService,
    ) { }

    /**
     * Lifecycle hook called after component initialization.
     */
    ngOnInit(): void { }

    /**
     * Handles the click event for logout action.
     * @param event The event object.
     */
    logoutClick(event: Event) {
        this.popoverController.dismiss();
        this.logoutClicked.emit()
    }
}
