import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { JwtService } from '../../jwt.service';
import { Observable, lastValueFrom, map } from 'rxjs';
import { PostStrapiRegister, StrapiMe, StrapiOwner, StrapiRegisterPayload, StrapiUser } from './interfaces/strapi-users';
import { StrapiRegisterResponse } from './interfaces/strapi-data';
import { User, UserRegisterInfo } from 'src/app/core/interfaces/User';
import { UserCredentials } from '../../../interfaces/User-credentials';

/**
 * Servicio de autenticación que interactúa con la API de Strapi.
 * Extiende la clase base AuthService.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthStrapiService extends AuthService {

    /**
     * Constructor del servicio AuthStrapiService.
     * @param jwtSvc Servicio JwtService para la gestión de tokens JWT.
     * @param apiSvc Servicio ApiService para realizar peticiones a la API.
     */
    constructor(
        private jwtSvc: JwtService,
        private apiSvc: ApiService,
    ) {
        super();
        this.jwtSvc.loadToken().subscribe(token => {
            if (token) {
                this.me().subscribe(user => {
                    this._logged.next(true);
                    this._user.next(user);
                })
            } else {
                this._logged.next(false);
                this._user.next(null);
            }
        });
    }

    /**
     * Inicia sesión del usuario utilizando las credenciales proporcionadas.
     * @param credentials Credenciales del usuario que incluyen el nombre de usuario (identifier) y la contraseña (password).
     * @return Observable que emite un evento cuando el inicio de sesión ha sido completado exitosamente.
     */
    public login(credentials: UserCredentials): Observable<void> {
        return new Observable<void>(obs => {
            const _credentials = {
                identifier: credentials.username,
                password: credentials.password
            };
            this.apiSvc.post("/api/auth/local", _credentials).subscribe({
                next: async (data) => {
                    await lastValueFrom(this.jwtSvc.saveToken(data.jwt));
                    let connected = data && data.jwt != '';
                    this._logged.next(connected);
                    this.me().subscribe(
                        (user: User) => {
                            if (this.apiSvc) {
                                this.apiSvc.updateUser(user);
                            } else {
                                console.error('this.authSvc no está definido.');
                            }
                        },
                        error => {
                            console.error('Error en la suscripción a me():', error);
                        }
                    );
                    obs.next();
                    obs.complete();
                },
                error: err => {
                    obs.error(err);
                }
            });
        });
    }

    /**
     * Cierra la sesión del usuario actual.
     * @return Observable que emite un evento cuando el cierre de sesión ha sido completado exitosamente.
     */
    logout(): Observable<void> {
        return this.jwtSvc.destroyToken().pipe(map(_ => {
            this._logged.next(false);
            return;
        }));
    }

    /**
     * Registra un nuevo usuario con la información proporcionada.
     * @param info Información del usuario a registrar, incluyendo nombre de usuario (username), correo electrónico (email), contraseña (password), nombre (name), apellido (surname), y el rol del usuario (role).
     * @return Observable que emite el usuario registrado cuando el proceso de registro ha sido completado exitosamente.
     */
    register(info: UserRegisterInfo): Observable<User> {
        return new Observable<User>(obs => {
            const _info: StrapiRegisterPayload = {
                username: info.username,
                email: info.email,
                password: info.password
            }
            this.apiSvc.post("/api/auth/local/register", _info).subscribe({
                next: async (data: StrapiRegisterResponse) => {
                    await lastValueFrom(this.jwtSvc.saveToken(data.jwt));
                    const _owner: PostStrapiRegister = {
                        data: {
                            name: info.name,
                            surname: info.surname,
                            users_permissions_user: data.user.id
                        }
                    }
                    try {
                        await lastValueFrom(this.apiSvc.post("/api/owners", _owner));
                        const user = await lastValueFrom(this.me());
                        this._user.next(user);
                        this._logged.next(true);
                        obs.next(user);
                        obs.complete();
                    } catch (error) {
                        obs.error(error);
                    }
                },
                error: err => {
                    console.error(err)
                    obs.error(err);
                }
            });
        });
    }

    /**
     * Obtiene la información del usuario actualmente autenticado.
     * @return Observable que emite la información del usuario cuando la solicitud ha sido completada exitosamente.
     */
    public me(): Observable<User> {
        return new Observable<User>(obs => {
            this.apiSvc.get('/api/users/me').subscribe({
                next: async (user: StrapiMe) => {
                    let extended_user = await lastValueFrom
                        (this.apiSvc.get(`/api/users/${user.id}?populate=owner`));
                    let ret: User = {
                        id: user.id,
                        users_permissions_user: extended_user.owner.id,
                        username: user.username,
                        email: user.email,
                        name: extended_user.owner.name,
                        surname: extended_user.owner.surname,
                    }
                    obs.next(ret);
                    obs.complete();
                },
                error: err => {
                    obs.error(err);
                }
            });
        });
    }
}
