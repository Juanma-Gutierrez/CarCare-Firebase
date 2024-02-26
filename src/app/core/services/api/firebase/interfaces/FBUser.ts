import { DocumentReference, Timestamp } from "firebase/firestore"

export interface FBUser {
    email: string,
    name: string,
    nickname: string,
    surname: string,
    userId: string,
    uuid: string,
    vehicles: FBVehiclePreview[],
}

export interface FBVehiclePreview {
    available: boolean,
    brand: string,
    category: string,
    model: string,
    plate: string,
    ref: DocumentReference,
    registrationDate: Timestamp,
    vehicleId: string,
}

export interface FBUserCredential {
    email: string,
    password: string,
}
