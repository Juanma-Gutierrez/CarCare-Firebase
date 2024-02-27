import { ProviderCategory } from "src/app/core/interfaces/Provider";

export interface FBProvider {
    providerId: string,
    category: ProviderCategory,
    name: string,
    phone: string,
}