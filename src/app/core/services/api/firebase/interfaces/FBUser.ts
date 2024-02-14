import { DocumentReference, Timestamp } from "firebase/firestore"

export interface FBUser {
    email: string,
    id?: string,
    name: string,
    nickname: string,
    surname: string,
    uuid?:string,
    vehicles: FBVehiclePreview[]
}

export interface FBVehiclePreview {
    available: boolean,
    brand: string,
    category:string,
    id:string,
    model: string,
    plate: string,
    ref: DocumentReference,
    registrationDate:Timestamp,
}

export interface FBUserCredential {
    email: string,
    password: string,
}
