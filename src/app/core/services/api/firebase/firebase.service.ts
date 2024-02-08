import { Inject, Injectable } from '@angular/core';
import { FirebaseApp, initializeApp, getApp } from 'firebase/app'
import { getDoc, doc, getFirestore, DocumentData, Firestore, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, deleteUser, signInAnonymously, signOut, signInWithEmailAndPassword, initializeAuth, indexedDBLocalPersistence, UserCredential, Auth, User } from "firebase/auth";
import { BehaviorSubject, Observable } from 'rxjs';
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
    private _app!: FirebaseApp;
    private _db!: Firestore;
    private _auth!: Auth;
    private _user: User | null = null;
    private _isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isLogged$: Observable<boolean> = this._isLogged.asObservable();

    constructor(
        @Inject('firebase-config') config: any
    ) {
        this.init(config);
    }
    public async init(firebaseConfig: any) {
        // Initialize Firebase
        this._app = initializeApp(firebaseConfig);
        this._db = getFirestore(this._app);
        this._auth = initializeAuth(getApp(), { persistence: indexedDBLocalPersistence });
        this._auth.onAuthStateChanged(async user => {
            this._user = user;
            if (user) {
                if (user.uid && user.email) {
                    this._isLogged.next(true);
                }
            } else {
                this._isLogged.next(false);
            }
        });
    }

    public get user(): User | null {
        return this._user;
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
            } catch (error: any) {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        console.log(`Email address ${email} already in use.`);
                        break;
                    case 'auth/invalid-email':
                        console.log(`Email address ${email} is invalid.`);
                        break;
                    case 'auth/operation-not-allowed':
                        console.log(`Error during sign up.`);
                        break;
                    case 'auth/weak-password':
                        console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
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
}
