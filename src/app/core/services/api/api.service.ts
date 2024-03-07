import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../interfaces/User';
import { HttpClientProvider } from '../http/http-client.provider';

/**
 * Service for making API requests.
 * 
 * @param http The HttpClientProvider instance.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
    protected _user = new BehaviorSubject<User | null>(null);
    public user$ = this._user.asObservable();

    /**
     * Constructs a new instance of the ApiService.
     * 
     * @param http The HttpClientProvider instance.
     */
    constructor(
        private http: HttpClientProvider,
    ) {
        this.http.get
    }

    /**
     * Updates the user BehaviorSubject with the provided user data.
     * @param user The user data to update.
     */
    updateUser(user: User): void {
        this._user.next(user);
    }

    /**
     * Gets the current user data from the user BehaviorSubject.
     * @return The current user data, or null if no user data is available.
     */
    getUser(): User | null {
        return this._user.getValue();
    }
}
