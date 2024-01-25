import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PaginatedData } from 'src/app/core/interfaces/data';
import { StrapiArrayResponse, StrapiResponse } from './interfaces/strapi-data';

/**
 * Servicio que extiende DataService y utiliza la API de Strapi para operaciones de datos.
 */
@Injectable({
    providedIn: 'root'
})
export class StrapiDataService extends DataService {

    /**
     * Constructor del servicio StrapiDataService.
     * @param api Servicio ApiService utilizado para realizar peticiones a la API de Strapi.
     */
    constructor(
        protected api: ApiService
    ) {
        super();
    }

    /**
     * Realiza una solicitud de consulta (query) al servidor Strapi para obtener datos paginados.
     * @param resource Ruta del recurso en el servidor Strapi.
     * @param params Parámetros de la consulta.
     * @return Observable que emite un objeto `PaginatedData` con los datos obtenidos y la información de paginación.
     */
    public override query<T>(resource: string, params: any): Observable<PaginatedData<T>> {
        var res = this.api.get(`/${resource}`, params).pipe(map((response: StrapiArrayResponse<T>) => {
            return {
                data: response.data.map(data => { return { ...(data.attributes), id: data.id }; }),
                pagination: response.meta.pagination!
            };
        }));
        return res;
    }

    /**
     * Realiza una solicitud para obtener un único recurso del servidor Strapi.
     * @param resource Ruta del recurso en el servidor Strapi.
     * @return Observable que emite el objeto correspondiente al recurso obtenido.
     */
    public get<T>(resource: string): Observable<T> {
        return this.api.get(`/${resource}`).pipe(map((response: StrapiResponse<T>) => {
            return { id: response.data.id, ...(response.data.attributes) };
        }));
    }

    /**
     * Realiza una solicitud para crear un nuevo recurso en el servidor Strapi.
     * @param resource Ruta del recurso en el servidor Strapi.
     * @param data Datos del nuevo recurso.
     * @return Observable que emite el objeto correspondiente al recurso creado.
     */
    public override post<T>(resource: string, data: any): Observable<T> {
        return this.api.post(`/${resource}`, { data: data } as Object).pipe(map((response: StrapiResponse<T>) => {
            return { id: response.data.id, ...response.data.attributes };
        }));
    }

    /**
     * Realiza una solicitud para actualizar un recurso existente en el servidor Strapi.
     * @param resource Ruta del recurso en el servidor Strapi.
     * @param data Datos actualizados del recurso.
     * @return Observable que emite el objeto correspondiente al recurso actualizado.
     */
    public override put<T>(resource: string, data: any): Observable<T> {
        return this.api.put(`/${resource}`, { data: data }).pipe(map((response: StrapiResponse<T>) => {
            return { id: response.data.id, ...response.data.attributes };
        }));
    }

    /**
     * Realiza una solicitud para eliminar un recurso existente en el servidor Strapi.
     * @param resource Ruta del recurso en el servidor Strapi.
     * @return Observable que emite el objeto correspondiente al recurso eliminado.
     */
    public override delete<T>(resource: string): Observable<T> {
        return this.api.delete(`/${resource}`).pipe(map((response: StrapiResponse<T>) => {
            return { id: response.data.id, ...response.data.attributes };
        }));
    }
}



