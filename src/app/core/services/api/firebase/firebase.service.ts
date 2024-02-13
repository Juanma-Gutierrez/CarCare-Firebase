import { Inject, Injectable } from '@angular/core';
import { FirebaseApp, initializeApp, getApp } from 'firebase/app'
import { getDoc, doc, getFirestore, DocumentData, Firestore, setDoc, collection, addDoc, updateDoc, DocumentReference, Unsubscribe, onSnapshot } from "firebase/firestore";
import { createUserWithEmailAndPassword, deleteUser, signInAnonymously, signOut, signInWithEmailAndPassword, initializeAuth, indexedDBLocalPersistence, UserCredential, Auth, User } from "firebase/auth";
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtToken } from '../../jwt.service';
import { Preferences } from '@capacitor/preferences';
import { UtilsService } from '../../utils.service';
import { FBUser } from './interfaces/FBUser';
import { LocalDataService } from '../local-data.service';

export interface Uuid {
    uuid: String
}

export interface FirebaseStorageFile {
    path: string,
    file: string
};

export interface FirebaseDocument {
    id: string;
    data: DocumentData;
}

export interface FirebaseUserCredential {
    user: UserCredential
}

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    private userUuid!: Uuid;
    private _app!: FirebaseApp;
    private _db!: Firestore;
    private _auth!: Auth;
    //private _user: User | null = null;
    private _isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isLogged$: Observable<boolean> = this._isLogged.asObservable();

    constructor(
        @Inject('firebase-config') config: any,
        private utilSvc: UtilsService,
        private localDataSvc: LocalDataService
    ) {
        this.init(config);
    }
    public async init(firebaseConfig: any) {
        // Initialize Firebase
        this._app = initializeApp(firebaseConfig);
        this._db = getFirestore(this._app);
        this._auth = initializeAuth(getApp(), { persistence: indexedDBLocalPersistence });
        this._auth.onAuthStateChanged(async user => {

            if (user?.uid && user?.email) {
                this.subscribeToDocument("users", user.uid, this.localDataSvc._user);
                this._isLogged.next(true);
            } else {
                this.localDataSvc.updateUser(null);
                this._isLogged.next(false);
            }
        });
    }


    public async connectUserWithEmailAndPassword(email: string, password: string): Promise<FirebaseUserCredential | null> {
        return new Promise<FirebaseUserCredential | null>(async (resolve, reject) => {
            if (!this._auth)
                resolve(null);
            resolve({ user: await signInWithEmailAndPassword(this._auth!, email, password) });
        });
    }

    public async createUserWithEmailAndPassword(email: string, password: string): Promise<FirebaseUserCredential | null> {
        return new Promise(async (resolve, reject) => {
            if (!this._auth)
                resolve(null);
            try {
                resolve({ user: await createUserWithEmailAndPassword(this._auth!, email, password) });
                // TODO Control de los mensajes en diferentes idiomas
                this.utilSvc.showToast(`Registro realizado con éxito`, "success", "bottom")
            } catch (error: any) {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        this.utilSvc.showToast(`Email address ${email} already in use.`, "danger", "bottom")
                        break;
                    case 'auth/invalid-email':
                        this.utilSvc.showToast(`Email address ${email} is invalid.`, "danger", "bottom")
                        break;
                    case 'auth/operation-not-allowed':
                        this.utilSvc.showToast(`Error during sign up.`, "danger", "bottom")
                        break;
                    case 'auth/weak-password':
                        this.utilSvc.showToast(`Password is not strong enough. Add additional characters including special characters and numbers.`, "danger", "bottom")
                        break;
                    default:
                        console.log(error.message);
                        break;
                }
                reject(error);
            }
        });
    }

    public createDocument(collectionName: string, data: any): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!this._db)
                reject({
                    msg: "Database is not connected"
                });
            const collectionRef = collection(this._db!, collectionName);
            addDoc(collectionRef, data).then(docRef => resolve(docRef.id)
            ).catch(err => reject(err));
        });
    }

    public createDocumentWithId(
        collectionName: string,
        data: any,
        docId: string
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this._db) {
                reject({
                    msg: 'Database is not connected',
                });
            }
            const docRef = doc(this._db!, collectionName, docId);
            setDoc(docRef, data)
                .then(() => resolve())
                .catch((err) => reject(err));
        });
    }

    public getDocument(collectionName: string, document: string): Promise<FirebaseDocument> {
        return new Promise(async (resolve, reject) => {
            if (!this._db)
                reject({
                    msg: "Database is not connected"
                });
            const docRef = doc(this._db!, collectionName, document);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                resolve({ id: docSnap.id, data: docSnap.data() });
            } else {
                // doc.data() will be undefined in this case
                reject('document does not exists');
            }
        });
    }

    public getDocumentByRef(docRef: DocumentReference): Promise<FirebaseDocument> {
        return new Promise(async (resolve, reject) => {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                resolve({ id: docSnap.id, data: docSnap.data() });
            } else {
                // doc.data() will be undefined in this case
                reject('document does not exists');
            }
        });
    }

    public updateDocument(collectionName: string, document: string, data: any): Promise<void> {
        return new Promise(async (resolve, reject) => {
            if (!this._db)
                reject({
                    msg: "Database is not connected"
                });
            const collectionRef = collection(this._db!, collectionName);
            updateDoc(doc(collectionRef, document), data).then(docRef => resolve()
            ).catch(err => reject(err));
        });
    }

    public async signOut(signInAnon: boolean = false): Promise<void> {
        new Promise<void>(async (resolve, reject) => {
            if (this._auth)
                try {
                    await this._auth.signOut();
                    //      if (signInAnon)
                    //          await this.connectAnonymously();
                    resolve();
                } catch (error) {
                    reject(error);
                }
        });
    }

/*     public subscribeToCollection(collectionName: string, subject: BehaviorSubject<any[]>, mapFunction: (el: DocumentData) => any): Unsubscribe | null {
        if (!this._db)
            return null;
        return onSnapshot(collection(this._db, collectionName), (snapshot) => {
            subject.next(snapshot.docs.map<any>(doc => mapFunction(doc)));
        }, error => { throw new Error(error.message) });
    } */

    public subscribeToDocument(collectionName: string, documentId: string, subject: BehaviorSubject<any>, mapFunction: (el: DocumentData) => any = res => res): Unsubscribe | null {
        if (!this._db)
            return null;
        const docRef = doc(this._db, collectionName, documentId);
        return onSnapshot(docRef, (snapshot) => {
            if (snapshot.exists())
                subject.next(mapFunction(snapshot.data() as DocumentData));
            else
                throw new Error('Error: The document does not exist.')
        }, error => { throw new Error(error.message) });
    }

}
