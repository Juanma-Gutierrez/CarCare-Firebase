import { Observable, from, map } from 'rxjs';
import { AuthService } from '../auth.service';
import { FirebaseDocument, FirebaseService, FirebaseUserCredential } from './firebase.service';
import { FBUser, FBUserCredential } from './interfaces/FBUser';
import { UtilsService } from '../../utils.service';
import { LocalDataService } from '../local-data.service';
import { inject } from '@angular/core';

export class FirebaseAuthService extends AuthService {
    localDataSvc: LocalDataService = inject(LocalDataService);

    constructor(
        private firebaseSvc: FirebaseService,
        private utilSvc: UtilsService
    ) {
        super();
        this.firebaseSvc.isLogged$.subscribe(logged => this._logged.next(logged));
    }

    public override login(credentials: any): Observable<any> {
        return new Observable(observer => {
            this.firebaseSvc.connectUserWithEmailAndPassword(credentials.username, credentials.password).then((credentials: FirebaseUserCredential | null) => {
                if (!credentials || !credentials.user || !credentials.user.user || !credentials.user.user.uid) {
                    observer.error('Cannot login');
                }
            });
        });
    }

    public override register(info: FBUserCredential): Observable<any> {
        return new Observable<FBUser>(subscr => { // FBUser -> User
            this.firebaseSvc.createUserWithEmailAndPassword(info.email, info.password).then((credentials: FirebaseUserCredential | null) => {
                if (!credentials || !credentials.user || !credentials.user.user || !credentials.user.user.uid)
                    subscr.error('Cannot register');
                if (credentials) {
                    var _info: any = { ...info };
                    _info.uuid = credentials.user.user.uid;
                    var user: FBUser = {
                        nickname: _info.username,
                        name: _info.name,
                        surname: _info.surname,
                        email: _info.email,
                        id: credentials.user.user.uid,
                        vehicles: [],
                        uuid: _info.uuid
                    };
                    this.postRegister(_info).subscribe(_ => {
                        this._user.next(user);
                        this._logged.next(true);
                        subscr.next(_info);
                        subscr.complete();
                    });
                    this.createEmptyProviders(credentials.user.user.uid)
                }
            })
        });
    }

    private postRegister(info: any): Observable<any> {  // User
        // Registra al usuario con los datos capturados del formulario
        // de registro dentro de la colección users
        if (info.uuid)
            return from(this.firebaseSvc.createDocumentWithId('user', {
                email: info.email,
                id: info.uuid,
                name: info.name,
                nickname: info.username,
                surname: info.surname,
                vehicles: [],
                uuid: info.uuid
            }, info.uuid))
        throw new Error('Error inesperado');
    }


    public override logout(): Observable<void> {
        return from(this.firebaseSvc.signOut(false));
    }

    public me(): Observable<FBUser> {
        if (this.localDataSvc.user?.id)
            return from(this.firebaseSvc.getDocument('user', this.localDataSvc.user.id)).pipe(map(data => {
                const newUser: FBUser = this.convertToUser(data)
                this.saveLocalUser(newUser)
                return newUser
            }));
        else
            throw new Error('User is not connected');
    }

    saveLocalUser(newUser: FBUser) {
        this.localDataSvc.setUser(newUser);
    }

    convertToUser(data: FirebaseDocument): FBUser {
        return {
            email: data.data['email'],
            id: data.id,
            name: data.data['name'],
            nickname: data.data['nickname'],
            surname: data.data['surname'],
            vehicles: data.data['vehicles'],
            uuid: data.id
        }
    }

    createEmptyProviders(uid: string) {
        var providers = {
            providers: []
        }
        console.log("Creando proveedores vacíos", providers)
        this.firebaseSvc.createDocumentWithId("providers", providers, uid)
    }
}
