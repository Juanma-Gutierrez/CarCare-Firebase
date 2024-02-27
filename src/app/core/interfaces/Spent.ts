export interface Spent {
    spentId: string,
    amount: number,
    date: Date,
    observations?: string,
    provider: string,
    providerName?: string,
}
