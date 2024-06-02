import { Spent } from "./Spent";

/**
 * Represents a vehicle.
 * @param available Indicates whether the vehicle is available.
 * @param brand The brand of the vehicle.
 * @param created The creation date of the vehicle.
 * @param category The category of the vehicle.
 * @param model The model of the vehicle.
 * @param plate The plate number of the vehicle.
 * @param registrationDate The registration date of the vehicle.
 * @param spents Optional array of Spent objects representing transactions related to the vehicle.
 * @param userId The ID of the user who owns the vehicle.
 * @param vehicleId The ID of the vehicle.
 */

export interface Vehicle {
    available: boolean,
    brand: string,
    category: VehicleCategory,
    created: string,
    imageURL: string,
    model: string,
    plate: string,
    registrationDate: string,
    spents?: Spent[],
    userId: string,
    vehicleId: string,
}

/**
 * Represents the category of a vehicle.
 * Possible values:
 * - car
 * - motorcycle
 * - truck
 * - van
 */

export enum VehicleCategory {
    car = 'car',
    motorcycle = 'motorcycle',
    truck = 'truck',
    van = 'van'
}

