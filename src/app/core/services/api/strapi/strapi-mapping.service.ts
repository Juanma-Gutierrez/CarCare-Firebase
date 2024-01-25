import { Injectable } from '@angular/core';
import { MappingService } from '../mapping.service';
import { PaginatedData } from 'src/app/core/interfaces/data';
import { Provider } from 'src/app/core/interfaces/Provider';
import { Spent } from 'src/app/core/interfaces/Spent';
import { StrapiOwner, User } from './interfaces/strapi-users';
import { Vehicle } from 'src/app/core/interfaces/Vehicle';

/**
 * Servicio que proporciona funciones de mapeo específicas para la integración con Strapi.
 */
@Injectable({
    providedIn: 'root'
})

export class StrapiMappingService extends MappingService {

    constructor() {
        super();
    }

    /**
     * Obtiene la URL para consultar la lista de vehículos ordenada por marca.
     * @returns URL de la consulta.
     */
    public override queryVehiclesUrl(): string {
        return 'vehicles?sort=brand';
    }

    /**
     * Obtiene la URL para obtener detalles de un vehículo específico.
     * @param id Identificador del vehículo.
     * @returns URL de la consulta.
     */
    public override getVehicleUrl(id: number): string {
        return `api/vehicles/${id}`;
    }

    /**
     * Obtiene la URL para actualizar los detalles de un vehículo específico.
     * @param id Identificador del vehículo.
     * @returns URL de la actualización.
     */
    public override updateVehicleUrl(id: number): string {
        return `api/vehicles/${id}`;
    }

    /**
     * Obtiene la URL para eliminar un vehículo específico.
     * @param id Identificador del vehículo.
     * @returns URL de la eliminación.
     */
    public override deleteVehicleUrl(id: number): string {
        return `api/vehicles/${id}`;
    }

    /**
     * Realiza el mapeo de un objeto que representa un vehículo desde Strapi a la interfaz común.
     * @param vehicle Objeto que representa un vehículo en Strapi.
     * @returns Objeto que representa un vehículo en la interfaz común.
     */
    public override mapVehicle(vehicle: any): Vehicle {
        return {
            id: vehicle.id,
            plate: vehicle.plate,
            brand: vehicle.brand,
            model: vehicle.model,
            registrationDate: vehicle.registrationDate,
            category: vehicle.category,
            available: vehicle.available,
            owner: vehicle.owner,
            spents: vehicle.spents
        };
    }

    /**
     * Realiza el mapeo de la lista de vehículos desde Strapi a la interfaz común.
     * @param data Datos paginados de vehículos en Strapi.
     * @returns Datos paginados de vehículos en la interfaz común.
     */
    public override mapVehicles(data: PaginatedData<any>): PaginatedData<Vehicle> {
        const strapi_data: PaginatedData<Vehicle> = { ...data };
        return {
            data: strapi_data.data.map(vehicle => {
                return {
                    id: vehicle.id,
                    plate: vehicle.plate,
                    brand: vehicle.brand,
                    model: vehicle.model,
                    registrationDate: vehicle.registrationDate,
                    category: vehicle.category,
                    available: vehicle.available,
                    owner: vehicle.owner,
                    spents: vehicle.spents
                };
            }),
            pagination: data.pagination
        };
    }

    /**
     * Realiza el mapeo de un objeto que representa un usuario desde Strapi a la interfaz común.
     * @param data Objeto que representa un usuario en Strapi.
     * @returns Objeto que representa un usuario en la interfaz común.
     */
    public mapUser(data: StrapiOwner): User {
        return {
            id: data.id || 0,
            username: "",
            email: "",
            provider: "",
            confirmed: false,
            blocked: false,
            createdAt: "",
            updatedAt: "",
        };
    }

    /**
     * Obtiene la URL para actualizar los detalles de un proveedor específico.
     * @param id Identificador del proveedor.
     * @returns URL de la actualización.
     */
    public override updateProviderUrl(id: number): string {
        return `api/providers/${id}`;
    }

    /**
     * Obtiene la URL para eliminar un proveedor específico.
     * @param id Identificador del proveedor.
     * @returns URL de la eliminación.
     */
    public override deleteProviderUrl(id: number): string {
        return `api/providers/${id}`;
    }

    /**
     * Realiza el mapeo de un objeto que representa un proveedor desde Strapi a la interfaz común.
     * @param data Objeto que representa un proveedor en Strapi.
     * @returns Objeto que representa un proveedor en la interfaz común.
     */
    public override mapProvider(data: any): Provider {
        return data;
    }

    /**
     * Obtiene la URL para actualizar los detalles de un gasto específico.
     * @param id Identificador del gasto.
     * @returns URL de la actualización.
     */
    public override updateSpentUrl(id: number): string {
        return `api/spents/${id}`;
    }

    /**
     * Obtiene la URL para eliminar un gasto específico.
     * @param id Identificador del gasto.
     * @returns URL de la eliminación.
     */
    public override deleteSpentUrl(id: number): string {
        return `api/spents/${id}`;
    }

    /**
     * Realiza el mapeo de un objeto que representa un gasto desde Strapi a la interfaz común.
     * @param data Objeto que representa un gasto en Strapi.
     * @returns Objeto que representa un gasto en la interfaz común.
     */
    public override mapSpent(data: Spent): Spent {
        return data;
    }
}

