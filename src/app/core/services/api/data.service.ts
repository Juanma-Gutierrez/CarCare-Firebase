import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedData } from '../../interfaces/data';

/**
 * Clase abstracta `DataService` que define la interfaz para un servicio de
 * manipulación de datos. Proporciona métodos abstractos para realizar operaciones
 * CRUD (Crear, Leer, Actualizar, Eliminar) en recursos específicos.
 */
@Injectable({
    providedIn: 'root'
})
export abstract class DataService {

    /**
     * Método abstracto para realizar una consulta paginada en un recurso.
     * @param resource Nombre del recurso.
     * @param params Parámetros de la consulta.
     * @returns Observable que emite datos paginados del recurso.
     */
    public abstract query<T>(resource: string, params: any): Observable<PaginatedData<T>>;

    /**
     * Método abstracto para obtener un elemento específico de un recurso.
     * @param resource Nombre del recurso.
     * @returns Observable que emite el elemento del recurso.
     */
    public abstract get<T>(resource: string): Observable<T>;

    /**
     * Método abstracto para crear un nuevo elemento en un recurso.
     * @param resource Nombre del recurso.
     * @param data Datos del nuevo elemento.
     * @returns Observable que emite el resultado de la operación de creación.
     */
    public abstract post<T>(resource: string, data: any): Observable<T>;

    /**
     * Método abstracto para actualizar un elemento existente en un recurso.
     * @param resource Nombre del recurso.
     * @param data Datos actualizados del elemento.
     * @returns Observable que emite el resultado de la operación de actualización.
     */
    public abstract put<T>(resource: string, data: any): Observable<T>;

    /**
     * Método abstracto para eliminar un elemento específico de un recurso.
     * @param resource Nombre del recurso.
     * @returns Observable que emite el resultado de la operación de eliminación.
     */
    public abstract delete<T>(resource: string): Observable<T>;
}
