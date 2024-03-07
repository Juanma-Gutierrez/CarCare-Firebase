/**
 * Represents a provider.
 * @param category The category of the provider.
 * @param created The creation date of the provider.
 * @param name The name of the provider.
 * @param phone The phone number of the provider.
 * @param providerId The ID of the provider.
 */
export interface Provider {
    category: ProviderCategory,
    created: string,
    name: string,
    phone: string,
    providerId: string,
}

/**
 * Represents the category of a provider.
 * Possible values:
 * - ITV
 * - gasStation
 * - insuranceCompany
 * - other
 * - towTruck
 * - workshop
 */
export enum ProviderCategory {
    ITV = "ITV",
    gasStation = 'gasStation',
    insuranceCompany = 'insuranceCompany',
    other = "other",
    towTruck = 'towTruck',
    workshop = 'workshop',
}