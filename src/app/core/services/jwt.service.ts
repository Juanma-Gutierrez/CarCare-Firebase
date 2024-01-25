import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

export type JwtToken = string;
@Injectable({ providedIn: 'root' })
export class JwtService {
    token: string = "";

    constructor() {
    }

    /**
     * Carga el token JWT almacenado.
     * @return Observable que emite el token JWT cargado.
     */
    loadToken(): Observable<JwtToken> {
        return new Observable<JwtToken>(observer => {
            Preferences.get({ key: 'jwtToken' }).then((ret: any) => {
                if (ret['value']) {
                    this.token = JSON.parse(ret.value);
                    if (this.token == '' || this.token == null)
                        observer.error('No token');
                    else
                        observer.next(this.token);
                    observer.complete();
                }
                else {
                    observer.error('No token');
                    observer.complete();
                }
            }).catch((error: any) => observer.error(error));
        });
    }

    /**
     * Obtiene el token JWT actual.
     * @return Token JWT actual.
     */
    getToken(): JwtToken {
        return this.token;
    }

    /**
     * Almacena un nuevo token JWT.
     * @param token Nuevo token JWT a almacenar.
     * @return Observable que emite el token JWT almacenado.
     */
    saveToken(token: JwtToken): Observable<JwtToken> {
        return new Observable<JwtToken>(observer => {
            Preferences.set({
                key: 'jwtToken',
                value: JSON.stringify(token)
            }).then((_) => {
                this.token = token;
                observer.next(this.token);
                observer.complete();
            }).catch((error: any) => {
                observer.error(error);
            });
        });
    }

    /**
     * Elimina el token JWT almacenado.
     * @return Observable que emite el token JWT eliminado.
     */
    destroyToken(): Observable<JwtToken> {
        this.token = "";
        return this.saveToken(this.token);
    }
}
