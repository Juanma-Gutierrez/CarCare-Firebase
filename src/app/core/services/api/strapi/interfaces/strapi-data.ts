import { StrapiUser } from "./strapi-users";

/**
 * Tipo que representa la información de usuario de Strapi.
 */
export type StrapiMe = StrapiUser;

/**
 * Interfaz que representa la respuesta de Strapi.
 * @param <T> Tipo de datos en la respuesta.
 */
export interface StrapiResponse<T> {
    data: StrapiData<T>
}

/**
 * Interfaz que representa los datos de Strapi.
 * @param <T> Tipo de atributos en los datos.
 */
export interface StrapiData<T> {
    id: number,
    attributes: T
}

/**
 * Interfaz que representa la respuesta de Strapi con un array de datos.
 * @param <T> Tipo de datos en el array.
 */
export interface StrapiArrayResponse<T> {
    data: StrapiData<T>[],
    meta: {
        pagination?: {
            page: number,
            pageSize: number,
            pageCount: number,
            total: number,
        }
    }
}

/**
 * Interfaz que representa la información de registro de usuario en Strapi.
 */
export interface StrapiRegisterUser {
    id?: number,
    name: string,
    email: string,
    password: string,
    role: number
}

/**
 * Interfaz que representa la respuesta de inicio de sesión en Strapi.
 */
export interface StrapiLoginResponse {
    jwt: string,
    user: StrapiUser
}

/**
 * Tipo que representa la respuesta de registro en Strapi, que es similar a la respuesta de inicio de sesión.
 */
export type StrapiRegisterResponse = StrapiLoginResponse;