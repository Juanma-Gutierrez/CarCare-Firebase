export enum LogType {
    INFO = "INFO",
    DEBUG = "DEBUG",
    WARNING = "WARNING",
    ERROR = "ERROR",
    VERBOSE = "VERBOSE"
}

export enum OperationLog {
    CREATE_USER = "CREATE_USER",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    VEHICLE = "VEHICLE",
    PROVIDER = "PROVIDER",
    SPENT = "SPENT"
}

export interface ItemLog {
    content: string;
    currentUser?: string;
    dateTime: string;
    operationLog: OperationLog;
    type: LogType;
    uid?: string;
}