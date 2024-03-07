/**
 * Represents a spent transaction.
 * @param amount The amount spent.
 * @param created The creation date of the spent transaction.
 * @param date The date of the spent transaction.
 * @param observations Optional observations related to the spent transaction.
 * @param providerId The ID of the provider associated with the spent transaction.
 * @param providerName Optional name of the provider associated with the spent transaction.
 * @param spentId The ID of the spent transaction.
 */
export interface Spent {
    amount: number,
    created: string,
    date: Date,
    observations?: string,
    providerId: string,
    providerName?: string,
    spentId: string,
}
