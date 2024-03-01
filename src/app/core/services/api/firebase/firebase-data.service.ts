import { ApiService } from "../api.service";
import { DataService } from "../data.service";
import { Observable, map } from "rxjs";

export class FirebaseDataService extends DataService {
    constructor(
        protected api: ApiService
    ) {
        super();
    }

    public override query<T>(resource: string, params: any): Observable<any> {
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


}