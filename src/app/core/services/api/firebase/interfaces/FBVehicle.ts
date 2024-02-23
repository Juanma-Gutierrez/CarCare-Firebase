import { VehicleCategory } from "src/app/core/interfaces/Vehicle"
import { FBSpent } from "./FBSpent"
import { Timestamp } from "firebase/firestore"

export interface FBVehicle {
    available: boolean,
    brand: string,
    category: VehicleCategory,
    model: string,
    plate: string,
    registrationDate: Timestamp,
    spents?: FBSpent[]
}

