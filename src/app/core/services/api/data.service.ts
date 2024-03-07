import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Abstract class representing a data service for making HTTP requests.
 * Provides methods for querying, retrieving, posting, updating, and deleting data.
 */
@Injectable({
    providedIn: 'root'
})
export abstract class DataService {
    /**
     * Queries a resource with specified parameters.
     * @param resource The resource endpoint (e.g., API URL).
     * @param params Additional query parameters.
     * @returns An observable that emits the query response.
     */
    public abstract query<T>(resource: string, params: any): Observable<any>;

    /**
     * Retrieves data from a resource.
     * @param resource The resource endpoint (e.g., API URL).
     * @returns An observable that emits the retrieved data.
     */
    public abstract get<T>(resource: string): Observable<T>;

    /**
     * Posts data to a resource.
     * @param resource The resource endpoint (e.g., API URL).
     * @param data The data to be posted.
     * @returns An observable that emits the post response.
     */
    public abstract post<T>(resource: string, data: any): Observable<T>;

    /**
     * Updates data in a resource.
     * @param resource The resource endpoint (e.g., API URL).
     * @param data The data to be updated.
     * @returns An observable that emits the update response.
     */
    public abstract put<T>(resource: string, data: any): Observable<T>;

    /**
     * Deletes data from a resource.
     * @param resource The resource endpoint (e.g., API URL).
     * @returns An observable that emits the delete response.
     */
    public abstract delete<T>(resource: string): Observable<T>;
}
