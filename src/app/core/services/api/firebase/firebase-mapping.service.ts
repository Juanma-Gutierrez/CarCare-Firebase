import { MappingService } from "../mapping.service";
import { Vehicle } from "../../../interfaces/Vehicle";
import { Injectable } from "@angular/core";
import { User, VehiclePreview } from "../../../interfaces/User";
import { Provider } from "../../../interfaces/Provider";
import { Spent } from "../../../interfaces/Spent";
import { FirebaseDocument } from "./firebase.service";
import { USER } from "../../const.service";

@Injectable({
    providedIn: 'root'
})
export class FirebaseMappingService extends MappingService {
    providerToUpdate(providersList: Provider[]) {
        return {
            "providers": providersList
        }
    }


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

    public mapFBVehicle(data: any, vehicleId: string, userId: string): Vehicle {
        return {
            available: data.available,
            brand: data.brand,
            created: data.created,
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
            created: data.created,
            category: data.category,
            name: data.name,
            phone: data.phone,
        }
    }

    mapFBSpent(data: any): Spent {
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

    mapUserWithVehicles(user: User, vehiclesListUpdated: VehiclePreview[]): User {
        var data = {
            created: user.created,
            email: user.email,
            userId: user.userId,
            name: user.name,
            nickname: user.nickname,
            role: user.role,
            surname: user.surname,
            vehicles: vehiclesListUpdated,
        }
        console.log(data)
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

}