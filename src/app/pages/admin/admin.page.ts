import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'firebase/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { User } from 'src/app/core/interfaces/User';
import { FirebaseService } from 'src/app/core/services/api/firebase/FirebaseService';
import { USER } from 'src/app/core/services/const.service';

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
        this.unsubscribes.push(this.firebaseSvc.subscribeToCollection(USER, this._users, (data) => {
            const userData = data['data']();
            const user = {
                email: userData.email,
                name: userData.name,
                nickname: userData.nickname,
                role: userData.role,
                surname: userData.surname,
                vehicles: userData.vehicles,
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
