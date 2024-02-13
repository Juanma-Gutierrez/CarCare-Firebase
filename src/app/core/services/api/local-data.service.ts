import { Injectable } from '@angular/core';
import { FBUser } from './firebase/interfaces/FBUser';
import { FBVehicle } from './firebase/interfaces/FBVehicle';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirebaseService } from './firebase/firebase.service';

@Injectable({
    providedIn: 'root'
})
export class LocalDataService {
    public _user: BehaviorSubject<FBUser | null> = new BehaviorSubject<FBUser | null>(null);
    public user$: Observable<FBUser | null> = this._user.asObservable();
    public _vehicles: BehaviorSubject<FBVehicle[] | null> = new BehaviorSubject<FBVehicle[] | null>(null)
    public vehicles$: Observable<FBVehicle[] | null> = this._vehicles.asObservable();
    public user: FBUser | null = null;

    updateUser(newUser: FBUser | null) {
        this._user.next(newUser);
    }

    updateVehicles(newVehicles: FBVehicle[]) {
        this._vehicles.next(newVehicles);
    }
}