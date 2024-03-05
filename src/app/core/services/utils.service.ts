import { CustomTranslateService } from './custom-translate.service';
import { Dialog } from '@capacitor/dialog';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Share } from '@capacitor/share';
import { ToastController, ToastOptions } from '@ionic/angular';
import { VehiclePreview } from '../interfaces/User';
import { Position } from './const.service';

export function generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function saveLocalStorageUser(user: string) {
    console.info(`Saved to LocalStorage: ${user}`);
    Preferences.set({
        key: 'userName',
        value: user
    });
}

export function loadLocalStorageUser(): Promise<string> {
    return Preferences.get({ key: 'userName' }).then((ret: any) => {
        return ret.value;
    }).catch();
}

export function capitalizeFirstLetter(word: string): string {
    if (word.length === 0) {
        return word;
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
}

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor(
        private toast: ToastController,
        private translateSvc: CustomTranslateService,
    ) { }

    public async showToast(message: string, color: string, position: Position["TOP"] | Position["BOTTOM"], duration: number = 2000) {
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

    async showConfirm(message: string): Promise<boolean> {
        var messageToShow = this.translateSvc.getValue(message);
        const { value } = await Dialog.confirm({
            title: this.translateSvc.getValue("message.confirm.title"),
            message: messageToShow,
            okButtonTitle: this.translateSvc.getValue("message.confirm.okButton"),
            cancelButtonTitle: this.translateSvc.getValue("message.confirm.cancelButton")
        });
        return value;
    }

    async shareVehicles(vehiclesList: VehiclePreview[]) {
        var textToShare = this.translateSvc.getValue("vehicles.vehiclesList") + "\n\n";
        for (var vehicle of vehiclesList) {
            var available = vehicle.available ? "✅" : "❌";
            textToShare += `- ${available} ${vehicle.plate.toUpperCase()}: ${capitalizeFirstLetter(vehicle.brand)} ${capitalizeFirstLetter(vehicle.model)}\n`;
        }
        await Share.share({
            text: textToShare,
        });
    }
}
