import { Injectable } from '@angular/core';
import { Provider } from '../../interfaces/Provider';
import { Spent } from '../../interfaces/Spent';
import { Vehicle } from '../../interfaces/Vehicle';
import { ItemLog, LogType, OperationLog } from '../../interfaces/ItemLog';
import { User } from '../../interfaces/User';
import { LocalDataService } from './local-data.service';

/**
 * Abstract class representing a mapping service for various data entities.
 * Provides methods for querying URLs, mapping data, and handling CRUD operations.
 */
@Injectable({
    providedIn: 'root'
})
export abstract class MappingService {
    /**
     * Retrieves the URL for querying vehicles.
     * @returns {string} The query vehicles URL.
     */
    public abstract queryVehiclesUrl(): string;

    /**
     * Retrieves the URL for getting a specific vehicle by ID.
     * @param {number} id - The ID of the vehicle.
     * @returns {string} The get vehicle URL.
     */
    public abstract getVehicleUrl(id: number): string;

    /**
     * Retrieves the URL for updating a specific vehicle by ID.
     * @param {number} id - The ID of the vehicle.
     * @returns {string} The update vehicle URL.
     */
    public abstract updateVehicleUrl(id: number): string;

    /**
     * Retrieves the URL for deleting a specific vehicle by ID.
     * @param {number} id - The ID of the vehicle.
     * @returns {string} The delete vehicle URL.
     */
    public abstract deleteVehicleUrl(id: number): string;

    /**
     * Maps raw data to a Vehicle object.
     * @param {any} data - The raw data to map.
     * @returns {Vehicle} The mapped Vehicle object.
     */
    public abstract mapVehicle(data: any): Vehicle;

    /**
     * Maps raw data to an array of Vehicle objects.
     * @param {any} data - The raw data to map.
     * @returns {Vehicle[]} The mapped array of Vehicle objects.
     */
    public abstract mapVehicles(data: any): Vehicle[]

    /**
     * Retrieves the URL for updating a specific provider by ID.
     * @param {number} id - The ID of the provider.
     * @returns {string} The update provider URL.
     */
    public abstract updateProviderUrl(id: number): string;

    /**
     * Retrieves the URL for deleting a specific provider by ID.
     * @param {number} id - The ID of the provider.
     * @returns {string} The delete provider URL.
     */
    public abstract deleteProviderUrl(id: number): string;

    /**
     * Maps raw data to a Provider object.
     * @param {any} data - The raw data to map.
     * @returns {Provider} The mapped Provider object.
     */
    public abstract mapProvider(data: any): Provider;

    /**
     * Retrieves the URL for updating a specific spent entry by ID.
     * @param {number} id - The ID of the spent entry.
     * @returns {string} The update spent URL.
     */
    public abstract updateSpentUrl(id: number): string;

    /**
     * Retrieves the URL for deleting a specific spent entry by ID.
     * @param {number} id - The ID of the spent entry.
     * @returns {string} The delete spent URL.
     */
    public abstract deleteSpentUrl(id: number): string;

    /**
     * Maps raw data to a Spent object.
     * @param {any} data - The raw data to map.
     * @returns {Spent} The mapped Spent object.
     */
    public abstract mapSpent(data: any): Spent;
}

