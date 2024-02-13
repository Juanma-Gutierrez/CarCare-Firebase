export interface FBUser {
    nickname: string,
    name: string,
    surname: string,
    email: string,
    uuid?: string,
    vehicles: FBVehiclePreview[]
}

export interface FBVehiclePreview {
    available: boolean,
    brand: string,
    model: string,
    plate: string,
    ref: string,
    uuid: string
}

export interface FBUserCredential {
    email: string,
    password: string,
}
