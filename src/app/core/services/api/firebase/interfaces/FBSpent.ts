import { Timestamp } from "firebase/firestore";

export interface FBSpent{
    amount: number,
    date: Date,
    observations?: string,
    provider: string, // referencia del proveedor
    providerName?:string,
}
