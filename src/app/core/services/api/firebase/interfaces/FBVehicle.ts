import { VehicleCategory } from "src/app/core/interfaces/Vehicle"
import { FBSpent } from "./FBSpent"

export interface FBVehicle {
    brand: string,
    model: string,
    plate: string,
    registrationDate: Date,
    available: boolean,
    category: VehicleCategory,
    spents?: FBSpent[]
}

export interface FBVehiclePreview {
    brand: string,
    model: string,
    plate: string,
    available: boolean,

}