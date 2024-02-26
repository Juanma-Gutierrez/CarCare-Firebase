import { Provider } from "src/app/core/interfaces/Provider";
import { Spent } from "src/app/core/interfaces/Spent";
import { Vehicle } from "src/app/core/interfaces/Vehicle";
import { PaginatedData } from "src/app/core/interfaces/data";
import { MappingService } from "../mapping.service";
import { FBVehicle } from "./interfaces/FBVehicle";
import { Injectable } from "@angular/core";
import { FBUser, FBVehiclePreview } from "./interfaces/FBUser";
import { FBProvider } from "./interfaces/FBProvider";
import { FBSpent } from "./interfaces/FBSpent";

@Injectable({
    providedIn: 'root'
})
export class FirebaseMappingService extends MappingService {

    constructor() {
        super();
    }
    public override queryVehiclesUrl(): string {
        throw new Error("Method not implemented.");
    }
    public override getVehicleUrl(id: number): string {
        throw new Error("Method not implemented.");
    }
    public override updateVehicleUrl(id: number): string {
        throw new Error("Method not implemented.");
    }
    public override deleteVehicleUrl(id: number): string {
        throw new Error("Method not implemented.");
    }
    public override mapVehicle(data: any): Vehicle {
        throw new Error("Method not implemented.");
    }
    public override mapVehicles(data: PaginatedData<any>): PaginatedData<Vehicle> {
        throw new Error("Method not implemented.");
    }
    public override updateProviderUrl(id: number): string {
        throw new Error("Method not implemented.");
    }
    public override deleteProviderUrl(id: number): string {
        throw new Error("Method not implemented.");
    }
    public override mapProvider(data: any): Provider {
        throw new Error("Method not implemented.");
    }
    public override updateSpentUrl(id: number): string {
        throw new Error("Method not implemented.");
    }
    public override deleteSpentUrl(id: number): string {
        throw new Error("Method not implemented.");
    }
    public override mapSpent(data: any): Spent {
        throw new Error("Method not implemented.");
    }

    public mapFBVehicle(data: any, vehicleId: string, userId: string): FBVehicle {
        return {
            available: data.available,
            brand: data.brand,
            category: data.category,
            model: data.model,
            plate: data.plate,
            registrationDate: data.registrationDate,
            spents: [],
            vehicleId: vehicleId,
            userId: userId,
        }
    }

    public mapFBProvider(data: any): FBProvider {
        return {
            category: data.category,
            name: data.name,
            phone: data.phone,
        }
    }

    mapFBSpent(data: any): FBSpent {
        return {
            provider: data.providerName,
            amount: data.amount,
            observations: data.observations,
            date: data.date
        }
    }

    mapUserWithVehicles(user: FBUser, vehiclesListUpdated: FBVehiclePreview[]): FBUser {
        return {
            email: user.email,
            userId: user.uuid,
            name: user.name,
            nickname: user.nickname,
            surname: user.surname,
            vehicles: vehiclesListUpdated,
            uuid: user.uuid
        }
    }
}