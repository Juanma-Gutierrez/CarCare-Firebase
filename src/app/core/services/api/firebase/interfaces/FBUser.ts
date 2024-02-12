import { FBVehicle } from "./FBVehicle"

export interface FBUser {
    nickname: string
    name: string,
    surname: string,
    email: string,
    uuid?: string,
    vehicles: FBVehicle[]
}

export interface FBUserCredential {
    email: string,
    password:string,
}
