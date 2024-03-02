import { Spent } from "./Spent"

export interface Vehicle {
    available: boolean,
    brand: string,
    category: VehicleCategory,
    model: string,
    plate: string,
    registrationDate: Date,
    spents?: Spent[],
    userId: string,
    vehicleId: string,
}

export enum VehicleCategory {
    car = 'car',
    motorcycle = 'motorcycle',
    truck = 'truck',
    van = 'van'
}

