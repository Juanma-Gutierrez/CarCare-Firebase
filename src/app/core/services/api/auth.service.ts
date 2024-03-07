import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../interfaces/User';

/**
 * Abstract class representing an authentication service.
 * Provides methods for user login, registration, logout, and retrieving user information.
 */
@Injectable({
    providedIn: 'root'
})
export abstract class AuthService {
    protected _logged = new BehaviorSubject<boolean>(false);
    public isLogged$ = this._logged.asObservable();
    protected _user = new BehaviorSubject<User | null>(null);
    public user$ = this._user.asObservable();

    /**
     * Attempts to log in the user with the provided credentials.
     * @param credentials An object containing login credentials (e.g., username and password).
     * @returns An observable that emits the login response.
     */
    public abstract login(credentials: Object): Observable<any>;

    /**
     * Registers a new user with the provided information.
     * @param info An object containing user registration details.
     * @returns An observable that emits the registration response.
     */
    public abstract register(info: Object): Observable<any>;

    /**
     * Logs out the currently authenticated user.
     * @returns An observable that completes when the logout process is successful.
     */
    public abstract logout(): Observable<void>;

    /**
     * Retrieves information about the currently authenticated user.
     * @returns An observable that emits user details.
     */
    public abstract me(): Observable<any>;
}
