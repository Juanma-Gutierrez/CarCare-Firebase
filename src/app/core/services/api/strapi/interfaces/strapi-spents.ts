import { PaginatedData } from "src/app/core/interfaces/data"
import { StrapiResponse } from "./strapi-data"

/**
 * Tipo que representa la respuesta de Strapi para elementos de gastos.
 * @param <T> Tipo de elemento de gasto en la respuesta.
 */
export type StrapiProvidersResponse = StrapiResponse<SpentItem>

/**
 * Interfaz que representa un elemento de gasto.
 */
export interface SpentItem {
    id: number,
    attributes: {
        date: Date,
        amount: number,
        observations: string
        vehicle: {
            data: {
                id: number
            }
        },
        provider: {
            data: {
                id: number
            }
        }
    }
}

/**
 * Interfaz que representa un gasto en Strapi.
 */
export interface StrapiSpent {
    date: Date
    amount: number
    observations: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    provider: {
        data: {
            id: number
            attributes: {
                name: string
                category: string
                phone: string
                createdAt: string
                updatedAt: string
                publishedAt: string
            }
        }
    }
    vehicle: {
        data: {
            id: number
            attributes: {
                plate: string
                brand: string
                model: string
                registrationDate: string
                category: string
                available: boolean
                createdAt: string
                updatedAt: string
                publishedAt: string
            }
        }
    }
    id: number
}

/**
 * Tipo que representa un conjunto de datos paginado de gastos en Strapi.
 */
export type PaginatedSpents = PaginatedData<StrapiSpent>;