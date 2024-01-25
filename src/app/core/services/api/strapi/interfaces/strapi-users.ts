import { StrapiData } from "./strapi-data";

/**
 * Interfaz que representa un usuario en Strapi.
 */
export interface StrapiUser {
    id: number,
    username: string,
    email: string
}

/**
 * Tipo que representa la información de usuario en Strapi.
 */
export type StrapiMe = StrapiUser;

/**
 *  Interfaz que representa la respuesta JWT.
 */
export interface JwtResponse {
    jwt: string
    user: User
}

/**
 * Interfaz que representa un usuario.
 */
export interface User {
    id: number
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
}

/**
 * Tipo que representa una lista de usuarios.
 */
export type UserList = User[]

/**
 * Interfaz que representa la información de usuario para el registro.
 */
export interface PostUser {
    username: string
    email: string
    password: string
    role: number
}

/**
 * Interfaz que representa la respuesta de creación de usuario.
 */
export interface PostUserResponse {
    data: any
    error: Error
}

/**
 * Interfaz que representa un error.
 */
export interface Error {
    status: number
    name: string
    message: string
    details: Details
}

/**
 * Interfaz que representa detalles adicionales.
 */
export interface Details { }

/**
 * Interfaz que representa los datos necesarios para registrar un usuario en Strapi.
 */
export interface StrapiRegisterPayload {
    email: string,
    password: string,
    username: string
}

/**
 * Interfaz que representa la información del propietario en Strapi.
 */
export interface StrapiOwner {
    id?: number,
    name: string,
    surname: string,
    user_id: number,
}

/**
 * Interfaz que representa la respuesta de registro en Strapi.
 */
export interface PostStrapiRegister {
    data: {
        id?: number,
        name: string,
        surname: string,
        users_permissions_user: number,
    }
}