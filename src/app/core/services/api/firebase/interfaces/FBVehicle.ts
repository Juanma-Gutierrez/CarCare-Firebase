import { VehicleCategory } from "src/app/core/interfaces/Vehicle"
import { FBSpent } from "./FBSpent"

export interface FBVehicle {
    available: boolean,
    brand: string,
    category: VehicleCategory,
    model: string,
    plate: string,
    registrationDate: Date,
    spents?: FBSpent[]
}


/*
export enum VehicleCategory {
    car = 'car',
    motorcycle = 'motorcycle',
    van = 'van',
    truck = 'truck'
}
*/