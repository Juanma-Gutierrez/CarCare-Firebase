import { VehicleCategory } from "src/app/core/interfaces/Vehicle"

export interface FBVehicles {
    uuid?: string
    nickname: string
    vehicles: [
        uuid: string,
        plate: string,
        brand: string,
        model: string,
        registrationDate: Date,
        category: VehicleCategory,
        spents?: []
    ]
}
