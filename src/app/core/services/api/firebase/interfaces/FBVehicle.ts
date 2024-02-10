import { VehicleCategory } from "src/app/core/interfaces/Vehicle"
import { FBSpent } from "./FBSpent"

export interface FBVehicle {
    plate: string,
    brand: string,
    model: string,
    registrationDate: Date,
    category: VehicleCategory,
    spents?: FBSpent[]
}
