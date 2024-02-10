import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor(private toast: ToastController) { }

    public generateId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    /**
    * Muestra un mensaje de notificación (toast) en la interfaz de usuario.
    * @param messageToShow Mensaje a mostrar en el toast.
    * @param color Color del toast.
    * @param position Posición del toast en la pantalla ("top" o "bottom").
    */
    async showToast(messageToShow: string, color: string, position: "top" | "bottom") {
        if (messageToShow != null) {
            const options: ToastOptions = {
                message: messageToShow,
                duration: 1000,
                position: position,
                color: color,
            };
            const toast = await this.toast.create(options);
            toast.present();
        }
    }
}



