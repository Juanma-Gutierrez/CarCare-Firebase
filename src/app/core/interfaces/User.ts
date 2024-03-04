import { DocumentReference, Timestamp } from "firebase/firestore"

export interface User {
    created: Timestamp,
    email: string,
    name: string,
    nickname: string,
    role: string,
    surname: string,
    userId: string,
    uuid: string,
    vehicles: VehiclePreview[],
}

export interface VehiclePreview {
    available: boolean,
    brand: string,
    category: string,
    model: string,
    plate: string,
    ref: DocumentReference,
    registrationDate: Date,
    vehicleId: string,
}

export interface UserCredential {
    email: string,
    password: string,
}
