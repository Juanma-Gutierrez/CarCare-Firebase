import { DocumentReference } from "firebase/firestore"

export interface User {
    created: string,
    email: string,
    name: string,
    nickname: string,
    role: string,
    surname: string,
    userId: string,
    vehicles: VehiclePreview[],
}

export interface VehiclePreview {
    available: boolean,
    brand: string,
    created: string,
    category: string,
    model: string,
    plate: string,
    ref: DocumentReference,
    registrationDate: string,
    vehicleId: string,
}

export interface UserCredential {
    email: string,
    password: string,
}
