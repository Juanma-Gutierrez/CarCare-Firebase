import { BehaviorSubject } from 'rxjs';
import { HttpClientProvider } from '../http/http-client.provider';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/User';

@Injectable({ providedIn: 'root' })
export class ApiService {
    protected _user = new BehaviorSubject<User | null>(null);
    public user$ = this._user.asObservable();

    constructor(
        private http: HttpClientProvider,
    ) {
        this.http.get
    }

    updateUser(user: User): void {
        this._user.next(user);
    }

    getUser(): User | null {
        return this._user.getValue();
    }

}
