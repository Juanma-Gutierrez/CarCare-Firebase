import { Injectable } from '@angular/core';
import { FBUser } from './firebase/interfaces/FBUser';
import { FBVehicle } from './firebase/interfaces/FBVehicle';
import { BehaviorSubject, Observable } from 'rxjs';
import { FBSpent } from './firebase/interfaces/FBSpent';

@Injectable({
    providedIn: 'root'
})
export class LocalDataService {
    private _user: BehaviorSubject<FBUser | null> = new BehaviorSubject<FBUser | null>(null);
    public user$: Observable<FBUser | null> = this._user.asObservable();
    private _vehicles: BehaviorSubject<FBVehicle | null> = new BehaviorSubject<FBVehicle | null>(null)
    public vehicles$: Observable<FBVehicle | null> = this._vehicles.asObservable();
    private _spents: BehaviorSubject<FBSpent[] | null> = new BehaviorSubject<FBSpent[] | null>(null);
    public spents$: Observable<FBSpent[] | null> = this._spents.asObservable();
    public user: FBUser | null = null;

    setUser(newUser: FBUser | null) {
        if (newUser) {
            this._user.next(newUser);
        } else {
            this.resetAll();
        }
    }

    getUser() {
        return this._user;
    }

    setVehicles(newVehicle: FBVehicle) {
        this._vehicles.next(newVehicle);
    }

    getVehicles() {
        return this._vehicles;
    }

    setSpents(nweSpents: FBSpent[]) {
        this._spents.next(nweSpents);
    }

    getSpents() {
        return this._spents;
    }

    resetAll() {
        this.user = null;
        this._user.next(null);
        this._vehicles.next(null);
        this._spents.next(null);
    }
}
