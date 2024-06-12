import { ItemLog, LogType, OperationLog } from 'src/app/core/interfaces/ItemLog';
import { User } from 'src/app/core/interfaces/User';

import { LocalDataService } from '../local-data.service';

export class Mapping {
    constructor(
        private localDataSvc: LocalDataService,
    ) { }

    /**
     * Creates a new log entry for Firebase.
     * @param type The log type.
     * @param currentUser The current user.
     * @param uid The user ID.
     * @param operation The operation performed.
     * @param content The log content (optional).
     * @returns The created ItemLog object.
     */
    public fbCreateLog(
        type: LogType,
        currentUser: User,
        uid: string,
        operation: OperationLog,
        content: string = ""
    ): ItemLog {
        const email = currentUser?.email;
        const userUid = currentUser?.userId;
        const log: ItemLog = {
            content: content,
            currentUser: email,
            dateTime: new Date().toISOString(),
            operationLog: operation,
            type: type,
            uid: userUid,
        };
        return log
    }

    /**
     * Generates a new log entry with the current user.
     * @param content The log content.
     * @param operation The operation performed.
     * @param type The log type.
     * @returns The generated ItemLog object.
     */
    public generateItemLog(content: string, operation: OperationLog, type: LogType): ItemLog {
        const user = this.localDataSvc.getUser().value;
        const itemLog: ItemLog = {
            content: content,
            currentUser: user?.email,
            dateTime: new Date().toISOString(),
            operationLog: operation,
            type: type,
            uid: user?.userId
        }
        return itemLog
    }

    /**
     * Maps an array of ItemLog to an array of CSV data.
     * @param data The array of ItemLog to map.
     * @returns The mapped CSV data array.
     */
    public mapArrayItemLogToCSVData(data: ItemLog[]): ItemLog[] {
        return data.map(row => ({
            uid: row.uid || '',
            content: row.content || '',
            operationLog: row.operationLog || '',
            dateTime: row.dateTime || '',
            currentUser: row.currentUser || '',
            type: row.type || ''
        }));
    }
}
