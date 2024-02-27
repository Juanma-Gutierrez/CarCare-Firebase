import { MappingService } from "../mapping.service";
import { Vehicle } from "../../../interfaces/Vehicle";
import { Injectable } from "@angular/core";
import { User, VehiclePreview } from "../../../interfaces/User";
import { Provider } from "../../../interfaces/Provider";
import { Spent } from "../../../interfaces/Spent";

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
    public override mapVehicles(data: any): Vehicle[] {
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

    public mapFBVehicle(data: any, vehicleId: string, userId: string): Vehicle {
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

    public mapFBProvider(data: any): Provider {
        return {
            providerId: data.providerId,
            category: data.category,
            name: data.name,
            phone: data.phone,
        }
    }

    mapFBSpent(data: any): Spent {
        return {
            spentId: data.spentId,
            provider: data.providerName,
            amount: data.amount,
            observations: data.observations,
            date: data.date
        }
    }

    mapUserWithVehicles(user: User, vehiclesListUpdated: VehiclePreview[]): User {
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