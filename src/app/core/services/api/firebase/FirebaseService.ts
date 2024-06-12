import { Inject, Injectable } from '@angular/core';
import { FirebaseApp, getApp, initializeApp } from 'firebase/app';
import {
    Auth,
    createUserWithEmailAndPassword,
    indexedDBLocalPersistence,
    initializeAuth,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import {
    addDoc,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    DocumentData,
    DocumentReference,
    Firestore,
    getDoc,
    getFirestore,
    onSnapshot,
    setDoc,
    Unsubscribe,
    updateDoc,
} from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemLog } from 'src/app/core/interfaces/ItemLog';

import { LOG, MyToast, USER } from '../../const.service';
import { UtilsService } from '../../utils.service';
import { LocalDataService } from '../local-data.service';
import { FirebaseDocument, FirebaseUserCredential } from './firebase.service';


@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    private _app!: FirebaseApp;
    private _db!: Firestore;
    private _auth!: Auth;
    private _isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isLogged$: Observable<boolean> = this._isLogged.asObservable();

    /**
     * Initializes the Firebase service with the given configuration.
     * @param config The Firebase configuration object.
     * @param utilSvc Utility service for showing toast messages.
     * @param localDataSvc Local data service for managing user data.
     */
    constructor(
        @Inject('firebase-config') config: any,
        private utilSvc: UtilsService,
        private localDataSvc: LocalDataService,
    ) {
        this.init(config);
    }

    /**
     * Initializes the Firebase app, Firestore, and authentication with the given configuration.
     * @param firebaseConfig The Firebase configuration object.
     */
    public async init(firebaseConfig: any) {
        this._app = initializeApp(firebaseConfig);
        this._db = getFirestore(this._app);
        this._auth = initializeAuth(getApp(), { persistence: indexedDBLocalPersistence });
        this._auth.onAuthStateChanged(async (user) => {
            if (user?.uid && user?.email) {
                this.subscribeToDocument(USER, user.uid, this.localDataSvc.getUser());
                this._isLogged.next(true);
            } else {
                this.localDataSvc.setUser(null);
                this._isLogged.next(false);
            }
        });
    }

    /**
     * Authenticates a user with email and password.
     * @param email The user's email address.
     * @param password The user's password.
     * @returns A promise that resolves to a FirebaseUserCredential object or null.
     */
    public async connectUserWithEmailAndPassword(email: string, password: string): Promise<FirebaseUserCredential | null> {
        return new Promise<FirebaseUserCredential | null>(async (resolve, reject) => {
            if (!this._auth)
                console.error("Error");
            resolve(null);
            try {
                resolve({ user: await signInWithEmailAndPassword(this._auth!, email, password) });
            } catch (e) {
                if (e instanceof Error) {
                    console.error(e.message);
                    if (e.message == "Firebase: Error (auth/invalid-email)." || e.message == "Firebase: Error (auth/invalid-credential).") {
                        this.utilSvc.showToast("message.auth.loginError", MyToast.Color.DANGER, MyToast.Position.TOP, 3000);
                    }
                }
            }
        });
    }

    /**
     * Creates a new user with email and password.
     * @param email The user's email address.
     * @param password The user's password.
     * @returns A promise that resolves to a FirebaseUserCredential object or null.
     */
    public async createUserWithEmailAndPassword(email: string, password: string): Promise<FirebaseUserCredential | null> {
        return new Promise(async (resolve, reject) => {
            if (!this._auth)
                resolve(null);
            try {
                resolve({ user: await createUserWithEmailAndPassword(this._auth!, email, password) });
                this.utilSvc.showToast("message.auth.signUpOk", MyToast.Color.SUCCESS, MyToast.Position.BOTTOM);
            } catch (error: any) {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        this.utilSvc.showToast("message.auth.emailAlreadyInUse", MyToast.Color.DANGER, MyToast.Position.TOP);
                        break;
                    case 'auth/invalid-email':
                        this.utilSvc.showToast("message.auth.emailAlreadyInUse", MyToast.Color.DANGER, MyToast.Position.TOP);
                        break;
                    case 'auth/operation-not-allowed':
                        this.utilSvc.showToast("message.auth.signUpError", MyToast.Color.DANGER, MyToast.Position.TOP);
                        break;
                    case 'auth/weak-password':
                        this.utilSvc.showToast("message.auth.passwordWeak", MyToast.Color.DANGER, MyToast.Position.TOP);
                        break;
                    default:
                        console.error(error.message);
                        break;
                }
                reject(error);
            }
        });
    }

    /**
     * Creates a document in the specified Firestore collection.
     * @param collectionName The name of the Firestore collection.
     * @param data The data to be added to the document.
     * @returns A promise that resolves to a DocumentReference object.
     */
    public createDocument(collectionName: string, data: any): Promise<DocumentReference> {
        return new Promise((resolve, reject) => {
            if (!this._db)
                reject({
                    msg: "Database is not connected"
                });
            const collectionRef = collection(this._db!, collectionName);
            addDoc(collectionRef, data).then(docRef => resolve(docRef)
            ).catch(err => reject(err));
        });
    }

    /**
     * Creates a document with a specified ID in the specified Firestore collection.
     * @param collectionName The name of the Firestore collection.
     * @param data The data to be added to the document.
     * @param docId The ID of the document.
     * @returns A promise that resolves to a DocumentReference object.
     */
    public createDocumentWithId(
        collectionName: string,
        data: any,
        docId: string
    ): Promise<DocumentReference> {
        return new Promise((resolve, reject) => {
            if (!this._db) {
                reject({
                    msg: 'Database is not connected',
                });
            }
            const docRef = doc(this._db!, collectionName, docId);
            setDoc(docRef, data)
                .then(() => resolve(docRef))
                .catch((err) => reject(err));
        });
    }

    /**
     * Retrieves a document from the specified Firestore collection.
     * @param collectionName The name of the Firestore collection.
     * @param document The ID of the document to be retrieved.
     * @returns A promise that resolves to a FirebaseDocument object.
     */
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
                reject('document does not exists');
            }
        });
    }

    /**
     * Retrieves a document by its reference.
     * @param docRef The reference of the document to be retrieved.
     * @returns A promise that resolves to a FirebaseDocument object.
     */
    public getDocumentByRef(docRef: DocumentReference): Promise<FirebaseDocument> {
        return new Promise(async (resolve, reject) => {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                resolve({ id: docSnap.id, data: docSnap.data() });
            } else {
                reject('document does not exists');
            }
        });
    }

    /**
     * Updates a document in the specified Firestore collection.
     * @param collectionName The name of the Firestore collection.
     * @param document The ID of the document to be updated.
     * @param data The data to be updated in the document.
     * @returns A promise that resolves when the document is updated.
     */
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

    /**
     * Signs out the current user.
     * @param signInAnon Whether to sign in anonymously after signing out (default is false).
     * @returns A promise that resolves when the user is signed out.
     */
    public async signOut(signInAnon: boolean = false): Promise<void> {
        new Promise<void>(async (resolve, reject) => {
            if (this._auth)
                try {
                    await this._auth.signOut();
                    resolve();
                } catch (error) {
                    reject(error);
                }
        });
    }
    /**
     * Subscribes to changes in a specific document in Firestore.
     * @param collectionName The name of the Firestore collection.
     * @param documentId The ID of the document to subscribe to.
     * @param subject The subject to emit the document data.
     * @param mapFunction Optional function to map the document data before emitting.
     * @returns A function to unsubscribe from the subscription or null if database is not connected.
     */
    public subscribeToDocument(collectionName: string, documentId: string, subject: BehaviorSubject<any>, mapFunction: (el: DocumentData) => any = res => res): Unsubscribe | null {
        if (!this._db)
            return null;
        const docRef = doc(this._db, collectionName, documentId);
        return onSnapshot(docRef, (snapshot) => {
            if (snapshot.exists())
                subject.next(mapFunction(snapshot.data() as DocumentData));

            else
                throw new Error('Error: The document does not exist.');
        }, error => { throw new Error(error.message); });
    }

    /**
     * Deletes a document from a Firestore collection.
     * @param collectionName The name of the Firestore collection.
     * @param docId The ID of the document to delete.
     * @returns A promise that resolves when the document is deleted.
     */
    public deleteDocument(collectionName: string, docId: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            if (!this._db)
                reject({
                    msg: "Database is not connected"
                });
            resolve(await deleteDoc(doc(this._db!, collectionName, docId)));
        });
    }

    /**
     * Subscribes to changes in a specific Firestore collection.
     * @param collectionName The name of the Firestore collection.
     * @param subject The subject to emit the collection data.
     * @param mapFunction Function to map each document data before emitting.
     * @returns A function to unsubscribe from the subscription or null if database is not connected.
     */
    public subscribeToCollection(collectionName: string, subject: BehaviorSubject<any[]>, mapFunction: (el: DocumentData) => any): Unsubscribe | null {
        if (!this._db)
            return null;
        return onSnapshot(collection(this._db, collectionName), (snapshot) => {
            subject.next(snapshot.docs.map<any>(doc => mapFunction(doc)));
        }, error => { });
    }

    /**
     * Saves a log item to Firestore.
     * @param itemLog The log item to be saved.
     * @returns A promise that resolves when the log item is saved.
     */
    async fbSaveLog(itemLog: ItemLog): Promise<void> {
        const logRef = `${LOG.COLLECTION}/${LOG.DOCUMENT}`;
        const docRef = doc(this._db, logRef);
        try {
            await updateDoc(docRef, { [LOG.FIELD]: arrayUnion(itemLog) });
            console.log('Log saved successfully');
        } catch (e) {
            const logMap = { logs: [itemLog] };
        }
    }
}
