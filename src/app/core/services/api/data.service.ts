import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export abstract class DataService {

    public abstract query<T>(resource: string, params: any): Observable<any>;
    public abstract get<T>(resource: string): Observable<T>;
    public abstract post<T>(resource: string, data: any): Observable<T>;
    public abstract put<T>(resource: string, data: any): Observable<T>;
    public abstract delete<T>(resource: string): Observable<T>;
}
