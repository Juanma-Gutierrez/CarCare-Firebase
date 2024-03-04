import { AuthService } from '../auth.service';
import { FirebaseDocument, FirebaseService, FirebaseUserCredential } from './firebase.service';
import { LocalDataService } from '../local-data.service';
import { Observable, from, map } from 'rxjs'; UtilsService
import { User, UserCredential } from '../../../interfaces/User';
import { UtilsService } from '../../utils.service';
import { inject } from '@angular/core';
import { FirebaseMappingService } from './firebase-mapping.service';


export class FirebaseAuthService extends AuthService {
    firebaseSvc: FirebaseService = inject(FirebaseService);
    firebaseMappingSvc: FirebaseMappingService = inject(FirebaseMappingService);
    localDataSvc: LocalDataService = inject(LocalDataService);

    constructor(
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

    public override register(info: UserCredential): Observable<any> {
        return new Observable<User>(subscr => {
            this.firebaseSvc.createUserWithEmailAndPassword(info.email, info.password).then((credentials: FirebaseUserCredential | null) => {
                if (!credentials || !credentials.user || !credentials.user.user || !credentials.user.user.uid)
                    subscr.error('Cannot register');
                if (credentials) {
                    var _info: any = { ...info };
                    _info.uuid = credentials.user.user.uid;
                    var user: User = this.firebaseMappingSvc.mapUser(_info, "user", credentials.user.user.uid);
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

    private postRegister(info: any): Observable<any> {
        if (info.uuid) {
            var user: User = this.firebaseMappingSvc.mapUser(info, "user", info.uuid)
            return from(this.firebaseSvc.createDocumentWithId('user', user, info.uuid))
        }
        throw new Error('Error inesperado');
    }


    public override logout(): Observable<void> {
        return from(this.firebaseSvc.signOut(false));
    }

    public me(): Observable<User> {
        if (this.localDataSvc.user?.userId)
            return from(this.firebaseSvc.getDocument('user', this.localDataSvc.user.userId)).pipe(map(data => {
                const newUser: User = this.firebaseMappingSvc.convertToUser(data)
                this.saveLocalUser(newUser);
                return newUser
            }));
        else
            throw new Error('User is not connected');
    }

    saveLocalUser(newUser: User) {
        console.info("User to save: ", newUser);
        this.localDataSvc.setUser(newUser);
    }

    createEmptyProviders(uid: string) {
        var providers = {
            providers: []
        }
        this.firebaseSvc.createDocumentWithId("providers", providers, uid)
    }
}
