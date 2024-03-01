import { BehaviorSubject } from 'rxjs';
import { HttpClientProvider } from '../http/http-client.provider';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/User';

/**
 * Servicio que proporciona métodos para realizar operaciones de API.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
    // Inserta aquí el usuario cargado para almacenarlo y mostrarlo en el user-item
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
