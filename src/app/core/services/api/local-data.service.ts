import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalDataService {
    private userLocal: any

    constructor() { }

    public getUserLocal(): any {
        return this.userLocal
    }

    public setUserLocal(user: any) {
        this.userLocal = user
    }
}
