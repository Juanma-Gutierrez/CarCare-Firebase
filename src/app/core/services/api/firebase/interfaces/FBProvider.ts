import { ProviderCategory } from "src/app/core/interfaces/Provider";

export interface FBProvider {
    category: ProviderCategory,
    name: string,
    phone: string,
}