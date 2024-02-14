import { DocumentReference } from "firebase/firestore"

export interface FBUser {
    nickname: string,
    name: string,
    surname: string,
    email: string,
    id?: string,
    vehicles: FBVehiclePreview[]
}

export interface FBVehiclePreview {
    available: boolean,
    brand: string,
    model: string,
    plate: string,
    ref: DocumentReference,
    uuid: string
}

export interface FBUserCredential {
    email: string,
    password: string,
}
