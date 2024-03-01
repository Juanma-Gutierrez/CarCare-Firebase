import { CustomTranslateService } from './custom-translate.service';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ToastController, ToastOptions } from '@ionic/angular';

export const TOP: "top" = "top";
export const BOTTOM: "bottom" = "bottom";
export const SUCCESS: string = "secondary";
export const DANGER: string = "danger";

@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    constructor(
        private toast: ToastController,
        private translateSvc: CustomTranslateService,
    ) { }

    public generateId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    /**
    * Muestra un mensaje de notificación (toast) en la interfaz de usuario.
    * @param messageToShow Mensaje a mostrar en el toast.
    * @param color Color del toast.
    * @param position Posición del toast en la pantalla ("top" o "bottom").
    */
    public async showToast(messageToShow: string, color: string, position: "top" | "bottom", duration:number = 2000) {
        console.info("Show toast: " + messageToShow)
        if (messageToShow != null) {
            const options: ToastOptions = {
                message: messageToShow,
                duration: duration,
                position: position,
                color: color,
            };
            const toast = await this.toast.create(options);
            toast.present();
        }
    }

    saveLocalStorageUser(user: string) {
        console.info(`Saved to LocalStorage: ${user}`);
        Preferences.set({
            key: 'userName',
            value: user
        });
    }

    loadLocalStorageUser(): Promise<string> {
        return Preferences.get({ key: 'userName' }).then((ret: any) => {
            console.log("cl:", "loadlocalstorage:", ret.value)
            return ret.value;
        }).catch();
    }

    getTransMsg(originalMessage: string, param: string = ""): string {
        var lang = ""
        var message = ""
        this.translateSvc.language$.subscribe(l => lang = l);
        if (lang == "es") {
            switch (originalMessage) {
                // Auth
                case ("signUpOk"): message = `Registro realizado con éxito`;
                    break;
                case ("loginError"): message = `Error en los datos introducidos`;
                    break;
                case ("emailAlreadyInUse"): message = `El correo electrónico ${param} ya está en uso`;
                    break;
                case ("emailInvalid"): message = `La dirección de correo electrónico ${param} no es válida`;
                    break;
                case ("signUpError"): message = `Error durante el proceso de registro`;
                    break;
                case ("passwordWeak"): message = `La contraseña no es lo suficientemente fuerte. Añade caracteres adicionales incluyendo caracteres especiales y números`;
                    break;
                // Vehicles
                case ("newVehicleOk"): message = "Nuevo vehículo creado correctamente";
                    break;
                case ("newVehicleError"): message = "Error en la creación del vehículo";
                    break;
                case ("editVehicleOk"): message = "Vehículo editado correctamente";
                    break;
                case ("editVehicleError"): message = "Error en la edición del vehículo";
                    break;
                case ("deleteVehicleOk"): message = "Vehículo eliminado correctamente";
                    break;
                case ("deleteVehicleError"): message = "Error en la eliminación del vehículo";
                    break;
                // Spents
                case ("noneProvider"): message = "Primero debes crear un proveedor";
                    break;
                case ("newSpentOk"): message = "Nuevo gasto creado correctamente";
                    break;
                case ("newSpentError"): message = "Error en la creación del gasto";
                    break;
                case ("editSpentOk"): message = "Gasto editado correctamente";
                    break;
                case ("editSpentError"): message = "Error en la edición del gasto";
                    break;
                case ("deleteSpentOk"): message = "Gasto eliminado correctamente";
                    break;
                case ("deleteSpentError"): message = "Error en la eliminación del gasto";
                    break;
                // Providers
                case ("newProviderOk"): message = "Nuevo proveedor creado correctamente";
                    break;
                case ("newProviderError"): message = "Error en la creación del proveedor";
                    break;
                case ("editProviderOk"): message = "Proveedor editado correctamente";
                    break;
                case ("editProviderError"): message = "Error en la edición del proveedor";
                    break;
                case ("deleteProviderOk"): message = "Proveedor eliminado correctamente";
                    break;
                case ("deleteProviderError"): message = "Error en la eliminación del proveedor";
                    break;
            }
        } else if (lang == "en") {
            switch (originalMessage) {
                // Auth
                case ("signUpOk"): message = `Registration successfully completed`;
                    break;
                case ("loginError"): message = `Error in the entered data`;
                    break;
                case ("emailAlreadyInUse"): message = `Email address ${param} already in use`;
                    break;
                case ("emailInvalid"): message = `Email address ${param} is invalid`;
                    break;
                case ("signUpError"): message = `Error during sign up`;
                    break;
                case ("passwordWeak"): message = `Password is not strong enough. Add additional characters including special characters and numbers.`;
                    break;
                // Vehicles
                case ("newVehicleOk"): message = "New vehicle created succesfully";
                    break;
                case ("newVehicleError"): message = "Error in vehicle creation";
                    break;
                case ("editVehicleOk"): message = "Vehícle edited succesfully";
                    break;
                case ("editVehicleError"): message = "Error in vehicle edition";
                    break;
                case ("deleteVehicleOk"): message = "Vehicle deleted succesfully";
                    break;
                case ("deleteVehicleError"): message = "Error in vehicle deletion";
                    break;
                // Spents
                case ("noneProvider"): message = "First you may create a provider";
                    break;
                case ("newSpentOk"): message = "New spent created succesfully";
                    break;
                case ("newSpentError"): message = "Error in spent creation";
                    break;
                case ("editSpentOk"): message = "Spent edited succesfully";
                    break;
                case ("editSpentError"): message = "Error in spent edition";
                    break;
                case ("deleteSpentOk"): message = "Spent deleted succesfully";
                    break;
                case ("deleteSpentError"): message = "Error in spent deletion";
                    break;
                // Providers
                case ("newProviderOk"): message = "New provider created succesfully";
                    break;
                case ("newProviderError"): message = "Error in provider creation";
                    break;
                case ("editProviderOk"): message = "Provider edited succesfully";
                    break;
                case ("editProviderError"): message = "Error in provider edition";
                    break;
                case ("deleteProviderOk"): message = "Provider deleted succesfully";
                    break;
                case ("deleteProviderError"): message = "Error in provider deletion";
                    break;
            }
        } else {
            console.error("No debería entrar");
        }
        return message
    }
}



