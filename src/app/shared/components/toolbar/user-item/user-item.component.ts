import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/api/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';

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


    constructor(
        private popoverController: PopoverController,
        public apiSvc: ApiService,
    ) { }

    ngOnInit(): void { }

    logoutClick(event: Event) {
        this.popoverController.dismiss();
        this.logoutClicked.emit()
    }
}
