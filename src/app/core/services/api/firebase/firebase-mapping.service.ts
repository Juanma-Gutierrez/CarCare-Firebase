import { Injectable } from "@angular/core";
import { Provider } from "../../../interfaces/Provider";
import { Spent } from "../../../interfaces/Spent";
import { User, VehiclePreview } from "../../../interfaces/User";
import { Vehicle } from "../../../interfaces/Vehicle";
import { USER } from "../../const.service";
import { MappingService } from "../mapping.service";
import { FirebaseDocument } from "./firebase.service";
import { convertDateToLongIsoFormatDate } from "../../utils.service";

/**
 * Injectable service for mapping data with Firebase.
 */

/**
 * Injectable service for mapping data with Firebase.
 */

@Injectable({
    providedIn: 'root'
})
export class FirebaseMappingService extends MappingService {

    /**
     * Constructs a new instance of the FirebaseMappingService.
     */
    constructor() {
        super();
    }

    /**
     * Overrides the queryVehiclesUrl method to provide the URL for querying vehicles.
     * @return The URL for querying vehicles.
     * @throws Error if the method is not implemented.
     */
    public override queryVehiclesUrl(): string {
        throw new Error("Method not implemented.");
    }

    /**
     * Overrides the getVehicleUrl method to provide the URL for retrieving a specific vehicle.
     * @param id The ID of the vehicle.
     * @return The URL for retrieving the specified vehicle.
     * @throws Error if the method is not implemented.
     */
    public override getVehicleUrl(id: number): string {
        throw new Error("Method not implemented.");
    }

    /**
     * Overrides the updateVehicleUrl method to provide the URL for updating a specific vehicle.
     * @param id The ID of the vehicle.
     * @return The URL for updating the specified vehicle.
     * @throws Error if the method is not implemented.
     */
    public override updateVehicleUrl(id: number): string {
        throw new Error("Method not implemented.");
    }

    /**
     * Overrides the deleteVehicleUrl method to provide the URL for deleting a specific vehicle.
     * @param id The ID of the vehicle.
     * @return The URL for deleting the specified vehicle.
     * @throws Error if the method is not implemented.
     */
    public override deleteVehicleUrl(id: number): string {
        throw new Error("Method not implemented.");
    }

    /**
     * Overrides the mapVehicles method to map vehicle data.
     * @param data The data to be mapped.
     * @return An array of Vehicle objects representing the mapped data.
     * @throws Error if the method is not implemented.
     */
    public override mapVehicles(data: any): Vehicle[] {
        throw new Error("Method not implemented.");
    }

    /**
     * Overrides the updateProviderUrl method to provide the URL for updating a specific provider.
     * @param id The ID of the provider.
     * @return The URL for updating the specified provider.
     * @throws Error if the method is not implemented.
     */
    public override updateProviderUrl(id: number): string {
        throw new Error("Method not implemented.");
    }

    /**
     * Overrides the deleteProviderUrl method to provide the URL for deleting a specific provider.
     * @param id The ID of the provider.
     * @return The URL for deleting the specified provider.
     * @throws Error if the method is not implemented.
     */
    public override deleteProviderUrl(id: number): string {
        throw new Error("Method not implemented.");
    }

    /**
     * Overrides the updateSpentUrl method to provide the URL for updating a specific spent transaction.
     * @param id The ID of the spent transaction.
     * @return The URL for updating the specified spent transaction.
     * @throws Error if the method is not implemented.
     */
    public override updateSpentUrl(id: number): string {
        throw new Error("Method not implemented.");
    }

    /**
     * Overrides the deleteSpentUrl method to provide the URL for deleting a specific spent transaction.
     * @param id The ID of the spent transaction.
     * @return The URL for deleting the specified spent transaction.
     * @throws Error if the method is not implemented.
     */
    public override deleteSpentUrl(id: number): string {
        throw new Error("Method not implemented.");
    }

    /**
     * Maps user data to a User object.
     * @param _user The user data to be mapped.
     * @param role The role of the user. Default is USER.
     * @param userId The ID of the user. Default is taken from _user.credentials.
     * @return A User object with the mapped data.
     */
    public mapUser(_user: any, role: string = USER, userId: string = _user.credentials): User {
        var user: User = {
            created: convertDateToLongIsoFormatDate(_user.created),
            email: _user.email,
            name: _user.name,
            nickname: _user.username,
            role: role,
            surname: _user.surname,
            userId: userId,
            vehicles: [],
        };
        return user;
    }

