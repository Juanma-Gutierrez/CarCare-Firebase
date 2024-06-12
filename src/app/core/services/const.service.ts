/**
 * Constants for user-related entities.
 */
export const USER: string = "user";

/**
 * Constants for provider-related entities.
 */
export const PROVIDER: string = "provider";

/**
 * Constants for vehicle-related entities.
 */
export const VEHICLE: string = "vehicle";

/**
 * Constant for user role.
 */
export const USER_ROLE: string = "user";

/**
 * Type definition for colors used in the application.
 */
export type Color = {
    SUCCESS: "success";
    DANGER: "danger";
}

/**
 * Type definition for toast positions.
 */
export type Position = {
    TOP: "top";
    BOTTOM: "bottom";
}

/**
 * Class containing static properties related to toast messages.
 */
export class MyToast {
    /**
     * Static property defining toast positions.
     */
    static readonly Position: Position = {
        TOP: "top",
        BOTTOM: "bottom"
    };

    /**
     * Static property defining toast colors.
     */
    static readonly Color: Color = {
        DANGER: "danger",
        SUCCESS: "success"
    };
}

/**
 * Array containing categories for providers.
 */
export const CATEGORIES = [
    { "value": "workshop", "title": "providers.providerForm.category.workshop" },
    { "value": "gasStation", "title": "providers.providerForm.category.gasStation" },
    { "value": "insuranceCompany", "title": "providers.providerForm.category.insuranceCompany" },
    { "value": "ITV", "title": "providers.providerForm.category.ITV" },
    { "value": "towTruck", "title": "providers.providerForm.category.towTruck" },
    { "value": "other", "title": "providers.providerForm.category.other" },
]

/**
 * Constants related to logging.
 */
export const LOG = {
    COLLECTION: "log",
    DOCUMENT: "generalLog",
    FIELD: "logs"
}

/**
 * Constants for Firebase collections.
 */
export const FB_COLLECTIONS = {
    LOG: "log",
    PROVIDER: "provider",
    USER: "user",
    VEHICLE: "vehicle",
}

/**
 * Constants for Firebase errors.
 */
export const FB_ERRORS = {
    NO_DOCUMENT: "No such document",
    ERROR_DB_OPERATION: "Error in database operation"
}

/**
 * Constants for log content.
 */
export const LOG_CONTENT = {
    // REGISTER
    REGISTER_USER_SUCCESSFULLY: "Register user successfully",
    REGISTER_USER_ERROR: "Error in register user",
    // LOGIN-LOGOUT
    LOGIN_SUCCESFULLY: "Login successfully",
    LOGIN_ERROR: "Login error",
    LOGOUT_SUCCESFULLY: "Logout successfully",
    LOGOUT_ERROR: "Logout error",
    // VEHICLE
    VEHICLE_CREATION_SUCCESSFULLY: "Creation of vehicle successfully",
    VEHICLE_CREATION_ERROR: "Error in vehicle creation",
    VEHICLE_EDITION_SUCCESSFULLY: "Edition of vehicle successfully",
    VEHICLE_EDITION_ERROR: "Error in vehicle edition",
    VEHICLE_DELETION_SUCCESSFULLY: "Deletion of vehicle successfully",
    VEHICLE_DELETION_ERROR: "Error in vehicle deletion",
    // PROVIDER
    PROVIDER_CREATION_SUCCESSFULLY: "Creation of provider successfully",
    PROVIDER_CREATION_ERROR: "Error in provider creation",
    PROVIDER_EDITION_SUCCESSFULLY: "Edition of provider successfully",
    PROVIDER_EDITION_ERROR: "Error in provider edition",
    PROVIDER_DELETION_SUCCESSFULLY: "Deletion of provider successfully",
    PROVIDER_DELETION_ERROR: "Error in vehicle provider",
    // SPENT
    SPENT_CREATION_SUCCESSFULLY: "Creation of spent successfully",
    SPENT_CREATION_ERROR: "Error in spent creation",
    SPENT_EDITION_SUCCESSFULLY: "Edition of spent successfully",
    SPENT_EDITION_ERROR: "Error in spent edition",
    SPENT_DELETION_SUCCESSFULLY: "Deletion of spent successfully",
    SPENT_DELETION_ERROR: "Error in spent deletion",
}