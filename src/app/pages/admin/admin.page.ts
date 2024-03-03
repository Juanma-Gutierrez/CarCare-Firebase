import { Component, OnInit } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/core/interfaces/User';
import { FirebaseService } from 'src/app/core/services/api/firebase/firebase.service';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.page.html',
    styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
    private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    public users$: Observable<User[]> = this._users.asObservable();

    constructor(
        private firebaseSvc: FirebaseService,
    ) { }

    ngOnInit() {
        this.firebaseSvc.subscribeToCollection("user", this._users, (data) => {
            const userData = data['data']();
            const user = {
                name: userData.name,
                surname: userData.surname,
                nickname: userData.nickname,
                email: userData.email,
                vehicles: userData.vehicles,
                role: userData.role,
            }
            return user;
        });
        this.users$.subscribe();
    }

}
