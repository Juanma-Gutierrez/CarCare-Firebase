import { Observable, from, map } from 'rxjs';
import { AuthService } from '../auth.service';
import { FirebaseService, FirebaseUserCredential } from './firebase.service';
import { FBUser } from './interfaces/FBUser';
import { User } from 'src/app/core/interfaces/User';

export class FirebaseAuthService extends AuthService {
    public override login(credentials: Object): Observable<any> {
        console.log("login");
        return new Observable(observer => {
            observer.next();
            observer.complete();
        });
    }
    public override register(info: FBUser): Observable<any> {
        console.log("Register de usuario");
        return new Observable<any>(subscr => {
            this.firebaseSvc.createUserWithEmailAndPassword(info.email, info.password).then((credentials: FirebaseUserCredential | null) => {
                if (!credentials || !credentials.user || !credentials.user.user || !credentials.user.user.uid)
                    subscr.error('Cannot register');
                if (credentials) {
                    var _info: FBUser = { ...info };
                    _info.uuid = this.firebaseSvc.user?.uid;
                    var user: User = {
                        id: 0,
                        users_permissions_user: 0,
                        username: _info.nickname,
                        email: _info.email,
                        name: _info.name,
                        surname: _info.surname
                    };
                    this.postRegister(_info).subscribe(data => {
                        this._user.next(user);
                        this._logged.next(true);
                        subscr.next(_info);
                        subscr.complete();
                    });
                }
            })
        });
    }

    private postRegister(info: FBUser): Observable<any> {
        if (info.uuid)
            return from(this.firebaseSvc.createDocumentWithId('users', {
                name: info.name,
                surname: info.surname,
                nickname: info.nickname,
            }, info.uuid))
        throw new Error('Error inesperado');
    }


    public override logout(): Observable<void> {
        console.log("logout");
        return new Observable(observer => {
            observer.next();
            observer.complete();
        });
    }
    public override me(): Observable<any> {
        console.log("me");
        return new Observable(observer => {
            observer.next();
            observer.complete();
        });
    }

    constructor(
        private firebaseSvc: FirebaseService,
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
}