import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Provider } from '../../interfaces/Provider';
import { Spent } from '../../interfaces/Spent';
import { User } from '../../interfaces/User';
import { Vehicle } from '../../interfaces/Vehicle';

/**
 * Class representing a local data service.
 * Manages user-related data, vehicles, expenses, and providers.
 */
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

    /**
     * Sets the user to a new value or null.
     * @param {User | null} newUser - The new user object or null.
     * @returns {void}
     */
    setUser(newUser: User | null) {
        if (newUser) {
            this._user.next(newUser);
        } else {
            this.resetAll();
        }
    }

    /**
     * Retrieves the BehaviorSubject containing the user information.
     * @returns {BehaviorSubject<User | null>} The user BehaviorSubject.
     */
    getUser(): BehaviorSubject<User | null> {
        return this._user;
    }

    /**
     * Sets the vehicle to a new value or null.
     * @param {Vehicle | null} vehicle - The new vehicle object or null.
     * @returns {void}
     */
    setVehicle(vehicle: Vehicle | null) {
        this._vehicle.next(vehicle);
    }

    /**
     * Retrieves the BehaviorSubject containing the vehicle information.
     * @returns {BehaviorSubject<Vehicle | null>} The vehicle BehaviorSubject.
     */
    getVehicle(): BehaviorSubject<Vehicle | null> {
        return this._vehicle;
    }

    /**
     * Sets the array of spents.
     * @param {Spent[]} spents - The array of spents.
     * @returns {void}
     */
    setSpents(spents: Spent[]) {
        this._spents.next(spents);
    }

    /**
     * Retrieves the BehaviorSubject containing the array of spents.
     * @returns {BehaviorSubject<Spent[]>} The spents BehaviorSubject.
     */
    getSpents(): BehaviorSubject<Spent[]> {
        return this._spents;
    }

    /**
     * Sets the providers to a new array of providers or null.
     * @param {Provider[] | null} providers - The new array of providers or null.
     * @returns {void}
     */
    setProviders(providers: Provider[] | null) {
        this._providers.next(providers)
    }

    /**
     * Retrieves the BehaviorSubject containing the array of providers.
     * @returns {BehaviorSubject<Provider[] | null>} The providers BehaviorSubject.
     */
    getProviders(): BehaviorSubject<Provider[] | null> {
        return this._providers
    }

    /**
     * Resets all stored data, including user, vehicle, spents, and providers.
     * @returns {void}
     */
    resetAll() {
        this.user = null;
        this._user.next(null);
        this._vehicle.next(null);
        this._spents.next([]);
        this._providers.next(null);
    }
}
