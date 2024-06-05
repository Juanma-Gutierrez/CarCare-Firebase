import { ItemLog, LogType, OperationLog } from "src/app/core/interfaces/ItemLog";
import { User } from "src/app/core/interfaces/User";
import { LocalDataService } from "../local-data.service";

export class Mapping {
    constructor(
        private localDataSvc: LocalDataService,
    ) { }


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
        console.log(log)
        return log
    }

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
