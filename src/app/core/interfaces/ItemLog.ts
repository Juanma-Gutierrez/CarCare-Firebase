/**
 * Represents the type of log.
 * Possible values:
 * - INFO
 * - DEBUG
 * - WARNING
 * - ERROR
 * - VERBOSE
 */
export enum LogType {
    INFO = "INFO",
    DEBUG = "DEBUG",
    WARNING = "WARNING",
    ERROR = "ERROR",
    VERBOSE = "VERBOSE"
}

/**
 * Represents the type of operation log.
 * Possible values:
 * - CREATE_USER
 * - LOGIN
 * - LOGOUT
 * - VEHICLE
 * - PROVIDER
 * - SPENT
 */
export enum OperationLog {
    CREATE_USER = "CREATE_USER",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    VEHICLE = "VEHICLE",
    PROVIDER = "PROVIDER",
    SPENT = "SPENT"
}

/**
 * Represents a log item.
 * @param content The content of the log.
 * @param currentUser The current user associated with the log (optional).
 * @param dateTime The date and time when the log was created.
 * @param operationLog The operation associated with the log.
 * @param type The type of log.
 * @param uid The unique identifier of the log (optional).
 */
export interface ItemLog {
    content: string;
    currentUser?: string;
    dateTime: string;
    operationLog: OperationLog;
    type: LogType;
    uid?: string;
}