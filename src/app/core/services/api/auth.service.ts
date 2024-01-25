import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/User';

/**
 * La clase abstracta `AuthService` define la interfaz para un servicio de
 * autenticación. Proporciona métodos abstractos para gestionar la autenticación
 * del usuario, como el inicio de sesión, registro, cierre de sesión y obtener
 * información del usuario.
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
     * Método abstracto para iniciar sesión.
     * @param credentials Credenciales del usuario para iniciar sesión.
     * @returns Observable que emite el resultado del inicio de sesión.
     */
    public abstract login(credentials: Object): Observable<any>;

    /**
     * Método abstracto para registrar un nuevo usuario.
     * @param info Información del usuario para el registro.
     * @returns Observable que emite el resultado del registro.
     */
    public abstract register(info: Object): Observable<any>;

    /**
     * Método abstracto para cerrar sesión.
     * @returns Observable que emite el resultado del cierre de sesión.
     */
    public abstract logout(): Observable<void>;

    /**
     * Método abstracto para obtener la información del usuario autenticado.
     * @returns Observable que emite la información del usuario.
     */
    public abstract me(): Observable<any>;
}
