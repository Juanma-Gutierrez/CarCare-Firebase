import { inject } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { User, UserCredential } from '../../../interfaces/User';
import { PROVIDER, USER } from '../../const.service';
import { UtilsService } from '../../utils.service';
import { AuthService } from '../auth.service';
import { LocalDataService } from '../local-data.service';
import { FirebaseService } from './FirebaseService';
import { FirebaseMappingService } from './firebase-mapping.service';
import { FirebaseUserCredential } from './firebase.service';

/**
 * Extends the AuthService to provide authentication using Firebase.
 * @param firebaseSvc The FirebaseService instance.
 * @param firebaseMappingSvc The FirebaseMappingService instance.
 * @param localDataSvc The LocalDataService instance.
 * @param utilSvc The UtilsService instance.
 */

export class FirebaseAuthService extends AuthService {
    firebaseSvc: FirebaseService = inject(FirebaseService);
    firebaseMappingSvc: FirebaseMappingService = inject(FirebaseMappingService);
    localDataSvc: LocalDataService = inject(LocalDataService);

    /**
     * Constructs a new instance of the FirebaseAuthService.
     * @param utilSvc The UtilsService instance.
     */
    constructor(
        private utilSvc: UtilsService
    ) {
        super();
        this.firebaseSvc.isLogged$.subscribe(logged => this._logged.next(logged));
    }

    /**
     * Overrides the login method to authenticate using Firebase.
     * @param credentials The user credentials.
     * @return An Observable representing the authentication process.
     */
    public override login(credentials: any): Observable<any> {
        return new Observable(observer => {
            this.firebaseSvc.connectUserWithEmailAndPassword(credentials.username, credentials.password).then((credentials: FirebaseUserCredential | null) => {
                if (!credentials || !credentials.user || !credentials.user.user || !credentials.user.user.uid) {
                    observer.error('Cannot login');
                }
            });
        });
    }

    /**
     * Overrides the register method to register a user using Firebase.
     * @param info The user credentials.
     * @return An Observable representing the registration process.
     */
    public override register(info: UserCredential): Observable<any> {
        return new Observable<User>(subscr => {
            this.firebaseSvc.createUserWithEmailAndPassword(info.email, info.password).then((credentials: FirebaseUserCredential | null) => {
                if (!credentials || !credentials.user || !credentials.user.user || !credentials.user.user.uid)
                    subscr.error('Cannot register');
                if (credentials) {
                    var _info: any = { ...info };
                    _info.userId = credentials.user.user.uid;
                    var user: User = this.firebaseMappingSvc.mapUser(_info, USER, credentials.user.user.uid);
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

    /**
     * Handles the post-registration process by creating a user document in Firebase.
     * @param info The user information.
     * @return An Observable representing the post-registration process.
     * @throws Error if there is an unexpected error.
     */
    private postRegister(info: any): Observable<any> {
        if (info.userId) {
            var user: User = this.firebaseMappingSvc.mapUser(info, USER, info.userId)
            return from(this.firebaseSvc.createDocumentWithId(USER, user, info.userId))
        }
        throw new Error('Error inesperado');
    }

    /**
     * Overrides the logout method to sign out the user from Firebase.
     * @return An Observable representing the logout process.
     */
    public override logout(): Observable<void> {
        return from(this.firebaseSvc.signOut(false));
    }

    /**
     * Retrieves information about the current user.
     * @return An Observable emitting information about the current user.
     * @throws Error if the user is not connected.
     */
    public me(): Observable<User> {
        if (this.localDataSvc.user?.userId)
            return from(this.firebaseSvc.getDocument(USER, this.localDataSvc.user.userId)).pipe(map(data => {
                const newUser: User = this.firebaseMappingSvc.convertToUser(data)
                this.saveLocalUser(newUser);
                return newUser
            }));
        else
            throw new Error('User is not connected');
    }

    /**
     * Saves the provided user locally.
     * @param newUser The user to be saved locally.
     */
    saveLocalUser(newUser: User) {
        console.info("User to save: ", newUser);
        this.localDataSvc.setUser(newUser);
    }

    /**
     * Creates empty provider data for the user identified by the provided UID.
     * @param uid The UID of the user.
     */
    async createEmptyProviders(uid: string) {
        var providers = {
            providers: []
        }
        await this.firebaseSvc.createDocumentWithId(PROVIDER, providers, uid)
    }
}
