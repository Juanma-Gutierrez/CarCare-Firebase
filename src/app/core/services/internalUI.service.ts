import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

/**
 * Servicios relacionados con la UI.
 */
@Injectable({
    providedIn: 'root'
})
export class InternalUIService {
    constructor(
        private toast: ToastController
    ) { }

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
