import { Injectable } from '@angular/core';
import { PaginatedData } from '../../interfaces/data';
import { Provider } from '../../interfaces/Provider';
import { Spent } from '../../interfaces/Spent';
import { Vehicle } from '../../interfaces/Vehicle';

/**
 * Clase abstracta `MappingService` que define la interfaz para un servicio de
 * mapeo de datos. Proporciona métodos abstractos para definir la estructura de
 * URL y realizar el mapeo de datos para varios recursos como vehículos, proveedores
 * y gastos.
 */
@Injectable({
    providedIn: 'root'
})
export abstract class MappingService {

    /**
     * Método abstracto para obtener la URL de consulta de vehículos.
     * @returns URL de consulta de vehículos.
     */
    public abstract queryVehiclesUrl(): string;

    /**
     * Método abstracto para obtener la URL de un vehículo específico por ID.
     * @param id ID del vehículo.
     * @returns URL del vehículo específico.
     */
    public abstract getVehicleUrl(id: number): string;

    /**
     * Método abstracto para obtener la URL de actualización de un vehículo específico por ID.
     * @param id ID del vehículo.
     * @returns URL de actualización del vehículo específico.
     */
    public abstract updateVehicleUrl(id: number): string;

    /**
     * Método abstracto para obtener la URL de eliminación de un vehículo específico por ID.
     * @param id ID del vehículo.
     * @returns URL de eliminación del vehículo específico.
     */
    public abstract deleteVehicleUrl(id: number): string;

    /**
     * Método abstracto para mapear los datos de un vehículo.
     * @param data Datos del vehículo.
     * @returns Objeto que representa el vehículo mapeado.
     */
    public abstract mapVehicle(data: any): Vehicle;

    /**
     * Método abstracto para mapear los datos paginados de vehículos.
     * @param data Datos paginados de vehículos.
     * @returns Datos paginados de vehículos mapeados.
     */
    public abstract mapVehicles(data: PaginatedData<any>): PaginatedData<Vehicle>

    /**
     * Método abstracto para obtener la URL de actualización de un proveedor específico por ID.
     * @param id ID del proveedor.
     * @returns URL de actualización del proveedor específico.
     */
    public abstract updateProviderUrl(id: number): string;

    /**
     * Método abstracto para obtener la URL de eliminación de un proveedor específico por ID.
     * @param id ID del proveedor.
     * @returns URL de eliminación del proveedor específico.
     */
    public abstract deleteProviderUrl(id: number): string;

    /**
     * Método abstracto para mapear los datos de un proveedor.
     * @param data Datos del proveedor.
     * @returns Objeto que representa el proveedor mapeado.
     */
    public abstract mapProvider(data: any): Provider;

    /**
     * Método abstracto para obtener la URL de actualización de un gasto específico por ID.
     * @param id ID del gasto.
     * @returns URL de actualización del gasto específico.
     */
    public abstract updateSpentUrl(id: number): string;

    /**
     * Método abstracto para obtener la URL de eliminación de un gasto específico por ID.
     * @param id ID del gasto.
     * @returns URL de eliminación del gasto específico.
     */
    public abstract deleteSpentUrl(id: number): string;

    /**
     * Método abstracto para mapear los datos de un gasto.
     * @param data Datos del gasto.
     * @returns Objeto que representa el gasto mapeado.
     */
    public abstract mapSpent(data: any): Spent;
}
