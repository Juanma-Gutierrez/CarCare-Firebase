import { Inject, Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app'

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    private _app!: FirebaseApp

    constructor(
        @Inject('firebase-config') config: any
    ) {
        this._app = initializeApp(config)
    }

}
