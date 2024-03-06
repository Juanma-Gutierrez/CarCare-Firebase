import { Injectable } from "@angular/core";
import { Provider } from "../../../interfaces/Provider";
import { Spent } from "../../../interfaces/Spent";
import { User, VehiclePreview } from "../../../interfaces/User";
import { Vehicle } from "../../../interfaces/Vehicle";
import { USER } from "../../const.service";
import { MappingService } from "../mapping.service";
import { FirebaseDocument } from "./firebase.service";

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
    public override mapVehicles(data: any): Vehicle[] {
        throw new Error("Method not implemented.");
    }
    public override updateProviderUrl(id: number): string {
        throw new Error("Method not implemented.");
    }
    public override deleteProviderUrl(id: number): string {
        throw new Error("Method not implemented.");
    }
    public override updateSpentUrl(id: number): string {
        throw new Error("Method not implemented.");
    }
    public override deleteSpentUrl(id: number): string {
        throw new Error("Method not implemented.");
    }

    public mapUser(_user: any, role: string = USER, userId: string = _user.credentials): User {
        var user: User = {
            created: _user.created,
            email: _user.email,
            name: _user.name,
            nickname: _user.username,
            role: role,
            surname: _user.surname,
            userId: userId,
            vehicles: [],
        };
        return user;
    }

    convertToUser(data: FirebaseDocument): User {
        return {
            created: data.data['created'],
            email: data.data['email'],
            userId: data.id,
            name: data.data['name'],
            nickname: data.data['nickname'],
            role: data.data['user'],
            surname: data.data['surname'],
            vehicles: data.data['vehicles'],
        }
    }

    public mapVehicle(
        data: any,
        vehicleId: string = data['vehicleId'],
        userId: string = data['userId'],
        spents: [] = data['spents']): Vehicle {
        let vehicle = {
            available: data.available,
            brand: data.brand,
            created: data.created,
            category: data.category,
            model: data.model,
            plate: data.plate,
            registrationDate: data.registrationDate,
            spents: spents,
            vehicleId: vehicleId,
            userId: userId,
        }
        return vehicle;
    }

    public mapProvider(data: any): Provider {
        return {
            providerId: data.providerId,
            created: data.created,
            category: data.category,
            name: data.name,
            phone: data.phone,
        }
    }

    mapSpent(data: any): Spent {
        return {
            amount: data.amount,
            created: data.created,
            date: data.date,
            observations: data.observations,
            providerId: data.providerId,
            providerName: data.providerName,
            spentId: data.spentId,

        }
    }

    mapUserWithVehicles(user: User, vehicles: VehiclePreview[]): User {
        var data = {
            created: user.created,
            email: user.email,
            userId: user.userId,
            name: user.name,
            nickname: user.nickname,
            role: user.role,
            surname: user.surname,
            vehicles: vehicles,
        }
        return data
    }

    mapVehicleWithSpents(vehicle: Vehicle, spentsUpdated: Spent[]): Vehicle {
        return {
            available: vehicle.available,
            brand: vehicle.brand,
            created: vehicle.created,
            category: vehicle.category,
            model: vehicle.model,
            plate: vehicle.plate,
            registrationDate: vehicle.registrationDate,
            spents: spentsUpdated,
            userId: vehicle.userId,
            vehicleId: vehicle.vehicleId,
        }
    }

    mapSpentWithProvider(s: Spent, provider: Provider, info: any): Spent {
        return {
            amount: s.amount,
            created: s.created,
            date: s.date,
            observations: s.observations,
            providerId: s.providerId,
            providerName: info.data.name,
            spentId: s.spentId,
        }
    }

    providerToUpdate(providersList: Provider[]) {
        return {
            "providers": providersList
        }
    }
}