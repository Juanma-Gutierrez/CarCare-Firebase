import { PaginatedData } from "src/app/core/interfaces/data";

export interface FBUser {
    nickname: string
    name: string,
    surname: string,
    email: string,
    password: string,
    uuid?: string
}