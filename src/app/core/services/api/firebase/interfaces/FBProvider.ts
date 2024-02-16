import { ProviderCategory } from "src/app/core/interfaces/Provider";

export interface FBProvider {
    category: ProviderCategory,
    name: string,
    phone: string,
}



/*
ProviderCategory
    workshop = 'workshop',
    insuranceCompany = 'insuranceCompany',
    gasStation = 'gasStation',
    towTruck = 'towTruck',
    other = "other",
    ITV="ITV"

*/