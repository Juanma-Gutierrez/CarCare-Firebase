import { PaginatedData } from "./data";

/**
 * Interfaz que representa un vehículo.
 */
export interface Vehicle {
    id: number,
    plate: string,
    brand: string,
    model: string,
    registrationDate: Date,
    category: VehicleCategory,
    available: boolean,
    owner: string,
    spents?: []
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

/**
 * Tipo que representa un conjunto de datos paginado de vehículos.
 */
export type PaginatedVehicles = PaginatedData<Vehicle>;


