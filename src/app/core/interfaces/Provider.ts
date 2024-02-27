export interface Provider {
    providerId: string,
    category: ProviderCategory,
    name: string,
    phone: string,
}

export enum ProviderCategory {
    workshop = 'workshop',
    insuranceCompany = 'insuranceCompany',
    gasStation = 'gasStation',
    towTruck = 'towTruck',
    other = "other",
    ITV = "ITV"
}