export interface Provider {
    category: ProviderCategory,
    name: string,
    phone: string,
    providerId: string,
}

export enum ProviderCategory {
    ITV = "ITV",
    gasStation = 'gasStation',
    insuranceCompany = 'insuranceCompany',
    other = "other",
    towTruck = 'towTruck',
    workshop = 'workshop',
}