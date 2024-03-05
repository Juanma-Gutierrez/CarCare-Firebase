export const USER: string = "user";
export const PROVIDERS: string = "providers";
export const VEHICLES: string = "vehicles";
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