import { FBVehicle, FBVehiclePreview } from "./FBVehicle"

export interface FBUser {
    nickname: string,
    name: string,
    surname: string,
    email: string,
    uuid?: string,
    vehicles: FBVehiclePreview[]
}

export interface FBUserCredential {
    email: string,
    password: string,
}
