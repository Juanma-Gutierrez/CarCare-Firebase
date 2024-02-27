import { Spent } from "./Spent"
import { Timestamp } from "firebase/firestore"

export interface Vehicle {
    available: boolean,
    brand: string,
    category: VehicleCategory,
    model: string,
    plate: string,
    registrationDate: Timestamp,
    spents?: Spent[],
    vehicleId: string,
    userId: string,
}

/**
 * Enumeración que representa las categorías de vehículos.
 */
export enum VehicleCategory {
    car = 'car',
    motorcycle = 'motorcycle',
    van = 'van',
    truck = 'truck'
}

