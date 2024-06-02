import { DocumentReference } from "firebase/firestore";

/**
 * Represents a user.
 * @param created The creation date of the user.
 * @param email The email address of the user.
 * @param name The name of the user.
 * @param nickname The nickname of the user.
 * @param role The role of the user.
 * @param surname The surname of the user.
 * @param userId The ID of the user.
 * @param vehicles An array of VehiclePreview objects representing the vehicles associated with the user.
 */
export interface User {
    created: string,
    email: string,
    name: string,
    nickname: string,
    role: string,
    surname: string,
    userId: string,
    vehicles: VehiclePreview[],
}

/**
 * Represents a preview of a vehicle.
 * @param available Indicates whether the vehicle is available.
 * @param brand The brand of the vehicle.
 * @param created The creation date of the vehicle preview.
 * @param category The category of the vehicle.
 * @param model The model of the vehicle.
 * @param plate The plate number of the vehicle.
 * @param ref The reference to the document associated with the vehicle.
 * @param registrationDate The registration date of the vehicle.
 * @param vehicleId The ID of the vehicle.
 */

export interface VehiclePreview {
    available: boolean,
    brand: string,
    category: string,
    created: string,
    imageURL: string,
    model: string,
    plate: string,
    ref: DocumentReference,
    registrationDate: string,
    vehicleId: string,
}

/**
 * Represents user credentials.
 * @param email The email address of the user.
 * @param password The password of the user.
 */

export interface UserCredential {
    email: string,
    password: string,
}
