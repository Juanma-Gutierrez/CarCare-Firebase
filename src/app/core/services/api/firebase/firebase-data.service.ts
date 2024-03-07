import { Observable } from "rxjs";
import { ApiService } from "../api.service";
import { DataService } from "../data.service";

/**
 * Provides data service functionality using Firebase.
 * 
 * @param api The ApiService instance.
 */

export class FirebaseDataService extends DataService {

    /**
     * Constructs a new instance of the FirebaseDataService.
     * @param api The ApiService instance.
     */
    constructor(
        protected api: ApiService
    ) {
        super();
    }

    /**
     * Overrides the query method to perform a query operation.
     * @param resource The resource to query.
     * @param params The parameters for the query.
     * @return An Observable representing the query result.
     * @throws Error if the method is not implemented.
     */
    public override query<T>(resource: string, params: any): Observable<any> {
        throw new Error("Method not implemented.");
    }

    /**
     * Overrides the get method to retrieve data from a specified resource.
     * @param resource The resource from which to retrieve data.
     * @return An Observable emitting the retrieved data.
     * @throws Error if the method is not implemented.
     */
    public override get<T>(resource: string): Observable<T> {
        throw new Error("Method not implemented.");
    }

    /**
     * Overrides the post method to send data to a specified resource.
     * @param resource The resource to which the data should be sent.
     * @param data The data to be sent.
     * @return An Observable representing the result of the post operation.
     * @throws Error if the method is not implemented.
     */
    public override post<T>(resource: string, data: any): Observable<T> {
        throw new Error("Method not implemented.");
    }

    /**
     * Overrides the put method to update data at a specified resource.
     * @param resource The resource to which the data should be updated.
     * @param data The data to be updated.
     * @return An Observable representing the result of the put operation.
     * @throws Error if the method is not implemented.
     */
    public override put<T>(resource: string, data: any): Observable<T> {
        throw new Error("Method not implemented.");
    }

    /**
     * Overrides the delete method to delete data from a specified resource.
     * @param resource The resource from which to delete data.
     * @return An Observable representing the result of the delete operation.
     * @throws Error if the method is not implemented.
     */
    public override delete<T>(resource: string): Observable<T> {
        throw new Error("Method not implemented.");
    }
}