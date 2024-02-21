import { VehicleCategory } from "src/app/core/interfaces/Vehicle"
import { FBSpent } from "./FBSpent"
import { DocumentData, DocumentReference } from "firebase/firestore"

export interface FBVehicle {
    available: boolean,
    brand: string,
    category: VehicleCategory,
    model: string,
    plate: string,
    registrationDate: Date,
    spents?: FBSpent[]
}

