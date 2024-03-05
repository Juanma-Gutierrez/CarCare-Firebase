import { Injectable } from '@angular/core';
import { User } from '../../interfaces/User';
import { Vehicle } from '../../interfaces/Vehicle';
import { BehaviorSubject, Observable } from 'rxjs';
import { Spent } from '../../interfaces/Spent';
import { Provider } from '../../interfaces/Provider';

@Injectable({
    providedIn: 'root'
})
export class LocalDataService {
    private _user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    public user$: Observable<User | null> = this._user.asObservable();

    private _vehicle: BehaviorSubject<Vehicle | null> = new BehaviorSubject<Vehicle | null>(null)
    public vehicle$: Observable<Vehicle | null> = this._vehicle.asObservable();

    private _spents: BehaviorSubject<Spent[]> = new BehaviorSubject<Spent[]>([]);
    public spents$: Observable<Spent[]> = this._spents.asObservable();

    private _providers: BehaviorSubject<Provider[] | null> = new BehaviorSubject<Provider[] | null>(null);
    public providers$: Observable<Provider[] | null> = this._providers.asObservable();

    public user: User | null = null;

    setUser(newUser: User | null) {
        if (newUser) {
            this._user.next(newUser);
        } else {
            this.resetAll();
        }
    }

    getUser(): BehaviorSubject<User | null> {
        return this._user;
    }

    setVehicle(vehicle: Vehicle | null) {
        this._vehicle.next(vehicle);
    }

    getVehicle(): BehaviorSubject<Vehicle | null> {
        return this._vehicle;
    }

    setSpents(spents: Spent[]) {
        this._spents.next(spents);
    }

    getSpents(): BehaviorSubject<Spent[]> {
        return this._spents;
    }

    setProviders(providers: Provider[] | null) {
        this._providers.next(providers)
    }

    getProviders(): BehaviorSubject<Provider[] | null> {
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
