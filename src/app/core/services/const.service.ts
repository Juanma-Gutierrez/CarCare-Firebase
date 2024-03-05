export const USER: string = "user";
export const PROVIDER: string = "provider";
export const VEHICLE: string = "vehicle";
export const USER_ROLE: string = "user";

export type Color = {
    SUCCESS: "success";
    DANGER: "danger";
}

export type Position = {
    TOP: "top";
    BOTTOM: "bottom";
}

export class MyToast {
    static readonly Position: Position = {
        TOP: "top",
        BOTTOM: "bottom"
    };
    static readonly Color: Color = {
        DANGER: "danger",
        SUCCESS: "success"
    };
}

export const CATEGORIES = [
    { "value": "workshop", "title": "providers.providerForm.category.workshop" },
    { "value": "gasStation", "title": "providers.providerForm.category.gasStation" },
    { "value": "insuranceCompany", "title": "providers.providerForm.category.insuranceCompany" },
    { "value": "ITV", "title": "providers.providerForm.category.ITV" },
    { "value": "towTruck", "title": "providers.providerForm.category.towTruck" },
    { "value": "other", "title": "providers.providerForm.category.other" },
]