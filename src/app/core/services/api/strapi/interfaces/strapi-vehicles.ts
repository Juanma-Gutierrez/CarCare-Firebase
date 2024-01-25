/**
 * Interfaz que representa una respuesta de Strapi.
 * @param <T> Tipo de dato asociado a la respuesta.
 */
export interface StrapiResponse<T> {
    data: T
}

/**
 * Tipo que representa la respuesta de Strapi para elementos de vehículos.
 * @param <T> Tipo de elemento de vehículo en la respuesta.
 */
export type StrapiVehiclesResponse = StrapiResponse<VehicleItem>

/**
 * Interfaz que representa un elemento de vehículo.
 */
export interface VehicleItem {
    id: number
    attributes: VehicleItemAttributes
}

/**
 * Interfaz que representa los atributos de un elemento de vehículo.
 */
export interface VehicleItemAttributes {
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
