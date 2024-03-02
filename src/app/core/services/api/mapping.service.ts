import { Injectable } from '@angular/core';
import { Provider } from '../../interfaces/Provider';
import { Spent } from '../../interfaces/Spent';
import { Vehicle } from '../../interfaces/Vehicle';


@Injectable({
    providedIn: 'root'
})
export abstract class MappingService {

    public abstract queryVehiclesUrl(): string;

    public abstract getVehicleUrl(id: number): string;

    public abstract updateVehicleUrl(id: number): string;

    public abstract deleteVehicleUrl(id: number): string;

    public abstract mapVehicle(data: any): Vehicle;

    public abstract mapVehicles(data: any): Vehicle[]

    public abstract updateProviderUrl(id: number): string;

    public abstract deleteProviderUrl(id: number): string;

    public abstract mapProvider(data: any): Provider;

    public abstract updateSpentUrl(id: number): string;

    public abstract deleteSpentUrl(id: number): string;

    public abstract mapSpent(data: any): Spent;
}
