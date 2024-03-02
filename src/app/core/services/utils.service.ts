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

    public async showToast(message: string, color: string, position: "top" | "bottom", duration:number = 2000) {
        var messageToShow = this.translateSvc.getValue(message);
        console.info("Show toast: " + messageToShow);
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
}



