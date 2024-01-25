import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { MappingService } from './mapping.service';
import { PaginatedProviders } from './strapi/interfaces/strapi-providers';
import { Provider } from '../../interfaces/Provider';

/**
 * Interfaz que define las operaciones CRUD para los proveedores.
 */
interface CrudProviders {
    getAll(ownerId: number): Observable<PaginatedProviders>;
    addProvider(provider: Provider): Observable<Provider>;
    updateProvider(provider: Provider): Observable<Provider>;
    deleteProvider(provider: Provider): Observable<Provider>;
}

/**
 * Servicio que implementa las operaciones CRUD para los proveedores.
 */
@Injectable({
    providedIn: 'root'
})
export class ProvidersService implements CrudProviders {
    private _providers: BehaviorSubject<PaginatedProviders> = new BehaviorSubject<PaginatedProviders>({ data: [], pagination: { page: 0, pageCount: 0, pageSize: 0, total: 0 } });
    public providers$: Observable<PaginatedProviders> = this._providers.asObservable();

    /**
     * Constructor del servicio ProvidersService.
     * @param dataSvc Servicio de DataService.
     * @param mapping Servicio de MappingService.
     */
    constructor(
        private dataSvc: DataService,
        private mapping: MappingService,
    ) { }

    /**
     * Obtiene todos los proveedores asociados a un propietario.
     * @param userId ID del propietario.
     * @returns Observable que emite la lista paginada de proveedores.
     */
    public getAll(userId: number): Observable<PaginatedProviders> {
        const apiUrl = "api/providers?populate=users_permissions_user&filters[users_permissions_user][id]=" + userId;
        var obs = this.dataSvc.query<any>(apiUrl, {}).pipe(tap(response => {
            this._providers.next(response)
        }))
        return obs;
    }

    /**
     * Agrega un nuevo proveedor.
     * @param provider Objeto que representa el proveedor a agregar.
     * @returns Observable que emite el proveedor agregado.
     */
    addProvider(provider: Provider): Observable<Provider> {
        const endPoint = "api/providers";
        var _provider: any = {
            name: provider.name,
            category: provider.category,
            phone: provider.phone,
            users_permissions_user: provider.users_permissions_user,
        }
        return this.dataSvc.post<Provider>(endPoint, _provider);
    }

    /**
     * Actualiza un proveedor existente.
     * @param provider Objeto que representa el proveedor a actualizar.
     * @returns Observable que emite el proveedor actualizado.
     */
    updateProvider(provider: Provider): Observable<Provider> {
        return this.dataSvc.put<any>(this.mapping.updateProviderUrl(provider.id!), provider).pipe(map(this.mapping.mapProvider.bind(this.mapping)));
    }

    /**
     * Elimina un proveedor existente.
     * @param provider Objeto que representa el proveedor a eliminar.
     * @returns Observable que emite el proveedor eliminado.
     */
    deleteProvider(provider: Provider): Observable<Provider> {
        return this.dataSvc.delete<any>(this.mapping.deleteProviderUrl(provider.id!)).pipe(map(this.mapping.mapProvider.bind(this.mapping)));
    }
}
