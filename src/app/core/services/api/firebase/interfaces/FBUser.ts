import { FBVehicle } from "./FBVehicle"

export interface FBUser {
    nickname: string
    name: string,
    surname: string,
    email: string,
    password: string,
    uuid?: string,
    vehicles?: FBVehicle[]
}