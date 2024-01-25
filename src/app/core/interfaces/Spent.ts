/**
 * Interfaz que representa un gasto.
 */
export interface Spent {
    id: number,
    date: Date,
    amount: number,
    observations?: string,
    provider: number,
    providerName?:string,
    vehicle: number,
}