    /**
     * Converts Firebase document data to a User object.
     * @param data The Firebase document data to be converted.
     * @return A User object representing the converted data.
     */
    public convertToUser(data: FirebaseDocument): User {
        return {
            created: convertDateToLongIsoFormatDate(data.data['created']),
            email: data.data['email'],
            userId: data.id,
            name: data.data['name'],
            nickname: data.data['nickname'],
            role: data.data['user'],
            surname: data.data['surname'],
            vehicles: data.data['vehicles'],
        }
    }

    /**
     * Maps vehicle data to a Vehicle object.
     * @param data The vehicle data to be mapped.
     * @param vehicleId The ID of the vehicle. Default is taken from data['vehicleId'].
     * @param userId The ID of the user associated with the vehicle. Default is taken from data['userId'].
     * @param spents An array of spent transactions associated with the vehicle. Default is taken from data['spents'].
     * @return A Vehicle object with the mapped data.
     */
    public mapVehicle(data: any, vehicleId: string = data['vehicleId'], userId: string = data['userId'], spents: [] = data['spents']): Vehicle {
        let vehicle = {
            available: data.available,
            brand: data.brand,
            created: convertDateToLongIsoFormatDate(data.created),
            category: data.category,
            model: data.model,
            plate: data.plate,
            registrationDate: convertDateToLongIsoFormatDate(data.registrationDate),
            spents: spents,
            vehicleId: vehicleId,
            userId: userId,
        }
        return vehicle;
    }

    /**
     * Maps provider data to a Provider object.
     * @param data The provider data to be mapped.
     * @return A Provider object with the mapped data.
     */
    public mapProvider(data: any): Provider {
        return {
            providerId: data.providerId,
            created: convertDateToLongIsoFormatDate(data.created),
            category: data.category,
            name: data.name,
            phone: data.phone,
        }
    }

    /**
     * Maps spent transaction data to a Spent object.
     * @param data The spent transaction data to be mapped.
     * @return A Spent object with the mapped data.
     */
    public mapSpent(data: any): Spent {
        return {
            amount: data.amount,
            created: convertDateToLongIsoFormatDate(data.created),
            date: convertDateToLongIsoFormatDate(data.date),
            observations: data.observations,
            providerId: data.providerId,
            providerName: data.providerName,
            spentId: data.spentId,
        }
    }

    /**
     * Maps a user with associated vehicles to a User object.
     * @param user The user data.
     * @param vehicles An array of VehiclePreview objects representing the user's vehicles.
     * @return A User object with the mapped data.
     */
    public mapUserWithVehicles(user: User, vehicles: VehiclePreview[]): User {
        var data = {
            created: convertDateToLongIsoFormatDate(user.created),
            email: user.email,
            userId: user.userId,
            name: user.name,
            nickname: user.nickname,
            role: user.role,
            surname: user.surname,
            vehicles: vehicles,
        }
        return data
    }

    /**
     * Maps a vehicle with updated spent transactions to a Vehicle object.
     * @param vehicle The vehicle data.
     * @param spentsUpdated An array of updated Spent objects representing the vehicle's spent transactions.
     * @return A Vehicle object with the mapped data.
     */
    public mapVehicleWithSpents(vehicle: Vehicle, spentsUpdated: Spent[]): Vehicle {
        return {
            available: vehicle.available,
            brand: vehicle.brand,
            created: convertDateToLongIsoFormatDate(vehicle.created),
            category: vehicle.category,
            model: vehicle.model,
            plate: vehicle.plate,
            registrationDate: convertDateToLongIsoFormatDate(vehicle.registrationDate),
            spents: spentsUpdated,
            userId: vehicle.userId,
            vehicleId: vehicle.vehicleId,
        }
    }

    /**
     * Maps a spent transaction with its associated provider information to a Spent object.
     * @param s The spent transaction data.
     * @param provider The provider data associated with the spent transaction.
     * @param info Additional information.
     * @return A Spent object with the mapped data.
     */
    public mapSpentWithProvider(spent: Spent, provider: Provider, info: any): Spent {
        return {
            amount: spent.amount,
            created: convertDateToLongIsoFormatDate(spent.created),
            date: convertDateToLongIsoFormatDate(spent.date),
            observations: spent.observations,
            providerId: spent.providerId,
            providerName: info.data.name,
            spentId: spent.spentId,
        }
    }

    /**
     * Prepares provider data for updating.
     * @param providersList An array of Provider objects representing the providers to update.
     * @return An object containing the provider data prepared for updating.
     */
    public providerToUpdate(providersList: Provider[]) {
        return {
            "providers": providersList
        }
    }
}