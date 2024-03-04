import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentData, Unsubscribe } from 'firebase/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { User } from 'src/app/core/interfaces/User';
import { FirebaseService } from 'src/app/core/services/api/firebase/firebase.service';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.page.html',
    styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit, OnDestroy {
    private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    public users$: Observable<User[]> = this._users.asObservable();
    private unsubscribes: (Unsubscribe | null)[] = []
    private subscriptions: Subscription[] = []

    constructor(
        private firebaseSvc: FirebaseService,
    ) { }

    ngOnInit() {
        this.unsubscribes.push(this.firebaseSvc.subscribeToCollection("user", this._users, (data) => {
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
        }));
        this.subscriptions.push(this.users$.subscribe());
    }

    ngOnDestroy(): void {
        this.unsubscribes.forEach(uns => { if (uns) uns() });
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
