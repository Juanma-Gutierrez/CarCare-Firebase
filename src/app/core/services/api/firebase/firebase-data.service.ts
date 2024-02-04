import { Observable } from "rxjs";
import { PaginatedData } from "src/app/core/interfaces/data";
import { ApiService } from "../api.service";
import { DataService } from "../data.service";

export class FirebaseDataService extends DataService {
    public override query<T>(resource: string, params: any): Observable<PaginatedData<T>> {
        throw new Error("Method not implemented.");
    }
    public override get<T>(resource: string): Observable<T> {
        throw new Error("Method not implemented.");
    }
    public override post<T>(resource: string, data: any): Observable<T> {
        throw new Error("Method not implemented.");
    }
    public override put<T>(resource: string, data: any): Observable<T> {
        throw new Error("Method not implemented.");
    }
    public override delete<T>(resource: string): Observable<T> {
        throw new Error("Method not implemented.");
    }

    constructor(
        protected api: ApiService
    ) {
        super();
    }
}