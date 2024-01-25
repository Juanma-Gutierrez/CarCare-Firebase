import { PaginatedData } from "src/app/core/interfaces/data"
import { StrapiResponse } from "./strapi-data"
import { ProviderCategory } from "src/app/core/interfaces/Provider"

/**
 * Tipo que representa la respuesta de Strapi para proveedores.
 * @param <T> Tipo de elemento de proveedor en la respuesta.
 */
export type StrapiProvidersResponse = StrapiResponse<ProviderItem>

/**
 * Interfaz que representa un elemento de proveedor.
 */
export interface ProviderItem {
    id: number,
    attributes: {
        name: string
        category: string
        phone: string
    }
}

/**
 * Interfaz que representa un proveedor de servicios en Strapi.
 */
export interface StrapiProvider {
    id?: number,
    name: string
    category: ProviderCategory
    phone: string
    users_permissions_user?: number
}

/**
 * Tipo que representa un conjunto de datos paginado de proveedores en Strapi.
 */
export type PaginatedProviders = PaginatedData<StrapiProvider>;