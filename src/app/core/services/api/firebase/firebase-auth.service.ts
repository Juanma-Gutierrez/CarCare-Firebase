import { Observable, from, map } from 'rxjs';
import { AuthService } from '../auth.service';
import { FirebaseService, FirebaseUserCredential } from './firebase.service';
import { FBUser } from './interfaces/FBUser';
import { User } from 'src/app/core/interfaces/User';
import { UtilsService } from '../../utils.service';

export class FirebaseAuthService extends AuthService {

    constructor(
        private firebaseSvc: FirebaseService,
        private utilSvc: UtilsService
    ) {
        super();
        this.firebaseSvc.isLogged$.subscribe(logged => {
            if (logged) {
                this.me().subscribe({
                    next: data => {
                        this._user.next(data);
                        this._logged.next(true);
                    },
                    error: err => {
                        console.log(err);
                    }
                });
            }
            else {
                this._logged.next(false);
                this._user.next(null);
            }
        })
    }

    public override login(credentials: any): Observable<any> {
        return new Observable(observer => {
            this.firebaseSvc.connectUserWithEmailAndPassword(credentials.username, credentials.password).then((credentials: FirebaseUserCredential | null) => {
                if (!credentials || !credentials.user || !credentials.user.user || !credentials.user.user.uid) {
                    observer.error('Cannot login');
                }
                if (credentials) {
                    this.me().subscribe(data => {
                        this.utilSvc.showToast("Arrancando el motor", "primary","bottom")
                        this._user.next(data);
                        this._logged.next(true);
                        observer.next(data);
                        observer.complete();
                    });
                }
            });
        });
    }

    public override register(info: FBUser): Observable<any> {
        return new Observable<FBUser>(subscr => { // FBUser -> User
            this.firebaseSvc.createUserWithEmailAndPassword(info.email, info.password).then((credentials: FirebaseUserCredential | null) => {
                if (!credentials || !credentials.user || !credentials.user.user || !credentials.user.user.uid)
                    subscr.error('Cannot register');
                if (credentials) {
                    var _info: any = { ...info };
                    _info.uuid = this.firebaseSvc.user?.uid;
                    var user: FBUser = {
                        nickname: _info.username,
                        name: _info.name,
                        surname: _info.surname,
                        email: _info.email,
                        password: _info.password,
                        uuid: _info.uuid,
                        vehicles: []
                    };
                    this.postRegister(_info).subscribe(_ => {
                        this._user.next(user);
                        this._logged.next(true);
                        subscr.next(_info);
                        subscr.complete();
                    });
                }
            })
        });
    }

    private postRegister(info: any): Observable<any> {  // User
        // Registra al usuario con los datos capturados del formulario
        // de registro dentro de la colección users
        if (info.uuid)
            return from(this.firebaseSvc.createDocumentWithId('users', {
                name: info.name,
                surname: info.surname,
                nickname: info.username,
                uuid: info.uuid,
                email: info.email,
            }, info.uuid))
        throw new Error('Error inesperado');
    }


    public override logout(): Observable<void> {
        console.log("logout");
        return from(this.firebaseSvc.signOut(false));
    }

    public me(): Observable<User> {
        if (this.firebaseSvc.user?.uid)
            return from(this.firebaseSvc.getDocument('users', this.firebaseSvc.user.uid)).pipe(map(data => {
                return {
                    name: data.data['name'],
                    surname: data.data['surname'],
                    nickname: data.data['nickname'],
                    uuid: data.id
                }
            }));
        else
            throw new Error('User is not connected');
    }

}