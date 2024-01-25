/**
 * Interfaz que representa información de paginación.
 */
export interface Pagination{
    page:number,
    pageSize:number,
    pageCount:number,
    total:number
}

/**
 * Interfaz que representa datos paginados junto con información de paginación.
 * @param <T> Tipo de datos contenidos en el conjunto de datos paginado.
 */
export interface PaginatedData<T>{
    data:T[],
    pagination:Pagination
}