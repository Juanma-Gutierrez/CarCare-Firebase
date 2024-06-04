import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LogType, OperationLog } from 'src/app/core/interfaces/ItemLog';
import { AuthService } from 'src/app/core/services/api/auth.service';
import { FirebaseService } from 'src/app/core/services/api/firebase/FirebaseService';
import { Mapping } from 'src/app/core/services/api/firebase/mapping';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';
import { LOG_CONTENT } from 'src/app/core/services/const.service';
import { saveLocalStorageUser } from 'src/app/core/services/utils.service';

/**
 * Component for the registration page.
 */
@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    private subscriptions: Subscription[] = []

    /**
     * Constructor to inject dependencies.
     * @param {AuthService} authSvc - The authentication service.
     */
    constructor(
        private authSvc: AuthService,
        private localDataSvc: LocalDataService,
        private firebaseSvc: FirebaseService,
    ) { }

    /**
     * Lifecycle hook called after component initialization.
     */
    ngOnInit() {
    }

    /**
     * Handles the submission of the registration form.
     * @param {any} data - The form data.
     */
    onRegisterFormSubmit(data: any) {
        let _data: any = { ...data };
        delete _data.confirm;
        saveLocalStorageUser(data.email);
        this.subscriptions.push(this.authSvc.register(_data).subscribe({
            next: (data) => {
                console.info("Data on register: ", data);
                try {
                    var itemLog = new Mapping(this.localDataSvc).generateItemLog(
                        LOG_CONTENT.REGISTER_USER_SUCCESSFULLY,
                        OperationLog.CREATE_USER,
                        LogType.INFO
                    );
                    itemLog.currentUser = data.email;
                    itemLog.uid= data.userId;
                    this.firebaseSvc.fbSaveLog(itemLog);
                } catch (e: any) {
                    console.log("Error: ", e.message)
                    const itemLog = new Mapping(this.localDataSvc).generateItemLog(
                        LOG_CONTENT.REGISTER_USER_ERROR,
                        OperationLog.CREATE_USER,
                        LogType.ERROR
                    )
                    this.firebaseSvc.fbSaveLog(itemLog);
                }
            },
            error: (err) => {
                console.error("Error on register", err);
            }
        }));
    }

    /**
     * Lifecycle hook called before component destruction.
     */
    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}


