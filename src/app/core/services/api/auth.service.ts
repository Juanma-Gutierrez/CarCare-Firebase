import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export abstract class AuthService {
    protected _logged = new BehaviorSubject<boolean>(false);
    public isLogged$ = this._logged.asObservable();
    protected _user = new BehaviorSubject<any | null>(null); // User
    public user$ = this._user.asObservable();

    public abstract login(credentials: Object): Observable<any>;
    public abstract register(info: Object): Observable<any>;
    public abstract logout(): Observable<void>;
    public abstract me(): Observable<any>;
}
