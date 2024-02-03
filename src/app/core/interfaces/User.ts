/**
 * Interfaz que representa a un usuario.
 */
export interface User {
    id?: number,
    users_permissions_user?: number,
    username?: string,
    email?: string,
    name: string,
    surname: string,
    uuid?: string
}

/**
 * Interfaz que representa la información para registrar a un usuario.
 */
export interface UserRegisterInfo {
    uuid: string,
    users_permission_user: string,
    username: string,
    name: string,
    surname: string,
    email: string,
    password: string
    role: number
    userId: number
}
