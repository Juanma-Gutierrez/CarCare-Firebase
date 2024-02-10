import { Injectable } from '@angular/core';
import { FBUser } from './firebase/interfaces/FBUser';
import { FBVehicle } from './firebase/interfaces/FBVehicle';

@Injectable({
    providedIn: 'root'
})
export class LocalDataService {
    public user?: FBUser
    public vehicles?: FBVehicle

    constructor() { }
}
