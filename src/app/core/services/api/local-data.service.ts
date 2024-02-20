import { Injectable } from '@angular/core';
import { FBUser } from './firebase/interfaces/FBUser';
import { FBVehicle } from './firebase/interfaces/FBVehicle';
import { BehaviorSubject, Observable } from 'rxjs';
import { FBSpent } from './firebase/interfaces/FBSpent';
import { FBProvider } from './firebase/interfaces/FBProvider';

@Injectable({
    providedIn: 'root'
})
export class LocalDataService {
    private _user: BehaviorSubject<FBUser | null> = new BehaviorSubject<FBUser | null>(null);
    public user$: Observable<FBUser | null> = this._user.asObservable();

    private _vehicle: BehaviorSubject<FBVehicle | null> = new BehaviorSubject<FBVehicle | null>(null)
    public vehicle$: Observable<FBVehicle | null> = this._vehicle.asObservable();

    private _spents: BehaviorSubject<FBSpent[]> = new BehaviorSubject<FBSpent[]>([]);
    public spents$: Observable<FBSpent[]> = this._spents.asObservable();

    private _providers: BehaviorSubject<FBProvider[] | null> = new BehaviorSubject<FBProvider[] | null>(null);
    public providers$: Observable<FBProvider[] | null> = this._providers.asObservable();

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

    setVehicle(vehicle: FBVehicle) {
        this._vehicle.next(vehicle);
    }

    getVehicle() {
        return this._vehicle;
    }

    setSpents(spents: FBSpent[]) {
        this._spents.next(spents);
    }

    getSpents() {
        return this._spents;
    }

    setProviders(providers: FBProvider[] | null) {
        this._providers.next(providers)
    }

    getProviders() {
        return this._providers
    }

    resetAll() {
        this.user = null;
        this._user.next(null);
        this._vehicle.next(null);
        this._spents.next([]);
        this._providers.next(null);
    }
}
