/**
 * Interfaz que representa un proveedor.
 */
export interface Provider {
    id?: number,
    name: string,
    category: ProviderCategory,
    phone: string,
    users_permissions_user?: number,
}

/**
 * Enumeración que representa las categorías de proveedores.
 */
export enum ProviderCategory {
    workshop = 'workshop',
    insuranceCompany = 'insuranceCompany',
    gasStation = 'gasStation',
    towTruck = 'towTruck',
    other = "other",
    ITV="ITV"
}
